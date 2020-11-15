import axios, { AxiosRequestConfig }  from 'axios';

const config = {
    method: 'put',
    url: 'REQUEST A NUESTRO API',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
}


export default function Report(){
    return axios(config);
}