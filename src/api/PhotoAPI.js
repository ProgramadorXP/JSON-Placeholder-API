import api from "../lib/axios";
import { isAxiosError } from "axios";

export async function getPhotosAlbum(id) {
    try {
        const { data } = await api.get("/photos");
        const photosAlbum = data.filter((photo) => photo.albumId.toString() === id);
        return photosAlbum;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}