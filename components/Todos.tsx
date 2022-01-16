import { FC } from "react";
import styled from "styled-components";
import { useDeleteTaskMutation, useGetTasksQuery } from "../store/tasks";
import { Task } from "../store/types";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";

const Text = styled.h5`
  margin-bottom: 0px;
  flex: 1;
`;

const Button = styled.button`
  padding: 1px 6px;
`;

const TasksMain = styled.div`
  padding-top: 25px;
`;

const TaskDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px;
  :hover {
    background-color: #727578;
    color: white;
    ${Text} {
      color: #fff;
    }
    ${Button} {
      color: #fff;
    }
  }
`;

const Div = styled.div`
  display: flex;
  gap: 20px;
`;

const CheckboxGroup = styled.div`
  margin-bottom: 0px;
`;

const Todos: FC = () => {
  const { data, isLoading, isFetching, error } = useGetTasksQuery("");
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const dispatch = useDispatch();

  const deleteTaskHandler = (id: Task["id"]) => {
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
                  X
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
