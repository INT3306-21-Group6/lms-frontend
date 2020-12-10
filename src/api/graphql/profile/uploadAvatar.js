import axios from 'axios';

const uploadAvatar = async (file) => {
    const query = `mutation uploadAvatar($file: Upload!){
        uploadAvatar(avatar: $file){
            success
            message
        }
    }`;
    const data = new FormData();
    data.append('operations', JSON.stringify({ query, variables: { file: null }}));
    data.append('map', JSON.stringify({0: ['variables.file']}));
    data.append('0', file[0]);
    const response = await axios({
        url: '/api/graphql',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        data,
    });
    console.log(response);
    return response;
};

export default uploadAvatar;
