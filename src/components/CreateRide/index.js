import React, { useContext, useState } from "react";
import RideContext from "../../context/ride/rideContext";
import UserContext from "../../context/users/userContext";
import Sheet from "react-modal-sheet";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

const CreateRide = () => {
  const rideContext = useContext(RideContext);
  const { createRide, driverRide } = rideContext;

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const [ride, setRide] = useState({
    destination: "",
    pickupLocation: "",
    pickupTime: "",
    seatLimit: "",
    seatFee: "",
  });

  const { destination, pickupLocation, pickupTime, seatLimit, seatFee } = ride;

  const resetForm = () => {
    setRide({
      destination: "",
      pickupLocation: "",
      pickupTime: "",
      seatLimit: "",
      seatFee: "",
    });
  };

  const onChange = (e) => {
    setRide({ ...ride, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createRide(ride, user);
    resetForm();
    setOpen(false);
  };

  const [isOpen, setOpen] = useState(false);

  return (
    <div>
      {driverRide === null ? (
        <Button
          endIcon={<AddIcon />}
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
        >
          Create Ride
        </Button>
      ) : (
        <p className="bodyLg w-med">Current Ride</p>
      )}
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Container sx={{ paddingTop: "8vh" }}>
              <Box marginBottom="5vh">
                <Typography variant="h4" fontWeight="bold">
                  Create Ride +
                </Typography>
              </Box>
              <FormControl sx={{ width: "100%", marginBottom: "3vh" }}>
                <TextField
                  size="small"
                  sx={{ marginBottom: "2vh" }}
                  name="destination"
                  label="Destination"
                  value={destination}
                  onChange={onChange}
                />
                <TextField
                  size="small"
                  sx={{ marginBottom: "2vh" }}
                  name="pickupLocation"
                  label="Pickup"
                  value={pickupLocation}
                  onChange={onChange}
                />
                <TextField
                  size="small"
                  sx={{ marginBottom: "2vh" }}
                  name="pickupTime"
                  label="Time"
                  value={pickupTime}
                  onChange={onChange}
                />
                <TextField
                  size="small"
                  sx={{ marginBottom: "2vh" }}
                  name="seatLimit"
                  label="Limit"
                  value={seatLimit}
                  onChange={onChange}
                />
                <TextField
                  size="small"
                  sx={{ marginBottom: "4vh" }}
                  name="seatFee"
                  label="Fee"
                  value={seatFee}
                  onChange={onChange}
                />
                <Button variant="contained" color="primary" onClick={onSubmit}>
                  Create
                </Button>
              </FormControl>
            </Container>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default CreateRide;
