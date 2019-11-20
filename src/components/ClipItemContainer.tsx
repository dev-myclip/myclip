
//@ts-ignore
import GDL from "../GoogleDriveLibrary";
import GoogleClipItem from "./GoogleClipItem";

//@ts-ignore
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from "../logic/rootReducer";

import {
  addDisplayedClipItem,
  setDisplayedClipItems,
  removeDisplayedClipItem,
  addCachedClipItem,
  setCachedClipItemInfo,
  removeCachedClipItem,
} from "../logic/clipItemSlice"
import Masonry from "./Masonry";


import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";

import CloseIcon from "@material-ui/icons/Close";


const ClipItemContainer = (props: any) => {
  const dispatch = useDispatch();
  const list: string[] = useSelector((state: RootState) => {
      return state.clipItem.displayedClipItemsID
  });
  // https://material-ui.com/components/grid-list/
  return <Container>
    <Masonry colMinWidth="100px" balanceColumns={true}>
      {list.map((id: string) => (
        <GoogleClipItem key={id} id={id} />
      ))}
    </Masonry>
  </Container>;
};

export default ClipItemContainer;
