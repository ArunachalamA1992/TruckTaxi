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
  SET_TRIP_HISTORY,
  SET_TRIP_INCREMENT_COUNT,
  SET_TRIP_MAP_PREVIOUS_DISTANCE,
  SET_TRIP_MAP_START,
  SET_TRIP_MAP_STOP,
  SET_TRIP_MAP_VALUE,
  SET_TRIP_REMOVE_ITEM,
  SET_TRIP_TIMER,
  SET_WEEKLY_TRIP,
  SET_TRIPTIMER,
} from './TripActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  TripComplete: {
    completed: false,
    tripstatus: false,
  },
  TripAssign: false,
  TripStart: {
    TripStarted: false,
    AssignedId: 0,
    initialSpeedometer: 0,
    finalSpeedometer: 0,
    otpcode: 0,
    startImage: '',
    endImage: '',
    TripStoped: false,
    TripCompleted: false,
    startTripdate: '',
  },
  TripAmount: 0,
  TripDetails: {},
  TripNotification: {},
  TripHistory: false,
  MonthlyTrip: false,
  WeeklyTrip: false,
  Coordinates: {
    triplatitude: 0,
    triplongitude: 0,
  },
  TripTimer: {
    tripSeconds: 0,
    tripMinutes: 0,
    tripHours: 0,
  },
  TriptimerAction: null,
  distance: {
    totalDistance: 0,
    destinationReached: false,
  },
  previousDistance: {
    previous: 0,
    current: 0,
  },
  TripCountData: 0,
  lastResetDate: null,
};

