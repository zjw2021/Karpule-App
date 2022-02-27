import React, { useContext } from "react";
import Sheet from "react-modal-sheet";
import RideContext from "../../context/ride/rideContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const RideInformation = ({ title, content }) => (
  <Box marginBottom="2vh">
    <Typography variant="h5" fontWeight="bold" display="inline">
      {title}:{" "}
    </Typography>
    <Typography variant="h5" display="inline">
      {content}
    </Typography>
  </Box>
);

const DriverSelect = ({ isOpen, setOpen, ride }) => {
  const rideContext = useContext(RideContext);
  const { deleteRide, completeRide } = rideContext;
  return (
    <div>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Box marginTop="4vh" paddingX="4vw">
              <Box marginBottom="6vh">
                <Typography variant="h4" display="inline">
                  Ride from{" "}
                </Typography>
                <Typography variant="h4" fontWeight="bold" display="inline">
                  {ride.pickupLocation}{" "}
                </Typography>
                <Typography variant="h4" display="inline">
                  to{" "}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {ride.destination}
                </Typography>
              </Box>
              <RideInformation title="Pickup Time" content={ride.pickupTime} />
              <RideInformation title="Seat Fee" content={`$${ride.seatFee}`} />
              <RideInformation title="Seat Limit" content={ride.seatLimit} />
              <RideInformation
                title="Number of Passengers"
                content={ride.passengers.length}
              />
              <Box marginTop="4vh">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteRide(ride._id);
                      setOpen(false);
                    }}
                  >
                    Delete Ride
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                        completeRide(ride._id);
                      setOpen(false);
                    }}
                  >
                    Complete Ride
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
};

export default DriverSelect;
