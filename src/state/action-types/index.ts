export enum TaskActionType {
    CREATE_TASK = 'create_task',
    DELETE_TASK = 'delete_task',
    EDIT_TASK = 'edit_task',
    EDIT_TASK_COLUMN = 'edit_task_column',
    DELETE_TASKS = 'delete_tasks',
}

export enum TaskColumnActionType {
    CREATE_COLUMN = 'create_column',
    EDIT_COLUMN_TITLE = 'edit_column_title',
    DELETE_COLUMN = 'delete_column',
    EDIT_ORDER_TASKS = 'edir_order_tasks',
    ADD_NEW_TASK = 'add_new_task',
    DELETE_TASK_IN_COLUMN = 'delete_task_in_column',
}
