import { Dispatch } from 'redux';
import { TaskColumnActionType, TaskActionType } from '../action-types';
import {
    CreateColumnTaskAction,
    DeleteTaskColumnAction,
    Action,
    EditTaskTitleAction,
    EditTaskDescriptionAction,
    EditTaskColumnTitleAction,
    EditOrderTasksAction,
    EditTaskColumnAction,
    DeleteTasksAction,
} from '../actions';
import { RootState } from '../reducers';

export const createColumn = (title: string): CreateColumnTaskAction => {
    return {
        type: TaskColumnActionType.CREATE_COLUMN,
        payload: {
            title,
        },
    };
};

export const editColumnTitle = (
    columnId: string,
    title: string
): EditTaskColumnTitleAction => {
    return {
        type: TaskColumnActionType.EDIT_COLUMN_TITLE,
        payload: { columnId, title },
    };
};

export const editColumnTasksOrder = (
    columnId: string,
    taskIds: string[]
): EditOrderTasksAction => {
    return {
        type: TaskColumnActionType.EDIT_ORDER_TASKS,
        payload: { columnId, taskIds },
    };
};

export const deleteColumn = (column: TaskColumn) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: TaskActionType.DELETE_TASKS,
            payload: { taskIds: column.taskIds },
        });
        dispatch({
            type: TaskColumnActionType.DELETE_COLUMN,
            payload: column.id,
        });
    };
};

export const createNewTask = (title: string, columnId: string) => {
    return (dispatch: Dispatch<Action>, getState: () => RootState) => {
        dispatch({
            type: TaskActionType.CREATE_TASK,
            payload: {
                title,
                columnId,
            },
        });

        const {
            tasks: { data },
        } = getState();

        // find last task we added
        // @ts-ignore
        const { id } = data[Object.keys(data).pop()];
        dispatch({
            type: TaskColumnActionType.ADD_NEW_TASK,
            payload: {
                columnId,
                taskId: id,
            },
        });
    };
};

export const editTitleTask = (
    taskId: string,
    title: string
): EditTaskTitleAction => {
    return {
        type: TaskActionType.EDIT_TASK_TITLE,
        payload: { id: taskId, title },
    };
};

export const editDescriptionTask = (
    taskId: string,
    desc: string
): EditTaskDescriptionAction => {
    return {
        type: TaskActionType.EDIT_TASK_DESC,
        payload: { id: taskId, description: desc },
    };
};

export const editColumnTask = (
    taskId: string,
    newColumnId: string
): EditTaskColumnAction => {
    return {
        type: TaskActionType.EDIT_TASK_COLUMN,
        payload: { id: taskId, newColumnId },
    };
};

export const deleteTask = (taskId: string, columnId: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: TaskColumnActionType.DELETE_TASK_IN_COLUMN,
            payload: {
                columnId,
                taskId,
            },
        });

        dispatch({
            type: TaskActionType.DELETE_TASK,
            payload: taskId,
        });
    };
};

export const deleteTasks = (taskIds: string[]): DeleteTasksAction => {
    return {
        type: TaskActionType.DELETE_TASKS,
        payload: { taskIds },
    };
};
