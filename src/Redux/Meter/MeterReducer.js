import {SET_VEHICLE_END_METER, SET_VEHICLE_START_METER} from './MeterActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  startVehicleMeter: {
    startMeterImage: '',
    startMeterVisible: false,
  },
  endVehicleMeter: {
    endMeterImage: '',
    endMeterVisible: false,
  },
};

export const MeterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VEHICLE_START_METER:
      return {
        ...state,
        startVehicleMeter: action.payload,
      };
    case SET_VEHICLE_END_METER:
      return {
        ...state,
        endVehicleMeter: action.payload,
      };
    default:
      return state;
  }
};
