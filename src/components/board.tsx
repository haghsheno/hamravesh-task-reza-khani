//@ts-nocheck
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useEffect, useState } from "react";
import TaskColumn from "./task-column";
import AddNewColumn from "./add-new-column";
import TaskModal from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAction } from "../hooks/use-actions";
import initialTasks from "../constant/tasks.json";
import initialTaskColumns from "../constant/taskColumns.json";
const Board = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isShowTaskModal, setIsShowTaskModal] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState("");

  const tasks = useTypedSelector(({ tasks: { data } }) => data);
  const { data: taskColumnsObj, order } = useTypedSelector(
    ({ taskColumns: { data, order } }) => {
      return { data, order };
    }
  );
  const { editColumnTasksOrder, editColumnTask, createColumn, createTask } =
    useAction();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = taskColumnsObj[source.droppableId];
    const finish = taskColumnsObj[destination.droppableId];

    if (startColumn === finish) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      editColumnTasksOrder(startColumn.id, newTaskIds);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    editColumnTask(tasks[draggableId].id, destination.droppableId);

    editColumnTasksOrder(newStart.id, newStart.taskIds);
    editColumnTasksOrder(newFinish.id, newFinish.taskIds);
  };

  useEffect(() => {
      if (!Object.keys(tasks).length && !Object.keys(taskColumnsObj).length) {
        Object.keys(initialTaskColumns).map((id) =>
          createColumn(initialTaskColumns[id].id, initialTaskColumns[id].title)
        );
        Object.keys(initialTasks).map((id) =>
          createTask(
            initialTasks[id].id,
            initialTasks[id].title,
            initialTasks[id].columnId,
            initialTasks[id].type,
            initialTasks[id].isImportant,
            initialTasks[id].description,
          )
        );
      }
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "auto",
            padding: "10px",
          }}
        >
          {order.map((taskColumnId) => {
            const column = taskColumnsObj[taskColumnId];
            return (
              <TaskColumn
                key={column.id}
                taskColumn={column}
                taskList={column.taskIds.map((taskId) => tasks[taskId])}
                onTaskClick={(task) => {
                  setCurrentTask(task);
                  setIsShowTaskModal(true);
                }}
                onShowNewTaskModal={() => setIsShowTaskModal(true)}
                setCurrentColumnId={setCurrentColumnId}
              />
            );
          })}
          <AddNewColumn />
        </div>
      </DragDropContext>
      <TaskModal
        isShowModal={isShowTaskModal}
        taskId={currentTask?.id}
        onCancel={() => {
          setCurrentTask(null);
          setIsShowTaskModal(false);
        }}
        key={currentTask?.id}
        currentColumnId={currentColumnId}
      />
    </>
  );
};

export default Board;
