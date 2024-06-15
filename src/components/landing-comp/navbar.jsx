import { siteConfig } from "@/utils/site-config";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import UserMemu from "../user-menu";
const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="flex justify-center items-center h-16 lg:h-20 p-1   shadow-md shadow-secondary w-full bggrad ">
      <Box
        // sx={{
        //   color: "primary.main",
        // }}
        className="text-3xl font-bold  font-mono mr-auto"
      >
        {siteConfig.name}
      </Box>
      <nav className="hidden gap-6 md:flex justify-center items-center px-2">
        {isLoading ? (
          <Skeleton className="w-48 h-8" />
        ) : isAuthenticated ? (
          <>
            <Link to="/dash">
              <Button variant="contained">Dashboard</Button>
            </Link>
            <UserMemu />
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="contained">Login</Button>
            </Link>
          </>
        )}
      </nav>
      <nav className="flex gap-6 md:hidden">
        {isLoading ? (
          <Skeleton className="w-48 h-8" />
        ) : isAuthenticated ? (
          <>
            <Link to="/dash">
              <Button variant="contained">Dashboard</Button>
            </Link>

            <UserMemu />
          </>
        ) : (
          <Link to="/signin">
            <Button variant="contained">Login</Button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
