import { isAxiosError } from "axios";
import api from "../lib/axios";
import { avatarUrls } from "../utils/avatar";

export async function validateUser({username, email}) {
  try {
    //Get user from api to compare with user logged in
    const { data } = await api.get("/users");
    const foundUser = data.find((user) => {
      if (user.username === username && user.email === email) {
        return true;
      } else {
        return false;
      }
    });

    if (!foundUser) {
      throw new Error("User not found or incorrect data provided.");
    } else {
      const mockToken = "mock-token-" + foundUser.id;
      localStorage.setItem("user", JSON.stringify({
        ...foundUser,
        avatar: avatarUrls.find((img, index) => index+1 === foundUser.id)
      }));
      localStorage.setItem("authToken", mockToken);
      return foundUser;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data);
    }
  }
}
