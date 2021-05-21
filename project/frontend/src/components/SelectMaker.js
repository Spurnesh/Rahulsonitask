import { Box, IconButton, makeStyles, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import toCamelCase from "../utils/toCamelCase";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
}));

export default function SelectMaker({ fields, setFields, reset }) {
  const classes = useStyles();

  const [selectLabel, setSelectLabel] = useState("");
  const [menuOptions, setMenuOptions] = useState([""]);

  const addMoreOptions = () => {
    setMenuOptions(menuOptions.concat(""));
  };
  const editMenuOption = (i, value) => {
    const state = [...menuOptions];
    state[i] = value;

    setMenuOptions(state);
  };

  const addSelect = () => {
    const optionsToAdd = menuOptions.filter((option) => option !== "");
    if (optionsToAdd.length === 0) return;
    setFields(
      fields.concat({
        type: "select",
        name: toCamelCase(selectLabel),
        label: selectLabel,
        options: optionsToAdd,
      })
    );

    reset();
  };

  return (
    <div className={classes.root}>
      <Box display="flex" gridColumnGap="0.7rem" alignItems="center">
        <TextField
          fullWidth
          label="Label for Dropdown"
          variant="outlined"
          value={selectLabel}
          onChange={(e) => setSelectLabel(e.target.value)}
        />
        <IconButton color="primary" onClick={addSelect}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        gridColumnGap="1.1rem"
        alignItems="flex-end"
        my="1.1rem"
      >
        <Box
          display="flex"
          flexDirection="column"
          gridRowGap="0.9rem"
          alignItems="flex-end"
          flexGrow={1}
        >
          {menuOptions.map((option, i) => (
            <TextField
              key={i}
              fullWidth
              size="small"
              label="Select Menu Option"
              variant="outlined"
              value={option}
              onChange={(e) => editMenuOption(i, e.target.value)}
            />
          ))}
        </Box>
        <IconButton
          size="small"
          style={{ marginBottom: 7 }}
          color="primary"
          onClick={addMoreOptions}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </div>
  );
}
