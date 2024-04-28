import { useGetAdminObjectQuery } from "@/app/features/admin-apis/admin-object-api-slice";
import {
  useCreateAdminRepoMutation,
  useDeleteAdminRepoMutation,
  useGetAdminRepoQuery,
  useUpdateAdminRepoMutation,
} from "@/app/features/admin-apis/admin-repo-api-slice";
import HeadingNav from "@/components/heading-nav";
import DynamicTable from "@/components/table-components/DynamicTable";
import { Box, Skeleton } from "@mui/material";
import toast from "react-hot-toast";

const GetAllUsers = () => {
  const {
    data: objectData,
    isError: isObjectError,
    isLoading: isObjectLoading,
    isSuccess: isObjectSuccess,
    error: objectError,
  } = useGetAdminObjectQuery("user");
  const { data, isError, isLoading, error, isSuccess } =
    useGetAdminRepoQuery("user");
  const [createUserMutation] = useCreateAdminRepoMutation();
  const [updateUserByIdMutation] =
    useUpdateAdminRepoMutation();
  const [deleteUserMutation] = useDeleteAdminRepoMutation();
  const onSubmitEdit = updateUserByIdMutation;
  const onDeleteConform = deleteUserMutation;
  const onSubmitCreate = createUserMutation;
  const tableColumns = [];
  const formItems = [];

  if (isObjectError) {
    toast.error(
      objectError?.data?.message ||
        objectError?.data?.error,
    );
    return null;
  }
  if (isError) {
    toast.error(error?.data?.message || error?.data?.error);
    return null;
  }
  if (isLoading || isObjectLoading) {
    return (
      <div>
        {" "}
        <Skeleton
          variant='rectangular'
          width={"100%"}
          height={500}
        />{" "}
      </div>
    );
  }
  if (isSuccess && isObjectSuccess) {
    Object.keys(objectData.properties).forEach(
      (property) => {
        const {
          // description,
          type,
          // minLength,
          // maxLength,
          format,
        } = objectData.properties[property];
        let columnType, formType;

        switch (type) {
          case "string":
            columnType = "text";
            formType = "input-text";
            break;
          case "boolean":
            columnType = "boolean";
            formType = "input-checkbox";
            break;
          case "integer":
            columnType = "number";
            formType = "input-number";
            break;
          default:
            columnType = "text";
            formType = "input-text";
        }

        if (format === "email") {
          columnType = "email";
          formType = "input-email";
        }

        tableColumns.push({
          header:
            property.charAt(0).toUpperCase() +
            property.slice(1).replace(/_/g, " "),
          field: property,
          type: columnType,
        });

        formItems.push({
          label:
            property.charAt(0).toUpperCase() +
            property.slice(1).replace(/_/g, " "),
          type: formType,
          name: property,
        });
      },
    );

    console.log("Table Columns:", tableColumns);
    console.log("Form Items:", formItems);

    return (
      <Box p={1} maxWidth={"100%"}>
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

        <DynamicTable
          tableColumns={tableColumns}
          tableData={
            data?.map((item, index) => ({
              index: index + 1,
              ...item,
            })) || []
          }
          Search={{
            searchFields: ["firstName", "lastName"],
          }}
          isFormTable={true}
          label='User'
          deleteLabelName='User'
          onDeleteConform={onDeleteConform}
          onSubmitEdit={onSubmitEdit}
          itemForm={formItems}
          onSubmitCreate={onSubmitCreate}
        />
      </Box>
    );
  }
};

export default GetAllUsers;
