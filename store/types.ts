export type Task = {
  id: string;
  task_content: string;
  createdAt?: Date;
  updated_at?: Date;
  status: "progress" | "done";
};
