import { Button, Input } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { useAction } from '../hooks/use-actions';
import AddNewTask from './add-new-task';
import Task from './task';

interface TaskColumnProps {
    taskList: Task[];
    taskColumn: TaskColumn;
    onTaskClick: (task: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
    taskList,
    taskColumn,
    onTaskClick,
}) => {
    const { deleteColumn, editColumnTitle } = useAction();

    const onEditColumnHandler = (title: string) => {
        if (!title || title === taskColumn.title) {
            return;
        }
        editColumnTitle(taskColumn.id, title);
    };

    return (
        <Droppable droppableId={taskColumn.id}>
            {(provided, snapshot) => (
                <div style={{ width: '200px', margin: '0 10px' }}>
                    <Input
                        onBlur={(e) => onEditColumnHandler(e.target.value)}
                        defaultValue={taskColumn.title}
                    />
                    <Button style={{ marginTop:'0.5rem'}}  danger onClick={() => deleteColumn(taskColumn)}>
                        Delete this list
                    </Button>
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: `${
                                snapshot.isDraggingOver ? 'skyblue' : ''
                            }`,
                        }}
                    >
                        {taskList.map((task, index) => (
                            <Task
                                onClick={onTaskClick}
                                task={task}
                                key={task.id}
                                index={index}
                            ></Task>
                        ))}
                        {provided.placeholder}
                        <AddNewTask columnId={taskColumn.id} />
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default TaskColumn;