import React from "react";
import DynamicTable from "@/components/table-components/DynamicTable";
import { Skeleton } from "@mui/material";
import HeadingNav from "@/components/heading-nav";
import {
  useCreateRoleMutation,
  useDeleteRoleByIdMutation,
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useUpdateRoleByIdMutation,
} from "@/app/features/rolesApiSlice";

const RolesPage = () => {
  const { data, isError, isLoading, error } = useGetAllRolesQuery();
  const [createRoleMutation] = useCreateRoleMutation();
  const [deleteRoleByIdMutation] = useDeleteRoleByIdMutation();
  const [updateRoleByIdMutation] = useUpdateRoleByIdMutation();

  const onSubmitEdit = updateRoleByIdMutation;
  const onDeleteConform = deleteRoleByIdMutation;

  const onSubmitCreate = createRoleMutation;
  const tableColumns = [
    {
      header: "index",
      field: "index",
      type: "number",
    },

    {
      header: "Role label",

      field: "label",
      type: "text",
    },
    {
      header: "Role Description",
      field: "description",
      type: "text",
    },
    {
      header: "Created At",
      field: "createdAt",
      type: "date",
    },
  ];
  if (isError)
    return (
      <div>
        <h1>Error Occured</h1>
        <pre>{JSON.stringify(error)}</pre>
      </div>
    );
  const formItem = [
    {
      label: "Role label",
      type: "input-text",
      name: "label",
    },
    {
      label: "Role Description",
      type: "input-text",
      name: "description",
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
            link: "/role",
            label: "Roles",
          },
        ]}
      />
      {isLoading ? (
        <div>
          <Skeleton variant="rectangular" width={"100%"} height={500} />{" "}
        </div>
      ) : (
        <DynamicTable
          tableColumns={tableColumns}
          tableData={
            data?.roles?.map((item, index) => ({
              index: index + 1,
              ...item,
            })) || []
          }
          Search={{ searchFields: ["label", "description"] }}
          label="Role"
          deleteLabelName="Role"
          onDeleteConform={onDeleteConform}
          onSubmitEdit={onSubmitEdit}
          onSubmitCreate={onSubmitCreate}
          itemForm={formItem}
        />
      )}
    </div>
  );
};

export default RolesPage;
