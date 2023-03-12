import { combineReducers } from 'redux';
import taskColumnsReducer from './taskColumnsReducer';
import tasksReducer from './tasksReducer';

const reducers = combineReducers({
    tasks: tasksReducer,
    taskColumns: taskColumnsReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