const storeCartData = async TripState => {
  try {
    const jsonValue = JSON.stringify(TripState);
    await AsyncStorage.setItem('TripState', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const TripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIP_COMPLETED:
      storeCartData({
        ...state,
        TripComplete: {
          completed: action.payload.completed,
        },
      });
      return {
        ...state,
        TripComplete: {
          completed: action.payload.completed,
        },
      };
    case SET_TRIP_ASSIGN:
      return {
        ...state,
        TripAssign: action.payload,
      };
    case SET_TRIP_CURRENT_DATE:
      storeCartData({...state, startTripdate: action.payload});
      return {
        ...state,
        startTripdate: action.payload,
      };
    case SET_TRIP_MAP_VALUE:
      storeCartData({
        ...state,
        distance: {
          totalDistance: action.payload.totalDistance,
          destinationReached: action.payload.destinationReached,
        },
      });
      return {
        ...state,
        distance: {
          totalDistance: action.payload.totalDistance,
          destinationReached: action.payload.destinationReached,
        },
      };
    case SET_TRIP_MAP_PREVIOUS_DISTANCE:
      storeCartData({
        ...state,
        previousDistance: {
          previous: action.payload.previous,
          current: action.payload.current,
        },
      });
      return {
        ...state,
        previousDistance: {
          previous: action.payload.previous,
          current: action.payload.current,
        },
      };
    case SET_TRIP_AMOUNT:
      storeCartData({
        ...state,
        TripAmount: action.payload,
      });
      return {
        ...state,
        TripAmount: action.payload,
      };
    case SET_TRIP_MAP_START:
      storeCartData({
        ...state,
        TripStart: {
          TripStarted: action.payload.TripStarted,
          AssignedId: action.payload.AssignedId,
          initialSpeedometer: action.payload.initialSpeedometer,
          finalSpeedometer: action.payload.finalSpeedometer,
          otpcode: action.payload.otpcode,
          startImage: action.payload.startImage,
          endImage: action.payload.endImage,
          TripStoped: action.payload.TripStoped,
          TripCompleted: action.payload.TripCompleted,
          startTripdate: action.payload.startTripdate,
        },
      });
      return {
        ...state,
        TripStart: {
          TripStarted: action.payload.TripStarted,
          AssignedId: action.payload.AssignedId,
          initialSpeedometer: action.payload.initialSpeedometer,
          finalSpeedometer: action.payload.finalSpeedometer,
          otpcode: action.payload.otpcode,
          startImage: action.payload.startImage,
          endImage: action.payload.endImage,
          TripStoped: action.payload.TripStoped,
          TripCompleted: action.payload.TripCompleted,
          startTripdate: action.payload.startTripdate,
        },
      };
    case SET_TRIP_ASSIGN_DETAILS:
      var ecart = {...state.TripDetails};
      var item = action.payload.item;
      
      if (item?.assignId)
      {
        ecart[item.assignId] = item;
        storeCartData({...state, TripDetails: ecart});
      return {
        ...state,
        TripDetails: ecart,
      };
      }else{
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");
        console.log("ffffffffff");   
         storeCartData({...state, TripDetails: {}});
      return {
        ...state,
        TripDetails: {},
      };
      }
      
    case SET_TRIP_REMOVE_ITEM:
      var item = action.payload.item;
      var cart_item = Object.values(state.TripDetails).filter(
        single => single.assignId !== item.assignId,
      );
      cart_item.map(item => {
        delete [item];
      });
      storeCartData({
        ...state,
        TripDetails: cart_item,
      });
      return {
        ...state,
        TripDetails: cart_item,
      };
    case SET_TRIP_HISTORY:
      return {
        ...state,
        TripHistory: action.payload,
      };
    case SET_MONTHLY_TRIP:
      return {
        ...state,
        MonthlyTrip: action.payload,
      };
    case SET_WEEKLY_TRIP:
      return {
        ...state,
        WeeklyTrip: action.payload,
      };
    case SET_TRIP_COORDINATES:
      storeCartData({
        ...state,
        Coordinates: {
          triplatitude: action.payload.triplatitude,
          triplongitude: action.payload.triplongitude,
        },
      });
      return {
        ...state,
        Coordinates: {
          triplatitude: action.payload.triplatitude,
          triplongitude: action.payload.triplongitude,
        },
      };
    case SET_TRIP_TIMER:
      storeCartData({
        ...state,
        TripTimer: {
          tripSeconds: action.payload.tripSeconds,
          tripMinutes: action.payload.tripMinutes,
          tripHours: action.payload.tripHours,
        },
      });
      return {
        ...state,
        TripTimer: {
          tripSeconds: action.payload.tripSeconds,
          tripMinutes: action.payload.tripMinutes,
          tripHours: action.payload.tripHours,
        },
      };
    case SET_NOTIFICATION_TRIP:
      var ecart = {...state.TripNotification};
      var item = action.payload.item;
      ecart[item.assignId] = item;
      storeCartData({...state, TripNotification: ecart});
      return {
        ...state,
        TripNotification: ecart,
      };
    case SET_TRIP_INCREMENT_COUNT:
      const currentDate = new Date().toLocaleDateString();
      if (state.lastResetDate !== currentDate) {
        return {
          TripCountData: 0,
          lastResetDate: currentDate,
        };
      } else {
        return {
          TripCountData: state.TripCountData + 1,
          lastResetDate: currentDate,
        };
      }
    case SET_TRIPTIMER:
      storeCartData({
        ...state,
        TriptimerAction: action.payload,
      });
      return {
        ...state,
        TriptimerAction: action.payload,
      };
    case SET_ASYNC_CART:
      var {
        TripDetails,
        TripComplete,
        TripStart,
        TripHistory,
        MonthlyTrip,
        WeeklyTrip,
        TripNotification,
        TripTimer,
        startTripdate,
        distance,
        previousDistance,
        TripCountData,
        lastResetDate,
        Coordinates,
        TripAmount,
      } = action.payload;
      return {
        ...state,
        TripComplete,
        TripDetails,
        TripStart,
        TripHistory,
        MonthlyTrip,
        WeeklyTrip,
        TripNotification,
        TripTimer,
        startTripdate,
        distance,
        previousDistance,
        TripCountData,
        lastResetDate,
        Coordinates,
        TripAmount,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
