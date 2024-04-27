import { useGetFormsQuery } from "@/app/features/dataApiSlice";
import DynamicTable from "@/components/table-components/DynamicTable";
import TableWarper from "@/components/table-components/TableWarper";

const GetAllForms = () => {
  const { data, isError, isLoading, error } = useGetFormsQuery();

  const tableColumns = [
    {
      header: "index",
      field: "index",
      type: "number",
    },

    {
      header: "heading",
      field: "heading",
      type: "text",
    },
    {
      header: "Description",
      field: "description",
      type: "text",
    },
    {
      header: "Created At",
      field: "createdAt",
      type: "date",
    },
    {
      header: "View Form ",
      field: "link",
      type: "link",
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
      {isLoading ? (
        <div> loading ... </div>
      ) : (
        <TableWarper tableHeading={"All the Forms"} tableDiscription={"All the Forms "}>
          {" table useage changed "}{" "}
        </TableWarper>
      )}
    </div>
  );
};

export default GetAllForms;
