
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import { sizing } from '@material-ui/system';
import { makeStyles, Theme, createStyles }
    from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Dialog from "@material-ui/core/Dialog";
import InputBase from "@material-ui/core/InputBase";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from '@material-ui/core/transitions';

import DoneIcon from "@material-ui/icons/Done";

import InputBar from "./InputBar";
import { TextClipPageWrapper } from "../actions/TextClipPage";

const Transition = React.forwardRef<unknown, TransitionProps>(
    (props: any, ref: any) => (<Slide direction="up" ref={ref} {...props} />)
);

const TextClipPage = ({
    open, title, content,
    onCloseButtonClick,
    onTitleChange,
    onDoneButtonClick,
    onContentChange,
    onContentBlur,
}: any) => {
  return <Dialog fullScreen
      open={open}
      TransitionComponent={Transition}>
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <InputBar
          position="sticky"
          onInputBarClose={onCloseButtonClick}
          onInputChange={(text: string) => onTitleChange(text)}
          onInputDone={() => onDoneButtonClick(title, content)}
          placeholder="Title (Optional)" />
      <Box display="flex" flexGrow={1}>
        <InputBase
          multiline fullWidth
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            onContentChange(e.currentTarget.value);
          }}
          onBlur={(e: React.FormEvent<HTMLInputElement>) => {
            onContentBlur(e.currentTarget.value);
          }}
          style={{
            alignItems: "start",
            resize: "none",
            background: "#eee",
          }} />
      </Box>
    </Box>
  </Dialog>;
};

export default TextClipPageWrapper(TextClipPage);
