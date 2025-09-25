import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { tasksQueryKeys } from "../../keys/queries";
import { taskMutationKeys } from "../../keys/mutations";

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: taskMutationKeys.add(),
    mutationFn: async (newTask) => {
      const { data: createdTask } = await api.post("/tasks", newTask);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(tasksQueryKeys.getAll(), (currentTasks = []) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
