import React, { useRef, useEffect, useReducer, useContext } from "react";

import {
  NavTab,
  InputWithLabel,
  Button,
  RadioButton,
  Select,
} from "../../../../../../components";
import { LessionsCourse } from "./lessionsCourse/lessionsCourse";
import { COURSES_OWNER_ACTION } from "../reducer/reducer";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import "./style.scss";
import Swal from "sweetalert2";

import { handleCourseOwner } from "../middleware/handleCourseOwner";
import { reducer, EDIT_COURSE_ACTION } from "../reducer/editCourseReducer";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const initData = {
  categories: {
    isSubCate: false,
    parentCat: -1,
    childrenCat: -1,
    cateSelected: -1,
  },
  fullDesEditor: EditorState.createEmpty(),
  lessions: [],
};

export const EditCourse = ({
  categories,
  dispatch,
  courseOwnerDispatch,
  course,
}) => {
  const [store_edit, editCourse_dispatch] = useReducer(reducer, initData);
  const { register, setValue, getValues } = useForm();
  const file = useRef();

  useEffect(() => {
    if (Object.keys(course).length) {
      ["courName", "id_cat", "price", "tinyDes", "status"].map((item) => {
        setValue(
          item,
          typeof course[item] === "number" ? +course[item] : course[item]
        );
      });

      if (course.fullDes.length) {
        editCourse_dispatch({
          type: EDIT_COURSE_ACTION.UPDATE_FULL_DESC,
          payload: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              htmlToDraft(course.fullDes).contentBlocks
            )
          ),
        });
      }

      const resultCheck = handleCourseOwner.checkSubCategories(
        categories,
        course.id_cat
      );

      handleCourseOwner.updateCategoryEdit(
        editCourse_dispatch,
        course,
        resultCheck
      );
    }
  }, [course]);

  const handleChangeCourseImage = async (e) => {
    if (e.target.files.length === 0) return;

    await handleCourseOwner.changeImageCourse(
      e.target.files[0],
      course,
      courseOwnerDispatch,
      dispatch
    );
  };

  const handleCancelEdit = async () => {
    setValue(
      "fullDes",
      draftToHtml(convertToRaw(store_edit.fullDesEditor.getCurrentContent()))
    );

    await handleCourseOwner.checkCancel(
      course.id,
      getValues(),
      courseOwnerDispatch,
      dispatch
    );
  };

  const handleUpdate = () => {
    setValue(
      "fullDes",
      draftToHtml(convertToRaw(store_edit.fullDesEditor.getCurrentContent()))
    );

    Swal.fire({
      text: "Đang cập nhật",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const result = await handleCourseOwner.updateCourseInfo(
          course.id,
          getValues(),
          courseOwnerDispatch,
          dispatch
        );

        if (result) {
          courseOwnerDispatch({
            type: COURSES_OWNER_ACTION.UPDATE_ACTIVE,
            payload: 1,
          });
        }
      },
    });
  };

  const loadListCatParent = () => {
    return categories.filter(
      (cat) => +cat.id === +store_edit.categories.parentCat
    )[0].subCategory;
  };

  const handleChangeParentCat = (e) => {
    const index = +e.target.value;
    handleChangeCat(e);
    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_PARENT_CAT,
      payload: index,
    });

    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_IS_SUBCAT,
      payload: categories.filter((cat) => cat.id === index)[0].isSubCategory,
    });

    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_CHILDREN_CAT,
      payload: -1,
    });
  };

  const handleChangeChildrenCat = (e) => {
    const index = +e.target.value;
    handleChangeCat(e);
    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_CHILDREN_CAT,
      payload: index,
    });
  };

  const handleChangeCat = (e) => {
    const index = +e.target.value;

    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_CAT_SELECT,
      payload: +index,
    });

    setValue("id_cat", +index);
  };

  const handleFullDesc = (editorState) => {
    editCourse_dispatch({
      type: EDIT_COURSE_ACTION.UPDATE_FULL_DESC,
      payload: editorState,
    });
  };

  const handleChangeActive = async (value) => {
    if (value === 1) {
      await handleCourseOwner.loadLessions(course.id, editCourse_dispatch);
    }
  };

  return (
    <div className="edit-course">
      <NavTab
        className="tabs-content--none-shadow"
        headers={["Thông tin khóa học", "Bài giảng"]}
        blocks={[
          <div className="course-info">
            <div className="course-info__main-form">
              <div className="course-info__form-input">
                <InputWithLabel
                  inputClassName="form-item-view-main__input"
                  name="courName"
                  defauleValue={course.courName}
                  placeHolder="Tên khóa học"
                  labelName="Tên khóa học"
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <div className="form-item-view-main__select">
                  <label className="select__title-label">Danh mục</label>
                  <div className="select__group">
                    <Select
                      value={store_edit.categories.parentCat}
                      defaultSelected={
                        store_edit.categories.parentCat === -1
                          ? "Danh mục chính"
                          : categories.filter(
                              (cat) =>
                                +cat.id === +store_edit.categories.parentCat
                            )[0].catName
                      }
                      onChange={handleChangeParentCat}
                      className="select--shadow select--bottom group__input-select-item"
                      data={categories.map((cat) => {
                        return {
                          id: cat.id,
                          content: cat.catName,
                        };
                      })}
                    ></Select>
                    {store_edit.categories.isSubCate && (
                      <Select
                        value={store_edit.categories.childrenCat}
                        onChange={handleChangeChildrenCat}
                        defaultSelected={
                          store_edit.categories.childrenCat === -1
                            ? "Danh mục phụ"
                            : loadListCatParent().filter(
                                (cat) =>
                                  +cat.id === +store_edit.categories.childrenCat
                              )[0].catName
                        }
                        className="select--shadow select--bottom group__input-select-item"
                        data={loadListCatParent().map((cat) => {
                          return {
                            id: cat.id,
                            content: cat.catName,
                          };
                        })}
                      ></Select>
                    )}
                  </div>
                </div>
                <InputWithLabel
                  inputClassName="form-item-view-main__input input--unit"
                  name="price"
                  type="number"
                  placeHolder="Học phí"
                  labelName="Học phí"
                  defauleValue={course.price}
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <InputWithLabel
                  inputClassName="form-item-view-main__input"
                  name="tinyDes"
                  placeHolder="Mô tả"
                  labelName="Mô tả ngắn"
                  defauleValue={course.tinyDes}
                  className="form-item-view-main input-horizontal input--shadow"
                  register={register}
                ></InputWithLabel>
                <div className="form-item-view-main__radio">
                  <label className="radio__label">Tình trạng</label>
                  <RadioButton
                    onChange={(e) => {
                      setValue("status", +e.target.value);
                    }}
                    value={course.status}
                    className="radio__input"
                    items={["Chưa hoàn Thành", "Hoàn Thành"]}
                  ></RadioButton>
                </div>
              </div>
              <div
                className="course-info__image"
                style={{
                  backgroundImage: `url("${course.srcImage}")`,
                }}
              >
                <div
                  className="image__change-photo"
                  onClick={() => {
                    file.current.click();
                  }}
                >
                  <i className="icon fa fa-camera" aria-hidden="true"></i>
                  <input
                    type="file"
                    ref={file}
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleChangeCourseImage}
                    hidden
                  ></input>
                </div>
              </div>
            </div>
            <div className="course-info__sub-form">
              <div className="course-info__full-desc">
                <div className="full-desc__editor">
                  <Editor
                    editorState={store_edit.fullDesEditor}
                    toolbarClassName="editor__toolbarClassName"
                    wrapperClassName="editor__wrapperClassName"
                    editorClassName="editor__ClassName"
                    placeholder="Mô tả chi tiết"
                    onEditorStateChange={handleFullDesc}
                  />
                </div>
              </div>
              <div className="course-info__btn-group">
                <Button
                  onClick={handleCancelEdit}
                  className="btn-smaller btn--color-white"
                  content="Quay lại"
                ></Button>
                <Button
                  className="btn-smaller btn--hover-change-color"
                  content="Cập nhật"
                  onClick={handleUpdate}
                ></Button>
              </div>
            </div>
          </div>,
          <div className="lession-info">
            <LessionsCourse
              lessions={store_edit.lessions}
              editCourseDispatch={editCourse_dispatch}
              course={course}
            ></LessionsCourse>
          </div>,
        ]}
        onChangeActive={handleChangeActive}
      ></NavTab>
    </div>
  );
};
