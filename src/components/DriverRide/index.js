import React, { useContext, useEffect, useState } from "react";
import RideContext from "../../context/ride/rideContext";
import DriverSelect from "../DriverSelect";

const CurrentRide = () => {
  const rideContext = useContext(RideContext);
  const { driverRide } = rideContext;
  const { destination, pickupLocation, pickupTime, seatLimit, seatFee } =
    driverRide;

  const [isOpen, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(true)}>
      <p className="bodyMd w-reg">
        Going to {destination} at {pickupTime}.
      </p>
      <p>Ride</p>

      {/* //If driver mode is true than can edit and delete */}
      <DriverSelect isOpen={isOpen} setOpen={setOpen} ride={driverRide} />
    </div>
  );
};

export default CurrentRide;
