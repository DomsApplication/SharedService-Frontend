import React from "react";
import DynamicTable from "@/components/table-components/DynamicTable";
import { useCreateUserMutation, useGetAllUsersQuery } from "@/app/features/userApiSlice";
import { Skeleton } from "@mui/material";
import HeadingNav from "@/components/heading-nav";

const GetAllUsers = () => {
  const { data, isError, isLoading, error } = useGetAllUsersQuery();
  const [createUserMutation] = useCreateUserMutation();
  // add onedit and ondelte
  const onSubmitEdit = createUserMutation;
  const onDeleteConform = createUserMutation;
  const onSubmitCreate = createUserMutation;

  const tableColumns = [
    {
      header: "index",
      field: "index",
      type: "number",
    },

    {
      header: "FirstName",
      field: "firstName",
      type: "text",
    },
    {
      header: "LastName",
      field: "lastName",
      type: "text",
    },
    { header: "Email Id", field: "email", type: "text" },
    {
      header: "Created At",
      field: "createdAt",
      type: "date",
    },
    {
      header: "Company Name",
      field: "companyName",
      type: "text",
    },
  ];
  const formItem = [
    {
      label: "First Name",
      type: "input-text",
      name: "firstName",
    },
    {
      label: "LastName",
      type: "input-text",
      name: "lastName",
    },
    {
      label: "Email Id",
      type: "input-text",
      name: "email",
    },
    {
      label: "Password",
      type: "input-text",
      name: "password",
    },
    {
      label: "Company Name",
      type: "input-text",
      name: "companyName",
    },
  ];
  if (isError)
    return (
      <div>
        <h1>Error Occured</h1>
        <pre>{JSON.stringify(error)}</pre>
      </div>
    );

  return (
    <div>
      <HeadingNav
        navLinks={[
          {
            link: "/",
            label: "Dashboard",
          },
          {
            link: "/users",
            label: "Users",
          },
        ]}
      />
      {isLoading ? (
        <div>
          {" "}
          <Skeleton variant="rectangular" width={"100%"} height={500} />{" "}
        </div>
      ) : (
        <DynamicTable
          tableColumns={tableColumns}
          tableData={
            data?.users.map((item, index) => ({
              index: index + 1,
              ...item,
            })) || []
          }
          Search={{ searchFields: ["firstName", "lastName"] }}
          isFormTable={true}
          label="User"
          deleteLabelName="User"
          onDeleteConform={onDeleteConform}
          onSubmitEdit={onSubmitEdit}
          itemForm={formItem}
          onSubmitCreate={onSubmitCreate}
        />
      )}
    </div>
  );
};

export default GetAllUsers;
