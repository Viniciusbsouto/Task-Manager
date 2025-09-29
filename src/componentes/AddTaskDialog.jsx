import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import { useAddTask } from "../hooks/data/use-add-task";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const { mutate: addTask, isPending: isSaving } = useAddTask();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setFocus,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });
  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    addTask(
      {
        id: v4(),
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
        status: "to-do",
      },
      {
        onSuccess: () => {
          handleClose();
          reset({
            title: "",
            time: "morning",
            description: "",
          });
          toast.success("Tarefa adicionada com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao adicionar tarefa. Por favor, tente novamente.");
        },
      },
    );
  };

  const handleCancelClick = useCallback(() => {
    reset({
      title: "",
      time: "morning",
      description: "",
    });
    handleClose();
  }, [reset, handleClose]);

  // Auto-focus the title input when the dialog opens. Use a small timeout so
  // the input has time to mount when CSSTransition is used. Also support
  // closing the dialog with Escape.
  useEffect(() => {
    if (!isOpen) return undefined;

    const t = setTimeout(() => setFocus("title"), 50);

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCancelClick();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setFocus, handleCancelClick]);

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
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
            onMouseDown={(e) => {
              // if clicking the backdrop (outside dialog), close
              if (e.target === e.currentTarget) {
                handleCancelClick();
              }
            }}
          >
            {/* DIALOG */}
            <div
              className="rounded-xl bg-white p-5 text-center shadow"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSaving}
                  {...register("title", {
                    required: "O título é obrigatório.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode ser vazio.";
                      }
                      return true;
                    },
                  })}
                />

                <TimeSelect
                  disabled={isSaving}
                  {...register("time", { required: true })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSaving}
                  {...register("description", {
                    required: "A descrição é obrigatória.",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "A descrição não pode ser vazia.";
                      }
                      return true;
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    disabled={isSaving}
                    type="submit"
                  >
                    {isSaving && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
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

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTaskDialog;
