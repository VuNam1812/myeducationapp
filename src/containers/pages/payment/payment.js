// @flow
import React, { useReducer, useEffect, useContext } from "react";
import "./style.scss";
import { HeaderUpper } from "../../header/HeaderUpper/headerUpper";

import { ProcessBar } from "./processBar/processBar";
import { ConfirmCourse } from "./confirmCourse/confirmCourse";
import { CompletePayment } from "./completePayment/completePayment";

import { handlePayment } from "./middleware/handlePayment";
import { reducer, PAY_ACTION } from "./reducer/reducer";
import { useHistory, useParams } from "react-router-dom";
import { authContext } from "../../../contexts/auth/authContext";
const initData = {
  active: 1,
  course: {},
  user: {},
};

export const Payment = (props) => {
  const [store, dispatch] = useReducer(reducer, initData);
  const { store_auth } = useContext(authContext);
  const history = useHistory();
  const params = useParams();
  useEffect(() => {
    (async () => {
      if (Object.keys(store_auth.account) !== 0) {
        await handlePayment.checkAccountPayment(params, history);
      }
    })();
  }, [history.location]);

  useEffect(() => {
    (async () => {
      if (Object.keys(store_auth.account).length !== 0) {
        await Promise.all([
          handlePayment.loadCourse(params, dispatch, history),
          handlePayment.loadUserInfo(store_auth.account, dispatch),
        ]);
      }
    })();
  }, [store_auth.account]);

  return (
    <div className="payment">
      <HeaderUpper className="header--zoom-80"></HeaderUpper>
      <div className="payment-body">
        <div className="wrap">
          <ProcessBar active={store.active}></ProcessBar>
          <div className={`payment-body active--${store.active}`}>
            <ConfirmCourse
              course={store.course}
              account={store.user}
              dispatch={dispatch}
            ></ConfirmCourse>
            <CompletePayment course={store.course}></CompletePayment>
          </div>
        </div>
      </div>
    </div>
  );
};
