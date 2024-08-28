import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getCommentsByPost(id) {
    try {
      const { data } = await api.get(`/posts/${id}/comments`);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }