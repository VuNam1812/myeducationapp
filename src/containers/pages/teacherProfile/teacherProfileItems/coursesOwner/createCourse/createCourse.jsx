// @flow
import React, { useReducer, useRef } from "react";

import { Button, FieldText, Select } from "../../../../../../components";
import { useForm } from "react-hook-form";
import "./style.scss";
import Swal from "sweetalert2";
import courseApi from "../../../../../../api/courseAPI";
import { handleTeacheDashboard } from "../../../middlewares/handleTeacherDashboard";
import { COURSES_OWNER_ACTION } from "../reducer/reducer";
const initData = {
  isSubCate: false,
  parentCat: -1,
  childrenCat: -1,
  cateSelected: -1,
};

const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_ACTION.UPDATE_CAT_SELECTED:
      return {
        ...state,
        cateSelected: payload.catSelect,
      };
    case CREATE_ACTION.UPDATE_IS_SUBCATE:
      return {
        ...state,
        isSubCate: payload.isSubCate,
      };
    case CREATE_ACTION.UPDATE_PARENT_CAT:
      return {
        ...state,
        parentCat: payload,
      };
    case CREATE_ACTION.UPDATE_CHILDREN_CAT:
      return {
        ...state,
        childrenCat: payload,
      };
    case CREATE_ACTION.RESET_CATE:
      return {
        ...state,
        isSubCate: false,
        parentCat: -1,
        childrenCat: -1,
        cateSelected: -1,
      };
    default:
      return state;
  }
};

const CREATE_ACTION = {
  UPDATE_CAT_SELECTED: 1,
  UPDATE_IS_SUBCATE: 2,
  UPDATE_PARENT_CAT: 3,
  UPDATE_CHILDREN_CAT: 4,
  RESET_CATE: 5,
};

export const CreateCourse = ({
  courseOwnerDispatch,
  account,
  categories,
  dispatch,
}) => {
  const [store, create_dispatch] = useReducer(reducer, initData);
  const { register, setValue, handleSubmit, reset } = useForm();
  const submit = useRef();

  const handleParentCatSelected = (e) => {
    handleChangeCat(e);
    const selected = +e.target.value;
    create_dispatch({
      type: CREATE_ACTION.UPDATE_PARENT_CAT,
      payload: +selected,
    });
    create_dispatch({
      type: CREATE_ACTION.UPDATE_IS_SUBCATE,
      payload: {
        isSubCate: categories.filter((cate) => cate.id === selected)[0]
          .isSubCategory,
      },
    });
  };

  const handleChildrendCat = (e) => {
    handleChangeCat(e);
    const selected = +e.target.value;
    create_dispatch({
      type: CREATE_ACTION.UPDATE_CHILDREN_CAT,
      payload: +selected,
    });
  };

  const handleChangeCat = (e) => {
    const value = +e.target.value;
    create_dispatch({
      type: CREATE_ACTION.UPDATE_CAT_SELECTED,
      payload: {
        catSelect: +value,
      },
    });

    setValue("id_cat", value);
  };

  const onSubmitCreateCourse = async (data, e) => {
    if (data.courName.length === 0) {
      showError("T??n kh??a h???c kh??ng ???????c ????? tr???ng!!");
      return;
    }
    if (!data.id_cat) {
      showError("B???n ch??a ch???n danh m???c cho kh??a h???c!!");
      return;
    }
    try {
      const res = await courseApi.createCourse(data);

      await handleTeacheDashboard.loadCourseOwner({ id: account.id }, dispatch);

      setValue("courName", "");
      setValue("id_cat", null);

      courseOwnerDispatch({
        type: COURSES_OWNER_ACTION.MODAL_CLOSE,
      });

      create_dispatch({
        type: CREATE_ACTION.RESET_CATE,
      });

      Swal.fire({
        icon: "success",
        text: "T???o kh??a h???c th??nh c??ng!!",
        showConfirmButton: false,
        didOpen: () => {
          setTimeout(() => {
            Swal.close();
          }, 1000);
          //close Modal
        },
      });
    } catch (error) {
      showError("T???o kh??a h???c th???t b???i!! vui l??ng th??? l???i");
    }
  };

  const showError = (text) => {
    Swal.fire({
      icon: "error",
      title: "L???i",
      text: text,
      showConfirmButton: true,
      confirmButtonText: "X??c nh???n",
      confirmButtonColor: "",
    });
  };

  return (
    <div className="create-course">
      <div className="create-course__header">
        <p className="create-course__header-title">Th??m m???i kh??a h???c</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmitCreateCourse)}
        className="create-course__body"
      >
        <FieldText
          className="field--none-rounded body__input-field"
          name="courName"
          label="T??n kh??a h???c"
          placeHolder="T??n kh??a h???c"
          register={register}
        ></FieldText>

        <div>
          <Select
            className="select--shadow select--bottom"
            defaultSelected="Danh m???c kh??a h???c"
            value={store.parentCat}
            onChange={handleParentCatSelected}
            data={categories.map((category) => {
              return {
                id: category.id,
                content: category.catName,
              };
            })}
          ></Select>
          {store.isSubCate && (
            <Select
              className="select--shadow select--bottom"
              defaultSelected="Danh m???c con"
              onChange={handleChildrendCat}
              value={store.childrenCat}
              data={categories
                .filter((cate) => cate.id === store.parentCat)[0]
                .subCategory.map((category) => {
                  return {
                    id: category.id,
                    content: category.catName,
                  };
                })}
            ></Select>
          )}
        </div>
        <input type="submit" ref={submit} hidden></input>
      </form>
      <div className="create-course__footer">
        <Button
          content="T???o"
          bodyClassName="create-course__footer-btn-body"
          className="create-course__footer-btn btn--hover-change-color"
          onClick={() => {
            submit.current.click();
          }}
        ></Button>
      </div>
    </div>
  );
};
