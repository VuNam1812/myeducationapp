export const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case CAT_ACTION.INIT:
      return {
        ...state,
        data: [...payload],
      };
    case CAT_ACTION.ADD_SINGLE_CAT:
      return {
        ...state,
        data: handleAddCat(payload, state.data),
      };

    case CAT_ACTION.REFRESH_CAT:
      return {
        ...state,
        data: handleUpdateCat(payload),
      };

    case CAT_ACTION.DELETE_SINGLE_CAT:
      return {
        ...state,
        data: handleDeleteCat(payload, state.data),
      };
    default:
      return state;
  }
};

const handleAddCat = (catNew, cats) => {
  catNew.isSubCategory = false;
  if (catNew.id_parentCat === 0) {
    return [...cats, catNew];
  } else {
    const index = +cats.findIndex((cat) => cat.id === catNew.id_parentCat);
    const catParent = cats[index];
    catParent.isSubCategory = true;
    catParent.subCategory = catParent.subCategory?.length
      ? [...catParent.subCategory, catNew]
      : [catNew];
    return [...cats.fill(catParent, index, index + 1)];
  }
};

const handleUpdateCat = (data) => {
  const cats_new = [];
  data.forEach((cat) => {
    cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
    if (cat.id_parentCat === 0) {
      cat.subCategory = [
        ...data.filter((value) => value.id_parentCat === cat.id),
      ];
      cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
      cats_new.push(cat);
    }
  });
  return [...cats_new];
};

const handleDeleteCat = (catDelete, cats) => {
  if (catDelete.id_parentCat === 0) {
    return cats.filter((cat) => cat.id !== catDelete.id);
  } else {
    const index = +cats.findIndex((cat) => cat.id === catDelete.id_parentCat);
    const catParent = cats[index];

    catParent.subCategory = catParent.subCategory?.length
      ? catParent.subCategory.filter((cat) => cat.id !== catDelete.id)
      : [];
    catParent.isSubCategory = catParent.subCategory.length !== 0;
    return [...cats.fill(catParent, index, index + 1)];
  }
};

export const CAT_ACTION = {
  INIT: 1,
  REFRESH_CAT: 2,
  ADD_SINGLE_CAT: 3,
  DELETE_SINGLE_CAT: 4,
};
