interface Task {
    id: string;
    title: string;
    description?: string;
    type: 'easy'| 'hard';
    columnId: string;
    isImportant: boolean
}
