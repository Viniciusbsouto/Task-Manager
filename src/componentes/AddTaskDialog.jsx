import "./AddTaskDialog.css";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (newTask) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa.");
      }
      return response.json();
    },
  });
  // Uncontrolled inputs for title and description
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setFocus,
  } = useForm();
  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "to-do",
    };

    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], (currentTasks = []) => {
          return [...currentTasks, task];
        });
        toast.success("Tarefa adicionada com sucesso!");
        handleClose();
        reset({ title: "", description: "", time: "morning" });
      },
      onError: () => {
        toast.error("Erro ao adicionar tarefa.");
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      // ensure time resets; uncontrolled inputs will be reset by setting defaultValue
      reset(
        { title: "", description: "", time: "morning" },
        { keepErrors: false },
      );
    } else {
      // When opened, focus the title input
      setTimeout(() => {
        setFocus("title");
      }, 0);
    }
  }, [isOpen, reset, setFocus]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            {/* DIALOG */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    label="Título"
                    id="title"
                    placeholder="Insira o Título da Tarefa"
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
                    disabled={isSubmitting}
                  />

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
                    disabled={isSubmitting}
                  />
                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a Tarefa"
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
                    disabled={isSubmitting}
                  />

                  <div className="flex gap-3">
                    <Button
                      size="large"
                      className="w-full"
                      color="secondary"
                      onClick={handleClose}
                      type="button"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      size="large"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <LoaderIcon className="animate-spin" />}
                      Salvar
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
