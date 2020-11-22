import axios from 'axios';
import Locate from './Locate'

const config = {
    method: 'post',
    url: 'http://172.23.66.105:5000/api/location',
    params: {}
}


export default function Report(uuid, lat, long){
    config.params.guid = uuid;
    config.params.latitude = lat;
    config.params.longitude = long;
    Locate(lat, long)
    .then(canton=>{
        config.params.canton = canton;
        console.log("enviado", uuid);
        return axios(config);
    })   
}