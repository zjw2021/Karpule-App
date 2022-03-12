import React, { useContext, useEffect, useState } from "react";
import Sheet from "react-modal-sheet";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RideContext from "../../context/ride/rideContext";
import UserContext from "../../context/users/userContext";

// Either display join, confirm/pay, has requested, or no button.
const ActionButton = ({
  inRide,
  isAwaitingPayment,
  hasRequested,
  onJoin,
  onConfirm,
}) => {
  if (hasRequested === true) {
    return (
      <Typography sx={{ color: "green" }} variant="h5">
        Ride Requested, awaiting approval from driver
      </Typography>
    );
  } else if (isAwaitingPayment === true) {
    return (
      <Button
        variant="contained"
        onClick={() => {
          onConfirm();
        }}
        className="formButton bodyMd w-bold"
      >
        Confirm and Pay
      </Button>
    );
  } else if (inRide) {
    return (
      <Typography sx={{ color: "green" }} variant="h5">
        You are currently in this ride.
      </Typography>
    );
  } else {
    // Not in the ride, and not awaiting payment, and not requested...
    return (
      <Button
        variant="contained"
        onClick={() => {
          onJoin();
        }}
        className="formButton bodyMd w-bold"
      >
        Request to Join
      </Button>
    );
  }
};

const RiderSelect = ({ isOpen, setOpen, ride }) => {
  const {
    destination,
    pickupLocation,
    pickupTime,
    seatFee,
    seatLimit,
    requested,
    awaitingPayment,
    _id,
    passengers,
  } = ride;

  const rideContext = useContext(RideContext);
  const { purchaseRide, requestRide, leaveRide, riderRide } = rideContext;

  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  const [driver, setDriver] = useState();

  useEffect(() => {
    const getDriver = async () => {
      const data = await getUser(ride.driver);
      setDriver(data);
    };
    getDriver();
  }, []);

  const onJoin = () => {
    requestRide(_id);
  };

  const onConfirm = () => {
    purchaseRide(_id);
  };

  // Only show action button if the user is not the driver of this ride
  const showActionButton = ride.driver != user?.user?._id;

  const inRide = passengers.map((obj) => obj.id).includes(user?.user?._id);
  const hasRequested = requested.map((obj) => obj.id).includes(user?.user?._id);
  const isAwaitingPayment = awaitingPayment
    .map((obj) => obj.passenger)
    .includes(user?.user?._id);

  return (
    <div>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="container">
              <p className="titleXl">Current Ride</p>
              <p className="bodyMd">Going to {destination}</p>
              <p className="bodyMd">
                Meet in {pickupLocation} at {pickupTime}
              </p>

              {driver && (
                <div>
                  <p className="bodyMd w-bold">Car Info</p>
                  <p className="bodyMd">
                    {driver.carColor} {driver.carModel}
                  </p>
                  <p className="bodyMd">{driver.carPlate}</p>
                  <p>Rider name</p>
                  <p className="bodyMd w-bold">Contact Info</p>
                  <p className="bodyMd">{driver.email}</p>
                </div>
              )}

              {showActionButton ? (
                <Box marginTop="3vh">
                  <ActionButton
                    inRide={inRide}
                    hasRequested={hasRequested}
                    isAwaitingPayment={isAwaitingPayment}
                    onJoin={onJoin}
                    onConfirm={onConfirm}
                  />
                </Box>
              ) : null}
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default RiderSelect;
