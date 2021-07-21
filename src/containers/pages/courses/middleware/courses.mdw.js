import { COURSES_ACTION } from "../reducer/reducer";
import categoryApi from "../../../../api/categoryAPI";
import courseApi from "../../../../api/courseAPI";
export const handleCoursePage = {
  loadInitPage: async (userData, url, params, query, dispatch) => {
    let result = "";
    let title = "";
    let courses = [];
    result =
      url.startsWith("courses", 1) && Object.keys(params).length === 0
        ? "courses"
        : "category";
    result = url.startsWith("search", 1) ? "search" : result;

    switch (result) {
      case "category":
        const res = await categoryApi.getSingle(+params.catId);
        courses = (
          await categoryApi.getAllCourseByCatId(+params.catId, {
            getInfo: ["firstLecture"],
          })
        ).data;
        title = res.data.fullName;
        break;
      case "search":
        const searchCourse = await courseApi.getAll({
          search: query.get("searchText"),
          order: "id",
          sort: "asc",
        });
        courses = searchCourse.data.courses;
        title = query.get("searchText");
        break;
      default:
        courses = (await courseApi.getAll()).data.all;

        break;
    }

    if (userData.auth) {
      for (const cour of courses) {
        cour.paid = (await courseApi.checkPaid({ courId: cour.id })).data.paid;
        cour.owner = cour.id_owner === userData.account.id;
      }
    }
    dispatch({
      type: COURSES_ACTION.UPDATE_COURSES,
      payload: {
        courses: [...courses],
      },
    });
    dispatch({
      type: COURSES_ACTION.UPDATE_FILTER,
      payload: 0,
    });
    dispatch({
      type: COURSES_ACTION.UPDATE_INIT,
      payload: {
        title: title,
        search: result === "search",
      },
    });
    
    return result;
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

  filterCourses: (courses, filter, dispatch) => {
    let newCourses = [];

    switch (filter) {
      case 1:
        newCourses = [...courses.sort((a, b) => a.price - b.price)];
        break;
      case 2:
        newCourses = [...courses.sort((a, b) => -(a.rate - b.rate))];
        break;
      default:
        newCourses = [...courses.sort((a, b) => a.id - b.id)];
        break;
    }
    dispatch({
      type: COURSES_ACTION.UPDATE_COURSES,
      payload: {
        courses: [...newCourses],
      },
    });
  },

  loadCourseBySearchText: (searchText = "") => {},
};
