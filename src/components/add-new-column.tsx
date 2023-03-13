import { useAction } from "../hooks/use-actions";
import { useState } from "react";
import { Button, Input } from "antd";
const AddNewColumn: React.FC = () => {
  const [title, setTitle] = useState("");

  const { createColumn } = useAction();

  const createNewColumn = () => {
    if (title) {
      createColumn(title);
      setTitle("");
    }
  };

  return (
    <div style={{ minWidth: "200px", width: "200px" }}>
      <label htmlFor="column-id">Add another Column</label>
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
