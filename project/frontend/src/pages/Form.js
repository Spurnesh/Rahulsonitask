import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
} from "@material-ui/core";
import toCamelCase from "../utils/toCamelCase";
import AddIcon from "@material-ui/icons/Add";
import SelectMaker from "../components/SelectMaker";
import * as api from "../api";

const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    padding: "1rem",
    //  background: "#efffff",
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  },
  optionsSelectionDiv: {},
}));

export default function Form() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const initialValues1 = {
    serviceName: "",
    serviceCenter: "",
  };
  const validate1 = yup.object({
    serviceName: yup.string().required().label("Service Name"),
    serviceCenter: yup.string().required().label("Service Center"),
  });
  const [form1Values, setForm1Values] = useState();
  const handleForm1Submit = (values) => {
    setForm1Values(values);
    setValue(1);
  };

  const [addMore, setAddMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [fields, setFields] = useState([]);

  const [addedLabelValue, setAddedLabelValue] = useState("");
  const addLabel = () => {
    setFields(
      fields.concat({
        type: "label",
        name: toCamelCase(addedLabelValue),
        label: addedLabelValue,
      })
    );
    resetStates();
  };

  const resetStates = () => {
    setAddedLabelValue("");
    setAddMore(false);
    setSelectedOption(null);
  };

  const initialValues2 = useMemo(() => {
    const values = {};
    fields.forEach((field) => {
      if (field.type === "label") values[field.name] = "";
      else if (field.type === "select")
        values[field.name] = toCamelCase(field.options[0]);
      else return null;
    });
    return values;
  }, [fields]);

  const validate2 = useMemo(() => {
    const values = {};
    fields.forEach((field) => {
      values[field.name] = yup.string().required().label(field.label);
    });
    return yup.object(values);
  }, [fields]);

  yup.object({
    serviceName: yup.string().required().label("Service Name"),
    serviceCenter: yup.string().required().label("Service Center"),
  });
  const handleFinalSubmit = (values) => {
    const payload = {
      ...form1Values,
      ...values,
    };

    console.log(payload);
    api
      .createForm(payload)
      .then((res) => {
        window.alert("Form submitted successfully");
      })
      .catch((err) => {
        window.alert("Error!");
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ marginBottom: "1rem" }}>
        <Tabs value={value}>
          <Tab label="Form 1" />
          <Tab label="Form 2" />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <div>
          <Formik
            initialValues={initialValues1}
            validationSchema={validate1}
            onSubmit={handleForm1Submit}
          >
            {({ errors, values, handleChange, handleSubmit }) => (
              <div className={classes.form}>
                <TextField
                  fullWidth
                  name="serviceName"
                  label="Service Name"
                  variant="outlined"
                  value={values["serviceName"]}
                  onChange={handleChange}
                  error={!!errors["serviceName"]}
                  helperText={
                    errors["serviceName"] ? errors["serviceName"] : ""
                  }
                />
                <TextField
                  fullWidth
                  select
                  name="serviceCenter"
                  label="Service Center"
                  variant="outlined"
                  value={values["serviceCenter"]}
                  onChange={handleChange}
                  error={!!errors["serviceCenter"]}
                  helperText={
                    errors["serviceCenter"] && errors["serviceCenter"]
                  }
                >
                  <MenuItem value="center1">Center 1</MenuItem>
                  <MenuItem value="center2">Center 2</MenuItem>
                </TextField>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Next
                </Button>
              </div>
            )}
          </Formik>
        </div>
        <div>
          <Formik
            initialValues={initialValues2}
            validationSchema={validate2}
            onSubmit={handleFinalSubmit}
          >
            {({ errors, values, handleChange, handleSubmit }) => (
              <div className={classes.form}>
                {fields.map((field, i) => {
                  return field.type === "select" ? (
                    <TextField
                      key={i}
                      fullWidth
                      select
                      name={field.name}
                      label={field.label}
                      variant="outlined"
                      value={values[field.name] ? values[field.name] : ""}
                      onChange={handleChange}
                      error={!!errors[field.name]}
                      helperText={errors[field.name] ? errors[field.name] : ""}
                    >
                      {field.options.map((option, i) => (
                        <MenuItem key={i} value={toCamelCase(option)}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      key={i}
                      fullWidth
                      name={field.name}
                      label={field.label}
                      variant="outlined"
                      value={values[field.name] ? values[field.name] : ""}
                      onChange={handleChange}
                      error={!!errors[field.name]}
                      helperText={errors[field.name] ? errors[field.name] : ""}
                    />
                  );
                })}

                {addMore && (
                  <Box
                    display="grid"
                    gridColumnGap="0.7rem"
                    gridTemplateColumns="1fr 1fr"
                  >
                    {selectedOption !== 1 ? (
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setSelectedOption(0)}
                      >
                        Label
                      </Button>
                    ) : (
                      <div>
                        <SelectMaker
                          fields={fields}
                          setFields={setFields}
                          reset={resetStates}
                        />
                      </div>
                    )}

                    {selectedOption !== 0 ? (
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setSelectedOption(1)}
                      >
                        Dropdown
                      </Button>
                    ) : (
                      <Box
                        display="flex"
                        gridColumnGap="0.7rem"
                        alignItems="center"
                      >
                        <TextField
                          fullWidth
                          label="Field Name"
                          variant="outlined"
                          value={addedLabelValue}
                          onChange={(e) => setAddedLabelValue(e.target.value)}
                        />
                        <IconButton onClick={addLabel} color="primary">
                          <AddIcon />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}

                <Box display="flex" gridColumnGap="0.7rem">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setAddMore(true)}
                  >
                    Add More
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </div>
            )}
          </Formik>
        </div>
      </SwipeableViews>
    </div>
  );
}
