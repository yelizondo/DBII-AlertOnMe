import axios from 'axios';

/*
Sobre el request:
1) API de Google de donde saca la info: https://maps.googleapis.com/maps/api/geocode/
2) json: Formato de la respuesta del query al API
3) Ingreso de coordenadas latitud y longitud: latlng=${lat},${long}
4) Filtro para sacar el cantón: result_type=administrative_area_level_2
5) Llave para ser capaces de sacar info del API: key=AIzaSyBqhDOPHmVkPUdpM83voYgUBm3lSWzd6_U
*/

const config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json?',
    params: {
      latlng: '9.949556, -84.046887',   // Placeholder de la coordenada
      result_type: 'administrative_area_level_2',
      key: 'AIzaSyBqhDOPHmVkPUdpM83voYgUBm3lSWzd6_U'
    }
}

export default function getCanton(lat, long){
  let latlong = lat + ", " + long

  config.params.latlng = latlong

  return new Promise((resolve, reject) =>{
    resolve(axios(config))
  })
}