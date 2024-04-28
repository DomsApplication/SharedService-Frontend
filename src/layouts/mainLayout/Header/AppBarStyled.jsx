// material-ui
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";

// project import
import { drawerWidth } from "@/config";
import { useMediaQuery } from "@mui/material";

// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  const isLarge = useMediaQuery("md");

  return {
    zIndex: 6,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open
      ? {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth - 10}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }
      : !isLarge
        ? {
            marginLeft: 80,
            width: `calc(100% - ${80}px)`,

            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }
        : {}),
  };
});

export default AppBarStyled;
