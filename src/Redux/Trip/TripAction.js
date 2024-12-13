import {
  SET_ASYNC_CART,
  SET_MONTHLY_TRIP,
  SET_NOTIFICATION_TRIP,
  SET_TRIP_AMOUNT,
  SET_TRIP_ASSIGN,
  SET_TRIP_ASSIGN_DETAILS,
  SET_TRIP_COMPLETED,
  SET_TRIP_COORDINATES,
  SET_TRIP_CURRENT_DATE,
  SET_TRIP_DETAILS,
  SET_TRIP_HISTORY,
  SET_TRIP_INCREMENT_COUNT,
  SET_TRIP_MAP_PREVIOUS_DISTANCE,
  SET_TRIP_MAP_START,
  SET_TRIP_MAP_STOP,
  SET_TRIP_MAP_VALUE,
  SET_TRIP_REMOVE_ITEM,
  SET_TRIP_TIMER,
  SET_TRIPTIMER,
  SET_WEEKLY_TRIP,
} from './TripActionTypes';
export const setTripCompleteData = param => {
  return {
    type: SET_TRIP_COMPLETED,
    payload: param,
  };
};
export const setTripdetails = param => {
  return {
    type: SET_TRIP_DETAILS,
    payload: param,
  };
};
export const setTripAssignModalVisible = param => {
  return {
    type: SET_TRIP_ASSIGN,
    payload: param,
  };
};
export const setTripAssignDetails = param => {
  return {
    type: SET_TRIP_ASSIGN_DETAILS,
    payload: param,
  };
};
export const setTripRemoveDetails = param => {
  return {
    type: SET_TRIP_REMOVE_ITEM,
    payload: param,
  };
};
export const setTripMapStart = param => {
  return {
    type: SET_TRIP_MAP_START,
    payload: param,
  };
};
export const setAsyncTrip = param => {
  return {
    type: SET_ASYNC_CART,
    payload: param,
  };
};
export const setTripHistory = param => {
  return {
    type: SET_TRIP_HISTORY,
    payload: param,
  };
};
export const setMonthlyTrip = param => {
  return {
    type: SET_MONTHLY_TRIP,
    payload: param,
  };
};
export const setWeeklyTrip = param => {
  return {
    type: SET_WEEKLY_TRIP,
    payload: param,
  };
};
export const setNotificationTrip = param => {
  return {
    type: SET_NOTIFICATION_TRIP,
    payload: param,
  };
};
export const setTripTimer = param => {
  return {
    type: SET_TRIP_TIMER,
    payload: param,
  };
};
export const setTripCurrentDate = param => {
  return {
    type: SET_TRIP_CURRENT_DATE,
    payload: param,
  };
};
export const setMapTotalDistance = param => {
  return {
    type: SET_TRIP_MAP_VALUE,
    payload: param,
  };
};
export const setTotalTripAmount = param => {
  return {
    type: SET_TRIP_AMOUNT,
    payload: param,
  };
};
export const setPreviousDistance = param => {
  return {
    type: SET_TRIP_MAP_PREVIOUS_DISTANCE,
    payload: param,
  };
};
export const setTripIncrementCount = param => {
  return {
    type: SET_TRIP_INCREMENT_COUNT,
    payload: param,
  };
};
export const setTripCoordinates = param => {
  return {
    type: SET_TRIP_COORDINATES,
    payload: param,
  };
};
export const settriptimerAction = param => {
  return {
    type: SET_TRIPTIMER,
    payload: param,
  };
};
