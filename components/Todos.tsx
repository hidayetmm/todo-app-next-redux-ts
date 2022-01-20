import { FC, useState } from "react";
import styled from "styled-components";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "../store/tasks";
import { Task } from "../store/types";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";
import { DeleteIcon } from "../public/icons";

const Text = styled.h5<{ isDone?: boolean }>`
  margin-bottom: 0px;
  flex: 1;
  text-decoration: ${({ isDone }) => (isDone ? "line-through" : "none")};
  color: ${({ isDone }) =>
    isDone ? "var(--secondary-color)" : "var(--font-color)"} !important;
`;

const Button = styled.button`
  width: 25px;
  height: 25px;
  padding: 3px;
  letter-spacing: -3px;
  :hover {
    border-color: #151515 !important;
  }
`;

const TasksMain = styled.div`
  padding-top: 25px;
`;

const TaskDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px;
  :hover {
    background-color: #727578;
    color: white;
    svg {
      stroke: white;
    }
    ${Text} {
      color: #fff !important;
    }
    ${Button} {
      color: #fff;
      border-color: #fff;
    }
  }
`;

const Div = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const CheckboxGroup = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const Icon = styled.svg`
  width: 32px;
  height: 32px;
  stroke: var(--font-color);
`;

const Todos: FC = () => {
  const { data, isLoading, isFetching, error } = useGetTasksQuery("");
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTaskStatus, { isLoading: isUpdating }] =
    useUpdateTaskStatusMutation();
  const dispatch = useDispatch();

  const [updatingTaskId, setupdatingTaskId] = useState("");
  const [deletingTaskId, setDeletingTaskId] = useState("");

  const updateTaskHandler = (id: Task["id"], status: Task["status"]) => {
    setupdatingTaskId(id);
    updateTaskStatus({ id, status }).then((res) => {
      dispatch(
        notificationActions.showNotification({
          text: "Task updated!",
          type: "success",
        })
      );
    });
  };

  const deleteTaskHandler = (id: Task["id"]) => {
    setDeletingTaskId(id);
    deleteTask(id).then((res) => {
      dispatch(
        notificationActions.showNotification({
          text: "Task deleted!",
          type: "success",
        })
      );
    });
  };

  return (
    <>
      <TasksMain>
        {data &&
          data.map((task) => (
            <TaskDiv key={task.id}>
              <CheckboxGroup className="form-group">
                <input
                  disabled={
                    (isUpdating || isFetching) && updatingTaskId === task.id
                  }
                  defaultChecked={task.status === "done" ? true : false}
                  value="checkedd"
                  type="checkbox"
                  id="check"
                  onChange={(e) =>
                    updateTaskHandler(
                      task.id,
                      e.target.checked ? "done" : "progress"
                    )
                  }
                />
              </CheckboxGroup>
              <Text isDone={task.status === "done"}>{task.task_content}</Text>
              <Div>
                <Text>{task.status}</Text>
                <Button
                  type="submit"
                  role="button"
                  name="submit"
                  id={task.id}
                  className="btn btn-default btn-ghost"
                  onClick={() => deleteTaskHandler(task.id)}
                >
                  {(isDeleting || isFetching) && deletingTaskId === task.id ? (
                    "..."
                  ) : (
                    <Icon>
                      <DeleteIcon />
                    </Icon>
                  )}
                </Button>
              </Div>
            </TaskDiv>
          ))}
      </TasksMain>
      {isLoading && "Loading"}
    </>
  );
};

export default Todos;
