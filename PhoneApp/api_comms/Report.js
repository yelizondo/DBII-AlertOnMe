import axios from 'axios';
import Locate from './Locate'

const config = {
    method: 'put',
    url: 'REQUEST A NUESTRO API',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
}


export default function Report(uuid, lat, long){
    console.log("UUID:", uuid);
    console.log("Latitude:", lat);
    console.log("Longitude:", long);
    Locate(lat, long)
    .then(canton=>console.log("Cantón:", canton))
    //return axios(config);
}