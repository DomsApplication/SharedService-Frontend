import { useGetFormDataQuery } from "@/app/features/dataApiSlice";
import DynamicForm from "@/components/form-components/DynamicForms";
import FormWrapper from "@/components/form-components/FormWarper";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const FormById = () => {
  const params = useParams();
  const { id } = params;
  const { data, isError, isSuccess, error } = useGetFormDataQuery({ id });
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  if (isSuccess) {
    const formConfig = data?.form;
    console.log(formConfig);
    return (
      <Box>
        {formConfig && (
          <FormWrapper formHeading={formConfig["heading"]} formDescription={formConfig["description"]}>
            <DynamicForm formConfig={formConfig} />
          </FormWrapper>
        )}
      </Box>
    );
  }
};

export default FormById;
