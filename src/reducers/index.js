import { combineReducers } from 'redux';
import { taskReducer } from './task';
import importanceFilter from './importanceFilter';

export const rootReducer = combineReducers({
    tasks: taskReducer,
    importanceFilter: importanceFilter,
});