import { TaskActionType, TaskColumnActionType } from '../action-types';

export interface CreateTaskAction {
    type: TaskActionType.CREATE_TASK;
    payload: {
        title: string;
        columnId: string;
        type: 'easy' | 'hard';
        desc?: string;
    };
}

export interface DeleteTaskAction {
    type: TaskActionType.DELETE_TASK;
    payload: string;
}

export interface DeleteTasksAction {
    type: TaskActionType.DELETE_TASKS;
    payload: {
        taskIds: string[];
    };
}

export interface EditTaskTitleAction {
    type: TaskActionType.EDIT_TASK_TITLE;
    payload: {
        id: string;
        title: string;
    };
}

export interface EditTaskDescriptionAction {
    type: TaskActionType.EDIT_TASK_DESC;
    payload: {
        id: string;
        description: string;
    };
}

export interface EditTaskColumnAction {
    type: TaskActionType.EDIT_TASK_COLUMN;
    payload: {
        id: string;
        newColumnId: string;
    };
}

export interface CreateColumnTaskAction {
    type: TaskColumnActionType.CREATE_COLUMN;
    payload: {
        title: string;
    };
}

export interface DeleteTaskColumnAction {
    type: TaskColumnActionType.DELETE_COLUMN;
    payload: string;
}

export interface EditTaskColumnTitleAction {
    type: TaskColumnActionType.EDIT_COLUMN_TITLE;
    payload: {
        columnId: string;
        title: string;
    };
}

export interface EditOrderTasksAction {
    type: TaskColumnActionType.EDIT_ORDER_TASKS;
    payload: {
        columnId: string;
        taskIds: string[];
    };
}

export interface AddNewTaskToColumn {
    type: TaskColumnActionType.ADD_NEW_TASK;
    payload: {
        columnId: string;
        taskId: string;
    };
}

export interface DeleteTaskInColumn {
    type: TaskColumnActionType.DELETE_TASK_IN_COLUMN;
    payload: {
        columnId: string;
        taskId: string;
    };
}

export type Action =
    | CreateTaskAction
    | DeleteTaskAction
    | EditTaskTitleAction
    | EditTaskDescriptionAction
    | EditTaskColumnAction
    | DeleteTasksAction
    | CreateColumnTaskAction
    | DeleteTaskColumnAction
    | EditTaskColumnTitleAction
    | EditOrderTasksAction
    | AddNewTaskToColumn
    | DeleteTaskInColumn;
