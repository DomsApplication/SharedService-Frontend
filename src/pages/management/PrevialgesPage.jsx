import React from "react";
import DynamicTable from "@/components/table-components/DynamicTable";
import { Skeleton } from "@mui/material";
import HeadingNav from "@/components/heading-nav";
import {
  useCreatePrevilagesMutation,
  useUpdatePrevilagesByIdMutation,
  useGetPrevilagesByIdQuery,
  useGetAllPrevilagesQuery,
  useDeletePrevilagesByIdMutation,
} from "@/app/features/previlagesApiSlice";

const PrevialgesPage = () => {
  const { data, isError, isLoading, error } = useGetAllPrevilagesQuery();
  const [createMutation] = useCreatePrevilagesMutation();
  const [deleteByIdMutation] = useDeletePrevilagesByIdMutation();
  const [updateByIdMutation] = useUpdatePrevilagesByIdMutation();

  const onSubmitEdit = updateByIdMutation;
  const onDeleteConform = deleteByIdMutation;

  const onSubmitCreate = createMutation;
  const tableColumns = [
    {
      header: "index",
      field: "index",
      type: "number",
    },

    {
      header: "Previalge label",

      field: "label",
      type: "text",
    },
    {
      header: "Previalge Description",
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
      label: "Previalge label",
      type: "input-text",
      name: "label",
    },
    {
      label: "Previalge Description",
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
            link: "/previalges",
            label: "Previalges",
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
            data?.privileges?.map((item, index) => ({
              index: index + 1,
              ...item,
            })) || []
          }
          Search={{ searchFields: ["label", "description"] }}
          label="Previalege"
          deleteLabelName="Previalege"
          onDeleteConform={onDeleteConform}
          onSubmitEdit={onSubmitEdit}
          onSubmitCreate={onSubmitCreate}
          itemForm={formItem}
        />
      )}
    </div>
  );
};

export default PrevialgesPage;
