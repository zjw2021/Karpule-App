import { useContext } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserContext from "../context/users/userContext";

// Proxy page after initial stripe authorization page
const RegisterComplete = () => {
  const userContext = useContext(UserContext);
  const { finalizeStripe, stripeStatus } = userContext;

  // Get the code + state from url
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const stateParam = searchParams.get("state").split(":");
  const state = stateParam[0];
  const token = stateParam[1];

  finalizeStripe(code, state, token);

  return (
    <>
      <Typography>LOADING!</Typography>
      {stripeStatus === 200 ? <Navigate to="/" /> : null}
    </>
  );
};

export default RegisterComplete;
