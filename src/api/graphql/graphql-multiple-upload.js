import axios from 'axios';

const graphqlMultipleUpload = async (files) => {
  const data = new FormData();

  //* Operation field
  const query = `
  mutation uploadMultipleFiles($files: [Upload!]!) {
    uploadFileMultiple(files: $files) {
      filename
      mimetype
      uuid
    }
  }
  `;

  const filesNull = [];
  const map = {};
  for (let i = 0; i < files.length; ++i) {
    filesNull.push(null);

    //* Map field
    map[i] = [
      `variables.files.${i}`,
    ];
  }

  const variables = {
    files: filesNull,
  };
  data.append('operations', JSON.stringify({ query, variables }));

  //* Map field
  data.append('map', JSON.stringify(map));

  //* Files field
  for (let i = 0; i < files.length; i++) {
    data.append(i, files[i]);
  }

  //* Send data to server
  const response = await axios({
    url: '/api/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
    data,
  });
  return response.data;
};

export default graphqlMultipleUpload;
