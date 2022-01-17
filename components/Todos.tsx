import { FC, useState } from "react";
import styled from "styled-components";
import { useDeleteTaskMutation, useGetTasksQuery } from "../store/tasks";
import { Task } from "../store/types";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";
import { DeleteIcon } from "../public/icons";

const Text = styled.h5`
  margin-bottom: 0px;
  flex: 1;
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
      color: #fff;
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
  stroke: #151515;
`;

const Todos: FC = () => {
  const { data, isLoading, isFetching, error } = useGetTasksQuery("");
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const dispatch = useDispatch();

  const [deletingId, setDeletingId] = useState("");

  const deleteTaskHandler = (id: Task["id"]) => {
    setDeletingId(id);
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
                <input type="checkbox" id="check" />
              </CheckboxGroup>
              <Text>{task.task_content}</Text>
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
                  {(isDeleting || isFetching) && deletingId === task.id ? (
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
