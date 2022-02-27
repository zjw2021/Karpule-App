import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RideContext from "../context/ride/rideContext";
import UserContext from "../context/users/userContext";

const PurchaseSuccess = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const rideContext = useContext(RideContext);
  const { joinRide } = rideContext;
  const [searchParams] = useSearchParams();

  useEffect(async () => {
    const ride = searchParams.get("ride");
    if (ride) {
      await joinRide(ride, user);
      window.location.href = "/";
    }
  }, [user]);

  return <h1>Purchase Success</h1>;
};

export default PurchaseSuccess;
