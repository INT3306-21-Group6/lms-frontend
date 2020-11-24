import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import graphqlMultipleUpload from '../../../api/graphql/graphql-multiple-upload';

// TODO: Submit button loading state and success/failure messages
const FileUpload = ({ title }) => {
  const [files, setFiles] = React.useState([]);

  const handleOnFilesChange = (addedFiles) => {
    setFiles(addedFiles);
  };

  const handleFilesSubmit = async () => {
    const result = await graphqlMultipleUpload(files);
    console.log(result);
  };

  return (
    <div className="file-upload">
      <Typography variant="h4">{title}</Typography>
      <br />
      <DropzoneArea
        filesLimit={5}
        showPreviews
        showPreviewsInDropzone={false}
        useChipsForPreview
        showAlerts={false}
        // alertSnackbarProps={{
        //   anchorOrigin: {
        //     horizontal: 'right',
        //     vertical: 'bottom',
        //   },
        // }}
        onChange={handleOnFilesChange}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={handleFilesSubmit}
        fullWidth
      >
        Submit
      </Button>
    </div>
  );
};

export default FileUpload;
