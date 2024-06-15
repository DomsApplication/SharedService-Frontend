import { Box } from "@mui/material";
import Heading from "./heading";

const HeroSection = () => {
  return (
    <>
      <div className="w-full min-h-[calc(85vh)]  flex flex-col lg:flex-row justify-center items-center lg:items-start  lg:justify-stretch py-16 gap-7">
        <div className=" lg:w-2/3  w-full ">
          <Heading />
        </div>
        <div className=" w-full  lg:w-1/3  lg:flex ">
          <Box
            sx={{ borderColor: "primary.main", bgcolor: "primary.main" }}
            className=" w-96  overflow-hidden transition-all rounded-full border-2 border-dashed wavy-border flex items-center justify-center animate-spin  "
          >
            <img
              src="/landing.png"
              alt="landing image"
              className="w-72 md:w-96 p-5 rounded-full aspect-square ease-in-out transition-all repeat-infinite"
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
