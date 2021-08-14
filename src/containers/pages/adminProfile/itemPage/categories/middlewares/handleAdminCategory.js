import { CATEGORIES_ADMIN_ACTION } from "../reducer/reducer";
import { CAT_ACTION } from "../../../../../../contexts/categories/reducer";
import Swal from "sweetalert2";
import categoryApi from "../../../../../../api/categoryAPI";
export const handleAdminCategory = {
  updateFirstCatSelected: (index, cat, dispatch) => {

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT,
      payload: {
        cat,
        index,
      },
    });
  },

  updateCatSelected: (cats, index, dispatch) => {
    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT,
      payload: {
        cat: cats.filter((cat) => +cat.id === +index)[0],
        index: cats.findIndex((cat) => +cat.id === +index),
      },
    });
  },

  createCatClick: (dispatch) => {
    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT_MODAL,
      payload: {},
    });

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.MODAL_CREATE_OPEN,
    });

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_URL_SELECTED,
      payload: "",
    });
  },

  editCatClick: (cat, dispatch) => {
    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT_MODAL,
      payload: cat,
    });

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.MODAL_EDIT_OPEN,
    });

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_URL_SELECTED,
      payload: `${cat.srcImage}`,
    });
  },

  validFieldText: (data, dispatch) => {
    const result = data.catName.length === 0 ? true : false;
    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_ERROR_CAT_NAME,
      payload: {
        isShow: result,
      },
    });

    return !result;
  },

  createCategory: async (account, data, dispatch, dispatch_cat) => {
    let result = false;
    await Swal.fire({
      text: "Cập nhật khóa học",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        if (data.srcImage && typeof data.srcImage === "object") {
          const linkUpload = await categoryApi.getLinkUpload({
            fileName: data.srcImage.name,
            fileType: data.srcImage.type,
            userId: account.id,
          });

          const { urlGetObject, urlSaveObject } = linkUpload.data.uri;

          await categoryApi.uploadImage(urlSaveObject, data.srcImage, {
            "Content-type": data.srcImage.type,
          });

          data.srcImage = urlGetObject;
        } else {
          delete data.srcImage;
        }

        const res = await categoryApi.create(data);

        result = res.data.created;
        if (result) {
          const catNew = await categoryApi.getSingle(res.data.catId);

          dispatch_cat({
            type: CAT_ACTION.ADD_SINGLE_CAT,
            payload: catNew.data,
          });
        }

        Swal.close();
      },
    });

    if (result) {
      dispatch({
        type: CATEGORIES_ADMIN_ACTION.MODAL_CLOSE,
      });

      Swal.fire({
        icon: "success",
        text: "Tạo danh mục thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng thử lại!!",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }
  },

  updateCategory: async (
    account,
    editCat,
    data,
    catSelected,
    dispatch,
    dispatch_cat
  ) => {
    let result = false;
    await Swal.fire({
      text: "Cập nhật danh mục",
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        if (typeof data.srcImage !== "string") {
          const linkUpload = await categoryApi.getLinkUpload({
            fileName: data.srcImage.name,
            fileType: data.srcImage.type,
            userId: account.id,
          });

          const { urlGetObject, urlSaveObject } = linkUpload.data.uri;

          await categoryApi.uploadImage(urlSaveObject, data.srcImage, {
            "Content-type": data.srcImage.type,
          });

          data.srcImage = urlGetObject;
        }

        const res = await categoryApi.updateInfo(editCat.id, data);

        result = res.data.updated;

        if (result) {
          const cats = await categoryApi.getAll();

          dispatch_cat({
            type: CAT_ACTION.REFRESH_CAT,
            payload: cats.data.all,
          });
          const newArrCat = handleAdminCategory.groupCategories(cats.data.all);
          handleAdminCategory.resetSeletedCat(
            data,
            catSelected,
            newArrCat,
            dispatch
          );
        }

        Swal.close();
      },
    });

    if (result) {
      dispatch({
        type: CATEGORIES_ADMIN_ACTION.MODAL_CLOSE,
      });

      Swal.fire({
        icon: "success",
        text: "Cập nhật thành công.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng thử lại.",
        showConfirmButton: false,
        didOpen: async () => {
          setTimeout(() => {
            Swal.close();
          }, 1200);
        },
      });
    }

    return result;
  },

  groupCategories: (data) => {
    const cats = [];
    data.forEach((cat) => {
      cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
      if (cat.id_parentCat === 0) {
        cat.subCategory = data.filter((value) => value.id_parentCat === cat.id);
        cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
        cats.push(cat);
      }
    });
    return cats;
  },

  resetSeletedCat: (editCat, catSelected, arrCat, dispatch) => {
    const selected = arrCat.filter((cat) => cat.id === catSelected.id)[0]
      ? arrCat.filter((cat) => cat.id === catSelected.id)[0]
      : arrCat.filter((cat) => cat.id === editCat.id_parentCat)[0];

    dispatch({
      type: CATEGORIES_ADMIN_ACTION.UPDATE_CAT_SELECT,
      payload: {
        cat: { ...selected },
        index: arrCat.findIndex((val) => val.id === selected.id),
      },
    });
  },

  deleteCategory: async (cat, dispatch_cat) => {
    const canDelete = (await categoryApi.checkDelete(cat.id)).data.canDelete;
    if (!canDelete) {
      Swal.fire({
        icon: "error",
        text: "Bạn không thể xóa danh mục đang có khóa học.",
        showConfirmButton: true,
        confirmButtonText: "Xác nhận",
        confirmButtonColor: "#00ab15",
      });
    } else {
      const confirm = await Swal.fire({
        icon: "question",
        text: "Xác nhận xóa danh mục đang chọn?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy bỏ",
        confirmButtonColor: "#00ab15",
        cancelButtonColor: "#dc3545",
      });
      if (confirm.isConfirmed) {
        let resultRes = false;
        await Swal.fire({
          text: "Đang xóa danh mục",
          showConfirmButton: false,
          allowOutsideClick: false,
          didOpen: async () => {
            Swal.showLoading();

            const res = await categoryApi.delete(cat.id);
            resultRes = res.data.deleted;

            if (resultRes) {
              dispatch_cat({
                type: CAT_ACTION.DELETE_SINGLE_CAT,
                payload: cat,
              });
            }

            Swal.close();
          },
        });
        if (resultRes) {
          Swal.fire({
            icon: "success",
            text: "Xóa danh mục thành công.",
            showConfirmButton: false,
            didOpen: async () => {
              setTimeout(() => {
                Swal.close();
              }, 1200);
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Vui lòng thử lại.",
            showConfirmButton: false,
            didOpen: async () => {
              setTimeout(() => {
                Swal.close();
              }, 1200);
            },
          });
        }
      }
    }
  },
};
