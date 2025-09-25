import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { tasksQueryKeys } from "../../keys/queries";

export const useGetTasks = () => {
  return useQuery({
    queryKey: tasksQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks");
      return tasks;
    },
  });
};
