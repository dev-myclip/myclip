
//@ts-ignore
import GDL from "../GoogleDriveLibrary";

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
  deleteClipItem,
} from "../logic/clipItemSlice"
import {
  setVisible as setClipActionDialogVisible,
  setTarget as setClipActionDialogTarget,
} from "../logic/clipActionDialogSlice";
import {
  setVisible, setTarget, setTitle, setContent
} from "../logic/textClipPageSlice";
import {
  setVisible as setOverlayVisible, setContent as setOverlayContent
} from "../logic/functionalOverlaySlice"


import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from '@material-ui/core/CardContent';
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => createStyles({
  GCI: {
    boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2)," +
               "0px 8px 10px 1px rgba(0,0,0,0.14)," +
               "0px 3px 14px 2px rgba(0,0,0,0.12)",
    "&:hover": {
      border: "1px solid rgba(0, 0, 0, 0.35)",
      boxShadow: "none",
    }
  },
}));

export interface ClipItem {
  id?: string;
};

const GoogleClipItem = ({
  id, onLoad = () => {}
}: {
  id: string
  onLoad?: () => void
}) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const [ loaded, setLoaded ] = useState(false);
  const { id: _id, name, content, type = "" } =
      useSelector((state: RootState) => {
          if(Object.prototype.hasOwnProperty.call(
                state.clipItem.cachedClipItems, id)){
            return state.clipItem.cachedClipItems[id]
          } else{
            return { id }
          }
      });
  console.assert(id === _id);

  const showTextClipPage = React.useCallback(() => {
    dispatch(setVisible(true))
    dispatch(setTarget(id))
    dispatch(setTitle(name))
    dispatch(setContent((content as string) || ""))
    setLoaded(false)
  }, [dispatch, id, name, content]);

  const showActionDialog = React.useCallback(() => {
    dispatch(setClipActionDialogVisible(true))
    dispatch(setClipActionDialogTarget(id))
  }, [dispatch, id]);

  if(!loaded && type.startsWith("text") && content){
    setLoaded(true)
    onLoad()
  }
  // console.log("content isEmpty:", !content, "type:", type, "loaded:", loaded);

  // https://material-ui.com/components/grid-list/
  return <Card className={classes.GCI}
      style={{
        height: "auto",
        cursor: "pointer",
        background: "#ffd",
      }}>
    <CardActionArea
        onClick={() => {
          if(type.startsWith("text")) return showTextClipPage()
          if(type.startsWith("image")){
            dispatch(setOverlayContent({ type, content }))
            dispatch(setOverlayVisible(true))
          }
        }}>
      <CardContent style={{
            padding: "12px",
          }}>
        <div
          style={{ // important
            background: "#dfd", width: "100%",
            maxHeight: "280px", overflow: "hidden",
            display: "inline-block",
          }}>
          {
            type.startsWith("text") ? 
              <div style={{
                  fontFamily: "Consolas", padding: "5px 2px",
                  wordBreak: "break-all", whiteSpace: "pre-wrap", }}>
                {content}
              </div> :
            type.startsWith("image") ?
              <div onLoad={() => {
                if(!loaded){
                  setLoaded(true);
                  onLoad()
                }
              }} style={{
                display: "inline-block",
                width: "100%", height: "280px",
                background: `center / contain no-repeat url(${content})`
              }} /> : false ?
              <img src={content} onLoad={() => {
                if(!loaded){
                  setLoaded(true);
                  onLoad()
                }
              }} style={{
                display: "inline-block",
                width: "100%", height: "100%",
                objectFit: "contain",
              }} /> :
            "[Loading ...]"
          }
        </div>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button onClick={showActionDialog}
          size="small" color="primary"
          startIcon={<MoreVertIcon />}
          style={{
            maxWidth: "50%",
          }}>
        <Typography style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "none",
              fontWeight: 600,
              lineHeight: 1.75,
              fontSize: "0.8125rem",
            }}>
          {name}
        </Typography>
      </Button>
      <Button size="small" color="primary"
          onClick={() => dispatch(deleteClipItem(id))}>
        Delete
      </Button>
      { type ? (
        type.startsWith("text") ?
          <Button size="small" color="primary"
              onClick={() => {}}>
            Copy
          </Button> :
        type.startsWith("image") ?
          <Button size="small" color="primary"
              onClick={() => {}}>
            Save
          </Button> : undefined
      ) : undefined}
    </CardActions>
  </Card>;
};

export default GoogleClipItem;
