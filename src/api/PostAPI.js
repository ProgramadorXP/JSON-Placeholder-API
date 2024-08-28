import { isAxiosError } from "axios";
import api from "../lib/axios";
import { avatarUrls } from "../utils/avatar";

export async function getPosts() {
  try {
    const postsResponse = await api.get("/posts");
    const posts = postsResponse.data;

    const usersResponse = await api.get("/users");
    const users = usersResponse.data;

    const postsWithUsernames = posts.map((post) => {
      const user = users.find((user) => user.id === post.userId);
      return {
        ...post,
        username: user ? user.username : "Unknown",
        avatar: avatarUrls.find((img, index) => index + 1 === user.id),
      };
    });
    return postsWithUsernames;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}

export async function getPost(id) {
  try {
    const { data: post } = await api.get(`/posts/${id}`);

    const { data: users } = await api.get("/users");

    const postWithUser = users
      .filter((user) => post.userId === user.id)
      .map((user) => ({
        ...post,
        avatar: avatarUrls.find((img, index) => index + 1 === user.id),
        username: user.username,
        street: user.address.street,
        city: user.address.city,
      }))[0];

    return postWithUser;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePost(formData) {
  try {
    const {data} = await api.patch(`/posts/${formData.id}`, formData);
    //console.log(response.data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deletePost(id) {
  try {
    const {data} = await api.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
