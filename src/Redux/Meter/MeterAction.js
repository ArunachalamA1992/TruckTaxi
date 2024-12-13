import {
  SET_VEHICLE_END_METER,
  SET_VEHICLE_START_METER,
} from './MeterActionTypes';

export const setVehicleStartMeter = param => {
  return {
    type: SET_VEHICLE_START_METER,
    payload: param,
  };
};

export const setVehicleEndMeter = param => {
  return {
    type: SET_VEHICLE_END_METER,
    payload: param,
  };
};
