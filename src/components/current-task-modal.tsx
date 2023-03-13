import { Button, Checkbox, Input, Modal, Radio } from "antd";
import { useState } from "react";
import { useAction } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

const { TextArea } = Input;

interface CurrentTaskModalProps {
  taskId: string;
  onCancel: () => void;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
  isShowModal: boolean;
}

const CurrentTaskModal: React.FC<CurrentTaskModalProps> = ({
  taskId,
  onCancel,
  setCurrentTask,
  isShowModal,
}) => {
  const task = useTypedSelector((state) => state.tasks.data[taskId]);
  const [title, setTitle] = useState(task.title || "");
  const [desc, setDesc] = useState(task.description || "");
  const { editDescriptionTask, editTitleTask, deleteTask } = useAction();
  const [taskType, setTaskType] = useState("");
  const [isTaskImportant, setIsTaskImportant] = useState("");
  const onEditHandler = () => {
    if (title !== task.title) {
      editTitleTask(task.id, title);
    }

    if (desc !== task.title) {
      editDescriptionTask(task.id, desc);
    }

    setCurrentTask(null);
  };

  const onDelete = () => {
    deleteTask(task.id, task.columnId);
    setCurrentTask(null);
  };

  return (
    <Modal
      title={<div>{task.title}</div>}
      open={isShowModal}
      onCancel={onCancel}
      onOk={onEditHandler}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <label htmlFor="title">title</label>
        <Input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength={20}
        />
        <label htmlFor="desc">description</label>
        <TextArea
          id="desc"
          value={desc}
          style={{ alignSelf: "flex-end", outline: "none" }}
          onChange={(e) => setDesc(e.target.value)}
        ></TextArea>
        <Radio.Group
          onChange={(e) => setTaskType(e.target.value)}
          value={taskType}
        >
          <Radio value="easy">Easy</Radio>
          <Radio value="hard">Hard</Radio>
        </Radio.Group>

        <Checkbox onChange={(e) => setIsTaskImportant(e.target.value)}>
          Important
        </Checkbox>
      </div>
      <Button
        style={{ margin: "15px 0 0 30px" }}
        onClick={onDelete}
        type="primary"
        danger
      >
        Delete this task
      </Button>
    </Modal>
  );
};

export default CurrentTaskModal;
