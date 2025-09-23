import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import Sidebar from "../componentes/Sidebar";
import TimeSelect from "../componentes/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);

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
              <span
                className="cursor-pointer text-brand-text-gray"
                onClick={() => navigate(-1)}
              >
                Minhas Tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/*Parte da Direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>
        {/* Dados Da Tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />
          </div>
          <div>
            <TimeSelect value={task?.time} />
          </div>
          <div>
            <Input
              label="Descrição"
              id="description"
              value={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button color="primary" size="large">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
