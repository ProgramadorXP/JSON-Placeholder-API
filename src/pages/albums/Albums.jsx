import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../../api/AlbumAPI";
import styles from "./Albums.module.css";
import Album from "../../components/album/Album";
import { Box, CircularProgress } from "@mui/material";

export default function Albums() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h3 className={styles.title}>Albums</h3>
      <section className={styles.albums}>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
        ) : (
          <ul className={styles.albums__menu}>
            {data.map((album) => (
              <Album key={album.id} id={album.id} title={album.title} username={album.username} avatar={album.avatar} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
