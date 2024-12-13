import {api} from './api';

const api_name = 'api/';

export default {
  login: data => {
    let url = api_name + 'app/driverlogin';
    return api.postMethod(url, data);
  },
  logout: data => {
    let url = api_name + 'app/driverlogout';
    return api.postMethod(url, data);
  },
  punchIn: data => {
    let url = api_name + 'app/punchin';
    return api.postMethod(url, data);
  },
  punchout: data => {
    let url = api_name + 'app/punchout';
    return api.postMethod(url, data);
  },
  dailtStatus: data => {
    let url = api_name + 'app/dailystatus';
    return api.postMethod(url, data);
  },
  triphistory: data => {
    let url = api_name + 'app/mytrips?' + data;
    return api.getMethod(url, data);
  },
  bookingstatus: data => {
    let url = api_name + 'app/bookingstatus';
    return api.postMethod(url, data);
  },
  getstarttrip: data => {
    let url = api_name + 'app/getstarttrip';
    return api.postMethod(url, data);
  },
  completetrip: data => {
    let url = api_name + 'app/completetrip';
    return api.postMethod(url, data);
  },
  getbookingdeatails: data => {
    let url = api_name + 'app/getbookingdeatails?' + data;
    return api.getMethod(url, data);
  },
  weeklyreport: data => {
    let url = api_name + 'app/weeklyreport?' + data;
    return api.getMethod(url, data);
  },
  driverleave: data => {
    let url = api_name + 'app/driverleave';
    return api.postMethod(url, data);
  },
  rating: data => {
    let url = api_name + 'app/tripsupport';
    return api.postMethod(url, data);
  },
  permission: data => {
    let url = api_name + 'app/driverpermission';
    return api.postMethod(url, data);
  },
  resume: data => {
    let url = api_name + 'app/resumeduty';
    return api.postMethod(url, data);
  },
  farecalculation: data => {
    let url = api_name + 'app/farecalculation?' + data;
    return api.getMethod(url, data);
  },
  weekSummary: data => {
    let url = api_name + 'app/weeksummary?' + data;
    return api.getMethod(url, data);
  },
  notification: data => {
    let url = api_name + 'app/getnotifications?' + data;
    return api.getMethod(url, data);
  },
  readnotification: data => {
    let url = api_name + 'app/readnotification';
    return api.postMethod(url, data);
  },
  reasons: data => {
    let url = api_name + 'app/reasonsforleave?' + data;
    return api.getMethod(url, data);
  },
  paymentUpdate: data => {
    let url = api_name + 'app/paymentUpdate';
    return api.postMethod(url, data);
  },
  verifydriverOTP: data => {
    let url = api_name + 'app/verifydriverOTP';
    return api.postMethod(url, data);
  },
  driverappversion: data => {
    let url = api_name + 'app/driverappversion';
    return api.getMethod(url, data);
  },
  // Get Available Trips
  get_available_trip: (data )=> {
    let url = api_name + `app/getavailabletrips?cabid=${data?.cabid}&cityid=${data?.cityid}`;
    return api.getMethod(url);
  }

};
