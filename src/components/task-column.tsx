import { Button, Input } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { useAction } from '../hooks/use-actions';
import Task from './task';

interface TaskColumnProps {
    taskList: Task[];
    taskColumn: TaskColumn;
    onTaskClick: (task: Task) => void;
    onShowNewTaskModal: ()=> void;
    setCurrentColumnId: (id: string)=>void
}

const TaskColumn: React.FC<TaskColumnProps> = ({
    taskList,
    taskColumn,
    onTaskClick,
    onShowNewTaskModal,
    setCurrentColumnId,
}) => {
    const { deleteColumn, editColumnTitle } = useAction();

    const onEditColumnHandler = (title: string) => {
        if (!title || title === taskColumn.title) {
            return;
        }
        editColumnTitle(taskColumn.id, title);
    };
    console.log({taskList, taskColumn})
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
                        <Button style={{ marginTop:'0.5rem'}} onClick={()=>{
                            setCurrentColumnId(taskColumn.id)
                            onShowNewTaskModal()}}>add a task</Button>
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default TaskColumn;
