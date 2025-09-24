import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso");
        navigate(-1);
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa");
      },
    });
  };

  const handleDelete = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso");
        navigate(-1);
      },
      onError: () => {
        toast.error("Erro ao deletar a tarefa");
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          {/* Parte da Esquerda */}
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-2 flex size-9 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1">
              <a
                className="cursor-pointer text-brand-text-gray"
                onClick={() => navigate(-1)}
              >
                Minhas Tarefas
              </a>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/*Parte da Direita */}
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDelete}
            disabled={updateTaskIsLoading || deleteTaskIsLoading}
          >
            {updateTaskIsLoading || deleteTaskIsLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar Tarefa
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* Dados Da Tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            {/* Input do título */}
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título é obrigatório!";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            {/* Input do horário */}
            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horário é obrigatório!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O horário é obrigatório!";
                    }
                    return true;
                  },
                })}
              />
            </div>
            {/* Input da descrição */}
            <div>
              <Input
                label="Descrição"
                id="description"
                {...register("description", {
                  required: "A descrição é obrigatória!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição é obrigatória!";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          {/* Botão de Salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
