import { useAction } from "../hooks/use-actions";
import { useState } from "react";
import { Button, Input, Typography } from "antd";
import { randomId } from "../utils/generate-id";
const AddNewColumn: React.FC = () => {
  const [title, setTitle] = useState("");

  const { createColumn } = useAction();

  const createNewColumn = () => {
    if (title) {
      createColumn(randomId(), title );
      setTitle("");
    }
  };

  return (
    <div style={{ minWidth: "200px", width: "200px" }}>
      <Typography.Text  >Add another Column</Typography.Text>
      <Input
        id="column-id"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button style={{ marginTop:'0.5rem'}} onClick={createNewColumn}>Add Column</Button>
    </div>
  );
};

export default AddNewColumn;
