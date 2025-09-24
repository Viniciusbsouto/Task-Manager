import { Link } from "react-router-dom";
import { toast } from "sonner";

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id);

  const handleDeleteClick = async () => {
    deleteTask(task.id, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso");
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa");
      },
    });
  };

  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary text-brand-primary opacity-60 line-through ";
      case "in-progress":
        return "bg-brand-process text-brand-process";
      case "to-do":
        return "bg-gray-800 text-gray-800";
      default:
        return "bg-gray-800 text-gray-800 ";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          htmlFor=""
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg opacity-70 ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && (
            <CheckIcon className="pointer-events-none h-4 w-4" />
          )}
          {task.status === "in-progress" && (
            <LoaderIcon className="pointer-events-none h-4 w-4 animate-spin text-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-dark-blue" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon className="h-5 w-5 opacity-100" />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;
