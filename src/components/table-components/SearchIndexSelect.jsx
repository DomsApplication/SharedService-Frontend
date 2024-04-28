import { Select, MenuItem, InputLabel, FormControl, FormHelperText, Box } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

const SearchIndexSelectForm = ({ searchFields, selectIndex, setSelectIndex }) => {
  return (
    <Formik
      initialValues={{
        searchIndex: searchFields[0], // Set default value to the first option
      }}
      validationSchema={Yup.object().shape({
        searchIndex: Yup.string().required().trim(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSelectIndex(values.searchIndex);
          setSubmitting(false);
        } catch (err) {
          console.error("Error:", err);
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Box width={"100%"}>
            <FormControl error={Boolean(errors.searchIndex)}>
              <InputLabel htmlFor="search-field">Filter</InputLabel>
              <Select
                id="search-field"
                name="searchIndex"
                value={values.searchIndex}
                onChange={handleChange}
                onBlur={handleSubmit} // Submit the form when the menu selection changes
              >
                {searchFields.map((field, index) => (
                  <MenuItem key={index} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.searchIndex}</FormHelperText>
            </FormControl>
          </Box>
        </form>
      )}
    </Formik>
  );
};

SearchIndexSelectForm.propTypes = {
  searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectIndex: PropTypes.string.isRequired,
  setSelectIndex: PropTypes.func.isRequired,
};

export default SearchIndexSelectForm;
