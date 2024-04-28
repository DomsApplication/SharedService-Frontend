import { Formik } from "formik";
import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { OutlinedInput, Box } from "@mui/material";

const SearchAccToIndex = ({ search, setSearch }) => {
  return (
    <>
      <Formik
        initialValues={{
          searchInputText: "",
        }}
        validationSchema={Yup.object().shape({
          searchInputText: Yup.string().trim(),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSearch(values.searchInputText);
            setSubmitting(false);
          } catch (err) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          } finally {
            console.log(search);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box display={"flex"}>
              <OutlinedInput
                id="search"
                type="input"
                value={values.searchInputText}
                name="searchInputText"
                onChange={(event) => {
                  handleChange(event);
                  handleSubmit(event);
                }}
                placeholder="search ...."
                fullWidth
                error={Boolean(touched.searchInputText && errors.searchInputText)}
              />
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

SearchAccToIndex.prototypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchAccToIndex;
