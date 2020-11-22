import axios from 'axios';

const config = {
    method: 'post',
    url: 'http://172.23.66.105:5000/api/session',
    params: {}
}

export default function Confirm(uuid, status){
    config.params.guid = uuid;
    config.params.status = status;

    return axios(config);
}