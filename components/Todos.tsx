import { FC } from "react";
import styled from "styled-components";
import { useGetTasksQuery } from "../store/tasks";

const Text = styled.h5`
  margin-bottom: 0px;
  flex: 1;
`;

const Button = styled.button`
  padding: 1px 6px;
`;

const TodosMain = styled.div`
  padding-top: 25px;
`;

const TodoDiv = styled.div`
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

  return (
    <>
      <TodosMain>
        {data &&
          data.map((task) => (
            <TodoDiv key={task.id}>
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
                  onClick={(e) => e.preventDefault()}
                >
                  X
                </Button>
              </Div>
            </TodoDiv>
          ))}
      </TodosMain>
      {isLoading && "Loading"}
    </>
  );
};

export default Todos;
