import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/PostAPI";
import styles from "./Home.module.css";
import Post from "../../components/post/Post";

export default function Home() {

  //Queries to get all posts from api
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h3 className={styles.title}>Posts</h3>
      <section className={styles.posts}>
        {isLoading ? (
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rounded" width="100%" height={60} />
          </Stack>
        ) : (
          data.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              avatar={post.avatar}
              username={post.username}
              title={post.title}
              body={post.body}
            />
          ))
        )}
      </section>
    </>
  );
}
