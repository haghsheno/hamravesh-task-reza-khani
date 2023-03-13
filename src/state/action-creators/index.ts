import { Dispatch } from "redux";
import { TaskColumnActionType, TaskActionType } from "../action-types";
import {
  CreateColumnTaskAction,
  DeleteTaskColumnAction,
  Action,
  EditTaskColumnTitleAction,
  EditOrderTasksAction,
  EditTaskColumnAction,
  DeleteTasksAction,
  EditTaskAction,
} from "../actions";
import { RootState } from "../reducers";

export const createColumn = (
  title: string,
  id?: string
): CreateColumnTaskAction => {
  return {
    type: TaskColumnActionType.CREATE_COLUMN,
    payload: {
      id,
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

export const createTask = (
  title: string,
  columnId: string,
  type: "easy" | "hard",
  isImportant: boolean,
  description?: string
) => {
  return (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch({
      type: TaskActionType.CREATE_TASK,
      payload: {
        title,
        columnId,
        type,
        description,
        isImportant,
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

export const updateTask = (task: Task): EditTaskAction => {
  return {
    type: TaskActionType.EDIT_TASK,
    payload: task,
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
