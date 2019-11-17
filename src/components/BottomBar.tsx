
//@ts-ignore
import React from "react";

import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import ToolBar from '@material-ui/core/ToolBar';

import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from '@material-ui/icons/Done';

const InputBar = ({
      onInputBarClose, onInputChange, onInputDone,
      position, doneIcon = (<DoneIcon />),
      placeholder = "", value
}: any) => {

  return <AppBar position={position}>
    <ToolBar>
      <IconButton edge="start" onClick={onInputBarClose}>
        <CloseIcon />
      </IconButton>
      <TextField placeholder={placeholder}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            onInputChange(e.currentTarget.value);
          }}
          style={{ flex: 1 }} margin="dense" value={value}/>
      <IconButton edge="end" onClick={onInputDone}>
        {doneIcon}
      </IconButton>
    </ToolBar>
  </AppBar>;
};

export default InputBar;