import { FC } from "react";
import styled from "styled-components";
import { useGetTasksQuery } from "../store/tasks";

const Wrapper = styled.div``;

const Text = styled.h5`
  margin-bottom: 0px;
`;

const Button = styled.button`
  padding: 1px 6px;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
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

const Todos: FC = () => {
  const { data, isLoading, isFetching, error } = useGetTasksQuery("");

  return (
    <ul>
      {data &&
        data.map((task) => (
          <Li key={task.id}>
            <Text>{task.task_content}</Text>
            <Text>{task.status}</Text>
            <Button
              type="submit"
              role="button"
              name="submit"
              id={task.id}
              className="btn btn-default btn-ghost"
              onClick={(e) => e.preventDefault()}
            >
              X
            </Button>
          </Li>
        ))}
      {isLoading && "Loading"}
    </ul>
  );
};

export default Todos;
