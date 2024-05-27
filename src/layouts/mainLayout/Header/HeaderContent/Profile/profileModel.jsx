import { useAuth0 } from "@auth0/auth0-react";
import { AccountBoxOutlined, LogoutOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

const ProfileModel = ({ selectedIndex, handleListItemClick }) => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) {
    return (
      <LoaderIcon
        style={{
          width: "100px",
        }}
      />
    );
  }

  return (
    isAuthenticated && (
      <>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => {
            handleClickOpen();
            handleListItemClick(event, 2);
          }}
        >
          <ListItemIcon>
            <AccountBoxOutlined />
          </ListItemIcon>
          <ListItemText primary=" View Profile" />
        </ListItemButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              gap: 2,
              width: {
                xs: "100%",
                sm: "400px",
                md: "450px",
                lg: "500px",
                xl: "550px",
              },
            }}
          >
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
                  .then(() => loginWithRedirect())
                  .catch((e) => console.log(e))
              }
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
              startIcon={<LogoutOutlined />}
              size="large"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
              loadingPosition="start"
            >
              Log Out
            </Button>
          </DialogContent>
        </Dialog>
      </>
    )
  );
};

export default ProfileModel;
ProfileModel.propTypes = {
  selectedIndex: PropTypes.number,
  handleListItemClick: PropTypes.func,
};
