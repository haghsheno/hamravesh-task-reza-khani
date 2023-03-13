import { Button, Checkbox, Form, Input, Modal, Radio } from "antd";
import { useAction } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

const { TextArea } = Input;

interface TaskModalProps {
  taskId: string;
  onCancel: () => void;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
  isShowModal: boolean;
  currentColumnId?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  taskId,
  onCancel,
  setCurrentTask,
  isShowModal,
  currentColumnId,
}) => {
  const selecteTask = useTypedSelector((state) => state.tasks.data[taskId]);

  const { deleteTask, updateTask, createTask } = useAction();

  const initialValues = {
    title: selecteTask ? selecteTask.title : "",
    description: selecteTask ? selecteTask?.description : "",
    taskType: selecteTask ? selecteTask.type : "easy",
    isTaskImportant: selecteTask ? selecteTask.isImportant : false,
  };

  const [form] = Form.useForm();

  const handleSubmit = () => {
    if (selecteTask) {
      updateTask({ ...selecteTask, ...form.getFieldsValue() });
    } else {
      if (currentColumnId) {
        createTask(
          form.getFieldsValue().title,
          currentColumnId,
          form.getFieldsValue().type,
          form.getFieldsValue().description,
          form.getFieldsValue().isImportant
        );
      }
    }
    onCancel();
    console.log(form.getFieldsValue().description);
    console.log(form.getFieldValue("description"));
    console.log(form.getFieldsValue());
    form.resetFields();
  };

  const onDelete = () => {
    deleteTask(selecteTask.id, selecteTask.columnId);
    onCancel();
  };

  return (
    <Modal
      open={isShowModal}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      closeIcon={<></>}
      footer={<></>}
    >
      <Form
        form={form}
        onSubmitCapture={handleSubmit}
        initialValues={{
          title: initialValues.title,
          description: initialValues.description,
          type: initialValues.taskType,
          isImportant: initialValues.isTaskImportant,
        }}
      >
        <Form.Item name="title" label="title">
          <Input id="title" maxLength={20} />
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input.TextArea
            id="description"
            disabled={selecteTask ? selecteTask?.type !== "hard" : false}
            style={{ alignSelf: "flex-end", outline: "none" }}
          ></Input.TextArea>
        </Form.Item>
        <p>If you want add description this task should be hard</p>

        <Form.Item name="type" label="task type">
          <Radio.Group disabled={selecteTask ? true : false}>
            <Radio value="easy">Easy</Radio>
            <Radio value="hard">Hard</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="isImportant"
          label="is Task Important"
          valuePropName="checked"
        >
          <Checkbox> </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        {selecteTask && (
          <Button
            style={{ margin: "15px 0 0 30px" }}
            onClick={onDelete}
            type="primary"
            danger
          >
            Delete this task
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default TaskModal;
