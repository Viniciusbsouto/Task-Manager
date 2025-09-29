import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useDeleteAllTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-all-tasks"],
    mutationFn: async () => {
      // try to read tasks from cache first to avoid extra request
      const cached = queryClient.getQueryData(taskQueryKeys.getAll());
      const tasks = cached ?? (await api.get("/tasks")).data;

      // delete each task; json-server doesn't provide a bulk delete endpoint
      await Promise.all(tasks.map((task) => api.delete(`/tasks/${task.id}`)));

      return tasks.length;
    },
    onSuccess: () => {
      // clear tasks in cache
      queryClient.setQueryData(taskQueryKeys.getAll(), []);
    },
  });
};

export default useDeleteAllTasks;
