import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  makeStyles,
  Tabs,
  Tab,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import graphqlMultipleUpload from '../../../../../api/graphql/graphql-multiple-upload';
import { toast } from 'react-toastify';
import toastFetchErrors from '../../../../tools/toast-fetch-errors';
import createSubmission from '../../../../../api/graphql/create-submission';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  dueDate: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tabs: {
    height: 20,
    '& div': {
      cursor: 'pointer',
    }
  },
  tabInactive: {
    '&:hover': {
      backgroundColor: grey['200'],
    }
  },
  tabActive: {
    fontWeight: theme.typography.fontWeightBold,
    borderBottom: '3px solid',
    borderBottomColor: theme.palette.primary.main,
  },
  accordionBody: {
    flexDirection: 'column',
  },
  bodyDescription: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AssignmentItem = ({ assignment }) => {
  const classes = useStyles();
  const [description, setDecription] = useState('');
  const [dueDate, setDueDate] = useState(new Date(assignment.dueDate));
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleAssignmentsSubmit = async (assignmentId) => {
    setLoading(true);
    try {
      const fileUploadResult = await graphqlMultipleUpload(files);
      if (fileUploadResult.data?.uploadFileMultiple?.length !== 0) {
        setUploadedFiles(fileUploadResult.data.uploadFileMultiple);
        const result = await createSubmission(
          assignmentId,
          description,
          uploadedFiles,
        );
        const parsedResult = JSON.parse(result);
        if (parsedResult.data) {
          if (parsedResult.data.createSubmission.success) {
            toast.success('Assignment uploaded successfully!', {
              autoClose: 3000,
            });
            setLoading(false);
          } else {
            toast.error(parsedResult.data.createSubmission.message);
            setLoading(false);
          }
        } else {
          toastFetchErrors(parsedResult);
          setLoading(false);
        }
      } else {
        toastFetchErrors(fileUploadResult);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreRoundedIcon />}
      >
        <Typography className={classes.title}>{assignment.title}</Typography>
        <Typography className={classes.dueDate}>{`Due: ${assignment.dueDate ? dueDate.toLocaleString() : 'none'}`}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionBody}>
        <div className={classes.tabs}>
          <Grid
            container
            direction="row"
            spacing={3}
          >
            <Grid item>
              <div
                className={tab === 0 ? classes.tabActive : classes.tabInactive}
                role="tab"
                onClick={() => setTab(0)}
              >
                Content
              </div>
            </Grid>
            <Grid item>
              <div
                className={tab === 1 ? classes.tabActive : classes.tabInactive}
                role="tab"
                onClick={() => setTab(1)}
              >
                My Submission
              </div>
            </Grid>
          </Grid>
          {/* <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newVal) => setTab(newVal)}
          >
            <Tab label="Content" />
            <Tab label="My Submission" />
          </Tabs> */}
        </div>
        <br />
        {(() => {
          switch (tab) {
            case 0:
              return (
                <Typography className={classes.bodyDescription} variant="body1">
                  {assignment.content}
                </Typography>
              )
            case 1:
              return (
                <>
                  <div className="file-upload">
                    <TextField
                      type="text"
                      name="assignment-description"
                      label="Description (Optional)"
                      variant="outlined"
                      onChange={(event) => setDecription(event.target.value)}
                      fullWidth
                    />
                    <br />
                    <br />
                    <DropzoneArea
                      filesLimit={5}
                      showPreviews
                      showPreviewsInDropzone={false}
                      useChipsForPreview
                      showAlerts={false}
                      onChange={handleOnFilesChange}
                    />
                  </div>
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssignmentsSubmit(assignment.assignmentId, description)}
                    fullWidth
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </>
              )
            default:
              break;
          }
        })()}
      </AccordionDetails>
    </Accordion>
  )
};

export default AssignmentItem;
