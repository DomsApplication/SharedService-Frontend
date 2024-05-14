import { useGetAllAdminObjectsQuery } from "@/app/features/admin-apis/admin-object-api-slice";
import AddDataObjectDialog from "@/components/Management-components/data/add-data-object-dialog";
import HeadingNav from "@/components/heading-nav";
import CardObjectData from "@/components/Management-components/data/card-data-object";
import { SearchOutlined } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Loader from "@/components/Loader";

const DataObjects = () => {
  //  get search params
  const search = new URLSearchParams(window.location.search).get("search");
  const [searchText, setSearchText] = useState(search || "");
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllAdminObjectsQuery({ search });
  if (isLoading) {
    return (
      <>
        {" "}
        <Loader />
      </>
    );
  }
  if (isError) {
    return (
      <Typography>Error: {error.data.message || error.data.error}</Typography>
    );
  }
  if (isSuccess) {
    return (
      <Box>
        <HeadingNav
          navLinks={[
            { link: "/", label: "Dashboard" },
            { link: "/data-management", label: "Data Management" },
          ]}
        />
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Data Objects</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* search box with  search button and onClick  set searchParams with search */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/data-management?search=${searchText}`;
              }}
            >
              <TextField
                type="text"
                variant="outlined"
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                  e.preventDefault();
                  setSearchText(e.target.value);
                }}
              />
              <IconButton type="submit">
                <SearchOutlined />
              </IconButton>
            </form>

            {/* Add Data Object Button */}
            <AddDataObjectDialog />
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr), lg:repeat(4, 1fr) , xl:repeat(4, 1fr)",
            },
            pt: 2,
            gap: 2,
          }}
        >
          {/* Card */}
          {data.map((obj) => (
            <CardObjectData
              key={obj.entity}
              title={obj.title}
              description={obj.description}
              id={obj.entity}
              count={obj.repository_count}
              shortName={obj?.properties?.entity?.short_name || ""}
            />
          ))}
        </Box>
      </Box>
    );
  }
};

export default DataObjects;
