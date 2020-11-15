import axios, { AxiosRequestConfig }  from 'axios';

const config = {
    method: 'get',
    url: 'REQUEST A GMAPS',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
}


export default function Report(){
    /* 
    se puede procesar la info que manda gmaps haciéndole 
    .then((response)=>{}) al axios(config). 
    */
    return axios(config);
}