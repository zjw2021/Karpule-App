import React, { useContext, useEffect, useState } from "react";
import RideContext from "../../context/ride/rideContext";
import UserContext from "../../context/users/userContext";
import DriverSelect from "../DriverSelect";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const CurrentRide = ({ rides }) => {
  const userContext = useContext(UserContext);

  console.log(rides);

  //const rideContext = useContext(RideContext);
  //const { driverRide } = rideContext;
  //const { destination, pickupLocation, pickupTime, seatLimit, seatFee } =
  //driverRide;
  //
  const [selectedRide, setSelectedRide] = useState(null);

  const [isOpen, setOpen] = useState(false);

  return (
    <Container sx={{ marginTop: "3vh" }}>
      {rides.map((ride, i) => {
        return (
          <Card key={i} sx={{ marginBottom: "2vh" }} elevation={2}>
            <CardActionArea
              onClick={() => {
                setOpen(true);
                setSelectedRide(ride);
              }}
            >
              <CardContent>
                <Typography variant="h5" display="inline">
                  Ride from{" "}
                </Typography>
                <Typography variant="h5" fontWeight="bold" display="inline">
                  {ride.pickupLocation}{" "}
                </Typography>
                <Typography variant="h5" display="inline">
                  to{" "}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {ride.destination}
                </Typography>
                <Typography>Pick up at {ride.pickupTime}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
      {selectedRide && (
        <DriverSelect isOpen={isOpen} setOpen={setOpen} ride={selectedRide} />
      )}
    </Container>
  );

  //return (
  //<div onClick={() => setOpen(true)}>
  //<p className="bodyMd w-reg">
  //Going to {0} at {0}.
  //</p>
  //<p>Ride</p>

  //{[> //If driver mode is true than can edit and delete <]}
  //<DriverSelect isOpen={isOpen} setOpen={setOpen} ride={0} />
  //</div>
  //);
};

export default CurrentRide;
