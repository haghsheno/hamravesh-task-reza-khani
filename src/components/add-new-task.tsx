import { Button, Input } from 'antd';
import { useState } from 'react';
import { useAction } from '../hooks/use-actions';

interface AddNewTaskProps {
    columnId: string;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ columnId }) => {
    const [input, setInput] = useState<string>('');
    const { createNewTask } = useAction();

    const onCreateTaskHandler = () => {
        if (!input) {
            return;
        }

        createNewTask(input, columnId, 'easy', '');
        setInput('');
    };

    return (
        <div style={{marginTop:'2rem'}}>
            <Input
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder="enter a title for this task"
            />
            <Button style={{ marginTop:'0.5rem'}} onClick={onCreateTaskHandler}>add a task</Button>
        </div>
    );
};

export default AddNewTask;
