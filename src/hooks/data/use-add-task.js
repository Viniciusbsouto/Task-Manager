import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
      const createdTask = await response.json();
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(["tasks"], (currentTasks = []) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
