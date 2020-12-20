import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import editThread from "../../api/graphql/edit-thread";
import toastFetchErrors from "../../Components/tools/toast-fetch-errors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding:"1rem 2rem"
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h5: {
    margin: 20,
  },
  editor: {
    height: 500,
  },
}));

function EditComponent({ thread: originThread, handleClose }) {
  const classes = useStyles();
  const [thread, setThread] = useMergeState(originThread);
  let courseId = useParams();
  const history = useHistory();
  console.log(thread.threadId);
  courseId = parseInt(courseId.courseId, 10);
  const handleSubmit = async () => {

    try {
      const result = await editThread(thread.threadId, thread.title, thread.content);
      // TODO
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        // toast.success("Your topic will be displayed after 3 seconds", {
        //   autoClose: 3000,
        // });
        // setTimeout(() => {
        //   history.push(`/course/${courseId}/forum`);
        // }, 3000);
        console.log({ parsedResult });
        history.push(`/course/${courseId}/forum`);
      } else {
        toastFetchErrors(parsedResult);
      }
    } catch (error) {
      toast(error);
    }
  };

  const handleChange = (e) => {
    setThread({[e.target.name]:e.target.value});
  };

  return (
    <>
      <div className={classes.root}>
        <Container className={classes.root}>
          <Grid container direction="row" spacing={5}>
            <Grid container item xs={12} lg={8} direction="column" className={classes.whiteBack} spacing={5}>
              <Typography item variant="h3">
                Edit Post
              </Typography>
              <Typography className={classes.padding13} variant="subtitle2">
                Title
              </Typography>
              <TextField variant="outlined" required value={thread.title} name="title" onChange={handleChange}/>
              <Typography className={classes.padding13} variant="subtitle2">
                Body
              </Typography>
              <CKEditor
                className={classes.editor}
                editor={ClassicEditor}
                data={thread.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setThread({content: data});
                }}
              />
              <Button className={classes.padding13} style={{ margin: "20px" }} variant="contained" color="primary" onClick={handleSubmit}>
                Confirm
              </Button>
              <Grid container justify="flex-end">
                <Button onClick={handleClose}>Back to forum</Button>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default EditComponent;

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState) =>
    setState((prevState) => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}
