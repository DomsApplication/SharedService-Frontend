// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ position: "absolute", filter: "blur(18px)", zIndex: -1, bottom: 0 }}
      width={"100%"}
      height={"100%"}
      justifyContent={"flex-start"}
      display={"flex"}
      alignItems={"center"}
      bgcolor={theme.palette.background.paper}
    >
      <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
          stroke={theme.palette.primary.main}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default AuthBackground;
