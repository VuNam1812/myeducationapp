import { COURSES_ACTION } from "../reducer/reducer";
import categoryApi from "../../../../api/categoryAPI";
import courseApi from "../../../../api/courseAPI";
export const handleCoursePage = {
  loadInitPage: async (
    userData,
    store_courses,
    url,
    params,
    query,
    dispatch
  ) => {
    let result = "";
    let title = "";
    let courses = [];
    result =
      url.startsWith("courses", 1) && Object.keys(params).length === 0
        ? "courses"
        : "category";
    result = url.startsWith("search", 1) ? "search" : result;

    await dispatch({
      type: COURSES_ACTION.UPDATE_TYPE_PAGE,
      payload: result,
    });

    switch (result) {
      case "category":
        const res = await categoryApi.getSingle(params.slugCat, {
          bySlug: true,
        });
        dispatch({
          type: COURSES_ACTION.UPDATE_CATID,
          payload: +res.data.id,
        });

        const res_courses = (
          await categoryApi.getAllCourseByCatId(+res.data.id, {
            limit: store_courses.limit,
            page: 1,
            getInfo: ["firstLecture"],
          })
        ).data;
        courses = res_courses.courses;
        //setup pagination
        handleCoursePage.setupPagination(
          res_courses.length,
          store_courses.pageActive,
          store_courses.limit,
          dispatch
        );
        title = res.data.fullName;
        dispatch({
          type: COURSES_ACTION.UPDATE_LENGTH,
          payload: +res_courses.length,
        });
        break;
      case "search":
        const searchCourse = await courseApi.getAll({
          search: query.get("searchText"),
          limit: store_courses.limit,
          page: 1,
          getInfo: ["firstLecture", "lectureCount", "catName", "teacherName"],
        });
        handleCoursePage.setupPagination(
          searchCourse.data.length,
          store_courses.pageActive,
          store_courses.limit,
          dispatch
        );
        //setup pagination
        courses = searchCourse.data.courses;
        title = query.get("searchText");
        dispatch({
          type: COURSES_ACTION.UPDATE_LENGTH,
          payload: +searchCourse.data.length,
        });
        break;
      case "courses":
        const allCourse = (
          await courseApi.getAll({
            limit: store_courses.limit,
            page: 1,
            getInfo: ["firstLecture", "lectureCount", "catName", "teacherName"],
          })
        ).data;
        handleCoursePage.setupPagination(
          allCourse.length,
          store_courses.pageActive,
          store_courses.limit,
          dispatch
        );
        courses = allCourse.courses;
        dispatch({
          type: COURSES_ACTION.UPDATE_LENGTH,
          payload: +allCourse.length,
        });
        break;
      default:
        return;
    }
    dispatch({
      type: COURSES_ACTION.UPDATE_INIT,
      payload: {
        title: title,
        search: result === "search",
      },
    });
    dispatch({
      type: COURSES_ACTION.UPDATE_FILTER,
      payload: 0,
    });

    handleCoursePage.updateFieldsPaid(userData, courses, dispatch);
  },
  setupPagination: (length, active, limit, dispatch) => {
    const subPage = length % limit > 0 ? 1 : 0;
    const numPage = parseInt(length / limit) + subPage;
    const object = [];
    for (let index = 1; index <= numPage; index++) {
      object.push({
        id: index,
        active: +index === active ? "pagination__item--active" : "",
      });
    }
    dispatch({
      type: COURSES_ACTION.UPDATE_PAGINATION,
      payload: [...object],
    });
  },

  updateListRender: async (
    userData,
    typePage,
    catId,
    query,
    condition,
    dispatch
  ) => {
    let courses = [];
    switch (typePage) {
      case "category":
        const res_courses = (
          await categoryApi.getAllCourseByCatId(+catId, {
            ...condition,
            getInfo: ["firstLecture"],
          })
        ).data;
        courses = res_courses.courses;
        break;
      case "search":
        const searchCourse = await courseApi.getAll({
          search: query.get("searchText"),
          ...condition,
          getInfo: ["firstLecture", "lectureCount", "catName", "teacherName"],
        });
        courses = searchCourse.data.courses;
        break;
      case "courses":
        const allCourse = (
          await courseApi.getAll({
            ...condition,
            getInfo: ["firstLecture", "lectureCount", "catName", "teacherName"],
          })
        ).data;
        courses = allCourse.courses;
        break;
      default:
        return;
    }

    handleCoursePage.updateFieldsPaid(userData, courses, dispatch);
  },

  updateFieldsPaid: async (userData, courses, dispatch) => {
    let promises = [];
    if (userData.auth) {
      promises = courses.map((cour) => {
        return courseApi.checkPaid({ courId: cour.id });
      });
      const paidList = await Promise.all(promises);
      courses.forEach((cour, index) => {
        cour.paid = paidList[index].data.paid;
        cour.owner = cour.id_owner === userData.account.id;
      });
    } else {
      courses.forEach((cour) => {
        cour.paid = false;
        cour.owner = false;
      });
    }

    dispatch({
      type: COURSES_ACTION.UPDATE_RENDER_LIST,
      payload: courses,
    });
    setTimeout(() => {
      dispatch({
        type: COURSES_ACTION.UPDATE_LOADING,
        payload: false,
      });
    }, 2000);
  },

  getInfoFilter: (filter) => {
    switch (+filter) {
      case 1:
        return {
          order: "price",
          sort: "asc",
        };
      case 2:
        return {
          order: "rate",
          sort: "desc",
        };

      default:
        return {
          order: "id",
          sort: "asc",
        };
    }
  },
};
