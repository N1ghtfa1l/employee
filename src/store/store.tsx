import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../slices/employeeSlices'

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;