import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

interface TaskProps {
    task: Task;
    onClick: (task: Task) => void;
    index: number;
}
const Task: React.FC<TaskProps> = ({ task, onClick, index }) => {
    return (
        <div style={{ marginTop: '10px' }}>
            <Draggable draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                    <Card
                        onClick={() => onClick(task)}
                        title={task.title}
                        
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {task.description}
                    </Card>
                )}
            </Draggable>
        </div>
    );
};

export default Task;
