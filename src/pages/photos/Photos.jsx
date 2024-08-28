import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styles from "./Photos.module.css";
import { getPhotosAlbum } from "../../api/PhotoAPI";
import Photo from "../../components/photo/Photo";

export default function Photos() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["photos"],
    queryFn: () => getPhotosAlbum(id),
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h3 className={styles.title}>Photos Album {id}</h3>
      <section className={styles.photos}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((photo) => (
            <Photo key={photo.id} url={photo.url} title={photo.title} />
          ))
        )}
      </section>
    </>
  );
}
