import { siteConfig } from "@/utils/site-config";

import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "@mui/material";
const Heading = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  return (
    <Card className=" px-3 bg-grad border-none shadow-none w-full my-0 py-0 flex justify-center items-center flex-col ">
      <CardHeader className="mx-auto p-0 m-0 ">
        <CardTitle className=" lg:px-8  prose mx-auto lg:mx-10 text-3xl lg:text-5xl  ">
          {siteConfig.description}
          <div className=" underline underline-offset-4 lg:no-underline relative dark:text-stone-200 text-stone-800 ">
            <motion.div
              initial={{ width: "20rem" }}
              whileInView={{ width: "35rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className=" absolute hidden lg:flex  bottom-0 z-50 h-0.5 translate-y-2  bg-primary "
            ></motion.div>
            {siteConfig.name}
          </div>
          <div className=" mt-3   prose  text-xl font-normal pt-5">
            {siteConfig.subtitle}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="  m-0 lg:mx-16 lg:w-[60%]  py-10   flex gap-6 w-full  px-8 ">
        {isLoading ? (
          <Skeleton className="w-full px-4 py-2 h-10"></Skeleton>
        ) : isAuthenticated ? (
          <Link to="/dash" className=" w-full">
            <Button variant="contained" className="w-full">
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link to="/signin" className="w-full">
            <Button variant="contained" className="w-full">
              Get Started
            </Button>
          </Link>
        )}
        <Button
          className="w-full"
          variant="contained"
          color="secondary"
          sx={{
            bgcolor: "secondary.dark",
            "&:hover": {
              bgcolor: "secondary.main",
            },
          }}
        >
          About Us
        </Button>
      </CardContent>
    </Card>
  );
};

export default Heading;
