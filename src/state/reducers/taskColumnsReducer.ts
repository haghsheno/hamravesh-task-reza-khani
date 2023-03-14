import produce from 'immer';
import { TaskColumnActionType } from '../action-types';
import { Action } from '../actions';

interface TaskColumnsState {
    loading: boolean;
    error: string | null;
    data: {
        [id: string]: TaskColumn;
    };
    order: string[];
}

const initialState: TaskColumnsState = {
    loading: false,
    error: null,
    data: {},
    order: [],
};

const reducer = produce(
    (state: TaskColumnsState = initialState, action: Action) => {
        switch (action.type) {
            case TaskColumnActionType.CREATE_COLUMN:
                const newColumn: TaskColumn = {
                    id: action.payload.id,
                    title: action.payload.title,
                    taskIds: [],
                };
                state.data[newColumn.id] = newColumn;
                state.order.push(newColumn.id);
                return state;
            case TaskColumnActionType.EDIT_COLUMN_TITLE:
                const { title, columnId } = action.payload;
                state.data[columnId].title = title;
                return state;
            case TaskColumnActionType.DELETE_COLUMN:
                delete state.data[action.payload];
                state.order = state.order.filter((id) => id !== action.payload);
                return state;
            case TaskColumnActionType.ADD_NEW_TASK:
                state.data[action.payload.columnId].taskIds.push(
                    action.payload.taskId
                );
                return state;
            case TaskColumnActionType.EDIT_ORDER_TASKS:
                const { columnId: id, taskIds } = action.payload;
                state.data[id].taskIds = taskIds;
                return state;
            case TaskColumnActionType.DELETE_TASK_IN_COLUMN:
                const { columnId: currentColumnId, taskId } = action.payload;
                state.data[currentColumnId].taskIds = state.data[
                    currentColumnId
                ].taskIds.filter((id) => id !== taskId);
                return state;
            default:
                return state;
        }
    },
    initialState
);


export default reducer;
