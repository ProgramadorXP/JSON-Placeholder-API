import { isAxiosError } from "axios";
import api from "../lib/axios";
import { avatarUrls } from "../utils/avatar";

export async function getAlbums() {
    try {
        const {data : users} = await api.get("/users");
        const {data : albums} = await api.get("/albums");
        
        const albumsWithUsers = albums.map((album) => {
            const user = users.find((user) => user.id === album.userId);
            return {
              ...album,
              username: user ? user.username : "Unknown",
              avatar: avatarUrls.find((img, index) => index+1 === user.id)
            };
          });
        return albumsWithUsers;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}