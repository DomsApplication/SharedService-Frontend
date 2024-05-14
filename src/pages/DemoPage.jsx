import { Button, Container } from "@mui/material";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          position: "absolute",
          top: 20,
          left: 4,
        }}
      >
        <Button variant="contained"> Go Back Home </Button>
      </Link>
      <Button
        variant="contained"
        color="error"
        startIcon={<LoaderIcon style={{ width: "20px", height: "20px" }} />}
        sx={{
          textTransform: "none",
          fontSize: "1.5rem",
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          fontWeight: "700",
        }}
      >
        {" "}
        Page Not Found
      </Button>
    </Container>
  );
};

export default PageNotFound;
