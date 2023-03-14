import produce from 'immer';
import { TaskActionType } from '../action-types';
import { Action } from '../actions';

interface TasksState {
    loading: boolean;
    error: string | null;
    data: {
        [id: string]: Task;
    };
    currentTask: string | null;
}

const initialState: TasksState = {
    loading: false,
    error: null,
    data: {},
    currentTask: null,
};

const reducer = produce((state: TasksState = initialState, action: Action) => {
    switch (action.type) {
        case TaskActionType.CREATE_TASK:
            const newTask: Task = {
                id: action.payload.id ,
                title: action.payload.title,
                columnId: action.payload.columnId,
                type: action.payload.type,
                description: action.payload.description,
                isImportant: action.payload.isImportant,
            };
            state.data[newTask.id] = newTask;
            return state;
        case TaskActionType.EDIT_TASK:
            state.data[action.payload.id] = action.payload;
            return state;
        case TaskActionType.EDIT_TASK_COLUMN:
            state.data[action.payload.id].columnId = action.payload.newColumnId;
            return state;
        case TaskActionType.DELETE_TASK:
            delete state.data[action.payload];
            return state;
        case TaskActionType.DELETE_TASKS:
            for (const id of action.payload.taskIds) {
                delete state.data[id];
            }
            return state;
        default:
            return state;
    }
}, initialState);


export default reducer;
