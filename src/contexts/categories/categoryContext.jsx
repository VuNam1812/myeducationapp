// @flow
import React, { useReducer, useEffect } from "react";
import categoryApi from "../../api/categoryAPI";
import { reducer, CAT_ACTION } from "./reducer";
export const categoryContext = React.createContext();
export const CategoryProvider = ({ children }) => {
  const [store_cat, dispatch_cat] = useReducer(reducer, {});
  useEffect(() => {
    (async () => {
      //load categories
      await loadCategories();
    })();
  }, []);

  const loadCategories = async () => {
    const cat_res = await categoryApi.getAll();
    let cats = [];
    cat_res.data.all.forEach((cat) => {
      cat.isSubCategory = cat.id_parentCat === 0 ? true : false;
      if (cat.id_parentCat === 0) {
        cat.subCategory = cat_res.data.all.filter(
          (value) => value.id_parentCat === cat.id
        );
        cat.isSubCategory = cat.subCategory.length === 0 ? false : true;
        cats.push(cat);
      }
    });
    dispatch_cat({
      type: CAT_ACTION.INIT,
      payload: cats,
    });
  };

  

  const exportContext = {
    store_cat,
    dispatch_cat: dispatch_cat,
    loadCategories: loadCategories,
  };

  return (
    <categoryContext.Provider value={exportContext}>
      {children}
    </categoryContext.Provider>
  );
};
