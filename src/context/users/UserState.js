import { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  STRIPE_FINALIZE,
  STRIPE_SET_CODE_STATE,
  REGISTER_DRIVER_SUCCESS,
  REGISTER_DRIVER_FAIL,
  LOAD_USER,
  LOGOUT,
} from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    isDriver: false,
    hasRegistered: false,
    token: null,
    isAuth: null,
    alert: null,
    stripeStatus: null,
    stripeCode: null,
    stripeState: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (user) => {
    const {
      email,
      password,
      carModel,
      carPlate,
      carColor,
      firstName,
      lastName,
    } = user;

    try {
      const config = { headers: { "content-type": "application/json" } };

      // Send response to database with volunteer's firstname, lastname, and email
      await axios
        .post(
          "/api/users/register",
          {
            email,
            password,
            carModel,
            carPlate,
            carColor,
            firstName,
            lastName,
          },
          config
        )
        .then(async (res) => {
          //If no errors, set volunteer variable to response
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });

          loadUser(res.data);

          // Call stripe endpoint
          await axios
            .get("/api/stripe/authorize", {
              headers: { "x-auth-token": res.data.token },
            })
            .then((res) => {
              // Redirect to given url (replace current tab)
              // url: "https://connect.stripe.com/express/oauth/authorize"
              window.location.href = res.data.url;
            });
        });
    } catch (err) {
      console.log(err.msg);
    }
  };

  const finalizeStripe = async (code, state, token) => {
    console.log("This is the token:", token);
    try {
      const config = {
        headers: { "content-type": "application/json", "x-auth-token": token },
      };
      const res = await axios.post(
        "/api/stripe/finalize",
        { code, state },
        config
      );
      console.log("FINALIZED STRIPE");
      dispatch({
        type: STRIPE_FINALIZE,
        payload: res.status,
      });
    } catch (err) {
      console.log(err.msg);
    }
  };

  const isAuthorizedStripe = async (token) => {
    try {
      const res = await axios.get("/api/stripe/isauthorized", {
        headers: {
          "x-auth-token": token,
        },
      });
      return res.data.complete;
    } catch (err) {
      console.log(err.msg);
    }
  };

  const setStripeCodeAndState = (code, state) => {
    dispatch({
      type: STRIPE_SET_CODE_STATE,
      payload: { code, state },
    });
  };

  const registerDriver = async (info, user) => {
    try {
      const { carModel, carPlate, carColor } = info;
      const config = { headers: { "content-type": "application/json" } };

      // Send response to database with volunteer's firstname, lastname, and email
      const res = await axios.put(
        `/api/users/${user}`,
        { carModel, carPlate, carColor },
        config
      );

      // If no errors, set volunteer variable to response
      dispatch({
        type: REGISTER_DRIVER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.msg);
    }
  };

  const loginUser = async (user) => {
    const { email, password } = user;
    const config = { headers: { "content-type": "application/json" } };
    await axios
      .post("/api/users/login", { email, password }, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });

        console.log(res.data);

        loadUser(res.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginUserWithToken = async (token) => {
    const config = { headers: { "content-type": "application/json" } };
    console.log(token);
    await axios
      .post("/api/users/loginwithtoken", { token }, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });

        console.log(res.data);

        loadUser(res.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const loadUser = async (user) => {
    try {
      dispatch({
        type: LOAD_USER,
        payload: user,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT });
  };

  const getUser = async (user) => {
    try {
      if (user === "") return;
      const res = await axios.get(`/api/users/${user}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  // Return the rides associated with the given user
  const getDriverRides = async (user) => {
    try {
      if (user === "") return;
      const res = await axios.get(`/api/users/rides/${user}`);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isDriver: state.isDriver,
        hasRegistered: state.hasRegistered,
        token: state.token,
        isAuth: state.isAuth,
        stripeStatus: state.stripeStatus,
        stripeCode: state.stripeCode,
        stripeState: state.stripeState,
        registerUser,
        finalizeStripe,
        isAuthorizedStripe,
        setStripeCodeAndState,
        registerDriver,
        loginUser,
        loginUserWithToken,
        loadUser,
        logoutUser,
        getUser,
        getDriverRides,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
