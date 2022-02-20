import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import SearchBar from "../components/SearchBar";
import Rides from "../components/Rides";
import RideContext from "../context/ride/rideContext";
import UserContext from "../context/users/userContext";
import RiderRide from "../components/RiderRide";

const Home = () => {
  const userContext = useContext(UserContext);
  const {
    isAuth,
    finalizeStripe,
    isAuthorizedStripe,
    token,
    stripeCode,
    stripeState,
  } = userContext;

  const rideContext = useContext(RideContext);
  const { getRide, riderRide } = rideContext;

  const [ride, setRide] = useState();
  useEffect(async () => {
    // Only query rides if user has been authenticated
    if (isAuth && riderRide) {
      const getCurrentRide = async () => {
        const data = await getRide(riderRide);
        setRide(data);
      };
      getCurrentRide();
    }

    // 1. Check if stripe has been successfully integrated for the current user
    if (!(await isAuthorizedStripe(token))) {
      // 2. Finalize stripe
      if (stripeCode != null && stripeState != null) {
        console.log("code and state are not null/undefined");
        await finalizeStripe(stripeCode, stripeState, token);
      }
    }
  }, [riderRide, isAuth]);

  return (
    <Layout>
      <Menu />
      <SearchBar />
      {ride && <RiderRide ride={ride} />}
      <Rides />
    </Layout>
  );
};

export default Home;
