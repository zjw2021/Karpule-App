import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import CreateRide from "../components/CreateRide";
import DriverRide from "../components/DriverRide";
import UserContext from "../context/users/userContext";
import Passengers from "../components/Passengers";

const Drive = () => {
  const [rides, setRides] = useState([]);

  const userContext = useContext(UserContext);
  const { user, getDriverRides } = userContext;

  useEffect(async () => {
    setRides(await getDriverRides(user.user._id));
  }, []);

  return (
    <Layout>
      <Menu />
      <CreateRide />
      {rides.length > 0 && (
        <div>
          <DriverRide rides={rides} />
          <Passengers />
        </div>
      )}
    </Layout>
  );
};

export default Drive;
