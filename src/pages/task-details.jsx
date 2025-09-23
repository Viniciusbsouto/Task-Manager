import { useEffect, useState } from "react";
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

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    time: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
      setEditedTask(data);
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (field, value) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdited = async () => {
    const newErrors = [];

    if (!editedTask.title) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório!",
      });
    }

    if (!editedTask.description) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória!",
      });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    });

    if (!response.ok) {
      setIsLoading(false);
      throw new Error("Erro ao atualizar tarefa");
    }

    navigate(-1);
    const updatedTask = await response.json();

    setIsLoading(false);

    setTask(updatedTask);
    setEditedTask(updatedTask);
    toast.success("Tarefa Atualizada com sucesso");
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setIsLoading(false);

      throw new Error("Erro ao deletar a tarefa");
    }

    setIsLoading(false);

    navigate(-1);
    toast.success("Tarefa apagada com sucesso");
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description",
  );
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
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar Tarefa
          </Button>
        </div>
        {/* Dados Da Tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              value={editedTask?.title}
              onChange={(e) => handleChange("title", e.target.value)}
              errorMessage={titleError?.message}
            />
          </div>
          <div>
            <TimeSelect
              value={editedTask?.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              value={editedTask?.description}
              onChange={(e) => handleChange("description", e.target.value)}
              errorMessage={descriptionError?.message}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            color="primary"
            size="large"
            onClick={handleSaveEdited}
            disabled={isLoading}
          >
            {isLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
