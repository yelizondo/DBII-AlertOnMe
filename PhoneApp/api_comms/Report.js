import axios, { AxiosRequestConfig }  from 'axios';

const config = {
    method: 'put',
    url: 'REQUEST A NUESTRO API',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
}


export default function sendReport(uuid, lat, long, canton){
    console.log(uuid)
    console.log(lat)
    console.log(long)
    console.log(canton)
    //return axios(config);
}