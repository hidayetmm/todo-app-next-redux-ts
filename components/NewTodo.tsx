import { FC, FormEvent, FormEventHandler, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { notificationActions } from "../store/notification-slice";
import { useAddTaskMutation } from "../store/tasks";
import { Task } from "../store/types";

const Form = styled.form`
  display: flex;
  gap: 20px;
`;

const FormItem = styled.div`
  margin-bottom: 0px;
`;

const Input = styled.input``;

const Button = styled.button`
  :focus {
    /* background-color: #151515 !important; */
  }
`;
const Select = styled.select`
  height: 100%;
`;

const NewTodo: FC = () => {
  const [addTask, { isLoading }] = useAddTaskMutation();

  const dispatch = useDispatch();

  const addTaskHandler = (event: any) => {
    event.preventDefault();
    const target = event.target;
    const task: Task = {
      task_content: target.task_content.value,
      status: target.status.value,
    };
    console.log(task);

    addTask(task).then((res) => {
      dispatch(
        notificationActions.showNotification({
          text: "Task added!",
          type: "success",
        })
      );
    });
  };

  return (
    <Form onSubmit={addTaskHandler}>
      <FormItem className="form-group">
        <Input
          required
          minLength={5}
          id="task_content"
          name="task_content"
          type="text"
          placeholder="Add a task"
        />
      </FormItem>
      <FormItem className="form-group">
        <Select id="select" name="status" title="status">
          <option>progress</option>
          <option>done</option>
        </Select>
      </FormItem>
      <Button
        type="submit"
        role="button"
        name="submit"
        id="submit-btn"
        className="btn btn-default"
      >
        {isLoading ? "..." : "Add"}
      </Button>
    </Form>
  );
};

export default NewTodo;
