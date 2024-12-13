import Geolocation from 'react-native-geolocation-service';
import {locationPermission} from '../helperfn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const getlocation = async userData => {
  const {cabid} = userData;
  const locPermissionDenied = await locationPermission();
  const SendDriverlocation =async (url, items)=>{
try {
    console.log('====================================');
    console.log("userDataEE", items);
    console.log('====================================');
    const formData = new FormData();
    formData.append('cabid', cabid);
    formData.append('piclat', items.piclat);
    formData.append('piclon', items.piclon);
    formData.append('present_location', items.present_location);
    const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response=>00000', response.data);
} catch (error) {
    if (error.response) {
        console.log("rrr"); 
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else {
        console.error('Error:', error.message);
      }
}
  }
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = 'AIzaSyAOl88J2TyN1uxEENd8sjtYNq8Xa2nW4rk'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const {results} = response.data;
      if (results.length > 0) {
        var value = {
            piclat:latitude,
            piclon:longitude,
            present_location:results[0].formatted_address
        }
        console.log(value,'value22');
        if(cabid)
        {
          SendDriverlocation('https://trucktaxi.co.in/api/app/getdriverlocation', value);
        }
        
      } else {
        console.log('Address not found', 'Address not found');
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (locPermissionDenied === 'granted') {
    Geolocation.getCurrentPosition(
        async position => {
       await getAddressFromCoordinates(
          position?.coords?.latitude,
          position?.coords?.longitude,
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }
};
