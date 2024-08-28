import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getTodos() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const { data: todos } = await api.get("/todos");

    const todoUser = todos.filter((todo) => {
      if (todo.userId === currentUser.id) {
        return {
          ...todo
        };
      }
    });
    return todoUser;
  } catch (error) {
    if (isAxiosError(error) && error) {
      throw new Error(error.response.data.error);
    }
  }
}
