// @flow
import React, { useContext, useReducer, useEffect, useRef } from "react";
import "./style.scss";
import { Button, Modal, FieldText, Select } from "../../../../../components";
import { categoryContext } from "../../../../../contexts/categories/categoryContext";
import { authContext } from "../../../../../contexts/auth/authContext";
import { reducer, enumState, CATEGORIES_ADMIN_ACTION } from "./reducer/reducer";
import { handleAdminCategory } from "./middlewares/handleAdminCategory";
import { useForm } from "react-hook-form";
const initData = {
  active: 0,
  catSelected: {},
  catSelectedModal: {},
  modalState: enumState.HIDDEN,
  isCreateCategory: false,
  urlSeleted: "",
  error: {
    catName: {
      isShow: false,
      message: "*Hiện chưa nhập thông tin!!",
    },
  },
};

export const Categories = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { store_cat, dispatch_cat } = useContext(categoryContext);
  const { store_auth } = useContext(authContext);

  const { register, getValues, setValue } = useForm();
  const file = useRef();

  useEffect(() => {
    handleAdminCategory.updateFirstCatSelected(
      +store.active,
      store_cat.data[+store.active],
      dispatch
    );
  }, [store_cat.data]);

  const handleChangeCatSelected = (e) => {
    const index = e.currentTarget.getAttribute("data-id");

    handleAdminCategory.updateCatSelected(store_cat.data, index, dispatch);
  };

  const handleCreateCatModal = () => {
    handleAdminCategory.createCatClick(dispatch);

    setValue("catName", "");
    setValue("id_parentCat", 0);
  };

  const handleCreateCategory = async () => {
    if (!handleAdminCategory.validFieldText(getValues(), dispatch)) return;

    await handleAdminCategory.createCategory(
      store_auth.account,
      getValues(),
      dispatch,
      dispatch_cat
    );
  };

  const handleEditCategoryModal = (cat) => {
    handleAdminCategory.editCatClick(cat, dispatch);

    setValue("catName", cat.catName);
    setValue("id_parentCat", +cat.id_parentCat);
    setValue("srcImage", cat.srcImage);
  };

  const handleEditCategory = async () => {
    if (!handleAdminCategory.validFieldText(getValues(), dispatch)) return;

    await handleAdminCategory.updateCategory(
      store_auth.account,
      store.catSelectedModal,
      getValues(),
      store.catSelected,
      dispatch,
      dispatch_cat
    );
  };

  const handleUploadFile = (e) => {
    if (e.target.files.length === 0) return;

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_URL_SELECTED,
      payload: URL.createObjectURL(e.target.files[0]),
    });

    setValue("srcImage", e.target.files[0]);
  };

  return (
    <div className="categories-page">
      <div className="categories-page__group">
        <Button
          content="Thêm danh mục"
          className="btn-smaller group__btn-add btn--hover-vertical-change-color"
          onClick={handleCreateCatModal}
        ></Button>
        <Modal
          state={store.modalState}
          onClickOverlay={() => {
            dispatch({
              type: CATEGORIES_ADMIN_ACTION.MODAL_CLOSE,
            });
          }}
        >
          <div className="category-modal">
            <div className="category-modal__header">
              <p className="header-category__title">
                {store.isCreateCategory ? "Tạo mới" : "Chỉnh sửa"} danh mục
              </p>
            </div>
            <div className="category-modal__content">
              <div
                className="content-category__image"
                style={{
                  backgroundImage: `url("${store.urlSeleted}")`,
                }}
              >
                <input
                  accept="image/*"
                  onChange={handleUploadFile}
                  type="file"
                  ref={file}
                  hidden
                ></input>
                <div
                  className="image__btn-upload"
                  onClick={() => {
                    file.current.click();
                  }}
                >
                  <i
                    className="fa fa-cloud-upload fa-2x"
                    aria-hidden="true"
                  ></i>
                  Tải lên hình ảnh
                </div>
              </div>
              <FieldText
                label="Tên danh mục"
                placeHolder="Tên danh mục"
                name="catName"
                defaultValue={
                  Object.keys(store.catSelectedModal).length === 0
                    ? ""
                    : store.catSelectedModal.catName
                }
                className="field--none-rounded content-category__input"
                register={register}
                error={store.error.catName}
              ></FieldText>
              <Select
                data={[
                  { id: -1, content: "Danh mục chính" },
                  ...store_cat.data.map((cat) => {
                    return {
                      id: cat.id,
                      content: cat.catName,
                    };
                  }),
                ]}
                value={
                  Object.keys(store.catSelectedModal).length === 0
                    ? -1
                    : store.catSelectedModal.id_parentCat
                    ? store.catSelectedModal.id_parentCat
                    : -1
                }
                defaultSelected={
                  Object.keys(store.catSelectedModal).length === 0
                    ? "Danh mục chính"
                    : store.catSelectedModal.id_parentCat
                    ? store_cat.data.filter(
                        (cat) => store.catSelectedModal.id_parentCat === cat.id
                      )[0].catName
                    : "Danh mục chính"
                }
                className="select--shadow"
                onChange={(e) => {
                  setValue(
                    "id_parentCat",
                    +e.target.value === -1 ? 0 : +e.target.value
                  );
                }}
              ></Select>
            </div>
            <div className="category-modal__footer">
              <Button
                content={store.isCreateCategory ? "Thêm mới" : "Cập nhật"}
                className="footer-category__btn btn--hover-change-color"
                bodyClassName="footer-category__btn-body"
                onClick={
                  store.isCreateCategory
                    ? handleCreateCategory
                    : handleEditCategory
                }
              ></Button>
            </div>
          </div>
        </Modal>
        {store_cat.data.map((cat) => {
          return (
            <div
              data-id={cat.id}
              className={`group-item ${
                +cat.id === +store.catSelected.id ? "active" : ""
              }`}
              onClick={handleChangeCatSelected}
            >
              {cat.catName}
            </div>
          );
        })}
      </div>
      <div className="categories-page__content">
        {Object.keys(store.catSelected).length !== 0 && (
          <>
            <div className="content__main-category">
              <div
                className="main-category__image"
                style={{
                  backgroundImage: `url("${store.catSelected.srcImage}")`,
                }}
              ></div>

              <div className="main-category__info">
                <div className="block-flex">
                  <p className="info__name">{store.catSelected.catName}</p>
                  <div
                    className="info__edit-btn"
                    onClick={() => {
                      handleEditCategoryModal(store.catSelected);
                    }}
                  >
                    <i
                      className="icon fa fa-pencil-square fa-lg"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <p className="info__count">
                  {store.catSelected.subCategory?.length || 0} danh mục
                </p>
              </div>
              <div
                className="main-category__delete-btn"
                onClick={() => {
                  handleAdminCategory.deleteCategory(
                    store.catSelected,
                    dispatch_cat
                  );
                }}
              >
                <i className="icon fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
            <p className="content__sub-category-title">Danh mục con</p>
            <div className="content__sub-category-group">
              {!store.catSelected.isSubCategory ? (
                <div className="sub-category-group__empty">
                  ( Hiện chưa có dữ liệu)
                </div>
              ) : (
                store.catSelected.subCategory.map((cat) => {
                  return (
                    <div className="content__main-category sub-category-group__item">
                      <div
                        className="main-category__image sub-category-group__item-image"
                        style={{
                          backgroundImage: `url("${cat.srcImage}")`,
                        }}
                      ></div>
                      <div className="main-category__info">
                        <div className="block-flex">
                          <p className="sub-category-group__item-name info__name">
                            {cat.catName}
                            <span
                              className="info__edit-btn"
                              onClick={() => {
                                handleEditCategoryModal(cat);
                              }}
                            >
                              <i
                                className="icon fa fa-pencil-square fa-lg"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </p>
                        </div>
                      </div>
                      <div
                        className="main-category__delete-btn"
                        onClick={() => {
                          handleAdminCategory.deleteCategory(cat, dispatch_cat);
                        }}
                      >
                        <i className="icon fa fa-trash" aria-hidden="true"></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
