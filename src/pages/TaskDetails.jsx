import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import Sidebar from "../componentes/Sidebar";
import TimeSelect from "../componentes/TimeSelect";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useGetTask } from "../hooks/data/use-get-task";
import { useUpdateTask } from "../hooks/data/use-update-task";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask(taskId);
  const { mutate: deleteTask } = useDeleteTask(taskId);
  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa salva com sucesso!");
        navigate(-1);
      },
      onError: () => {
        toast.error("Ocorreu um erro ao salvar a tarefa.");
      },
    });
  };

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso!");
        navigate(-1);
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa."),
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* barra do topo */}
        <div className="flex w-full justify-between">
          {/* parte da esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          {/* parte da direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio.";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
                disabled={isUpdating}
              />
            </div>

            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horário é obrigatório.",
                })}
                disabled={isUpdating}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode ser vazia.";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
                disabled={isUpdating}
              />
            </div>
          </div>
          {/* botão de salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              disabled={isUpdating}
              type="submit"
            >
              {isUpdating && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
