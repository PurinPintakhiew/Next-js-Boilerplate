import { combineReducers } from '@reduxjs/toolkit';

import categoriesReducer from './categoriesReducer';

const rootReducer = combineReducers({
  some: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
