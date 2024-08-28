import { useParams } from "react-router-dom";
import styles from "./PostDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/PostAPI";
import { Skeleton, Stack } from "@mui/material";
import { getCommentsByPost } from "../../api/CommentAPI";

export default function PostDetails() {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(id),
  });

  const { data: comments, isLoading: isCommentLoading } = useQuery({
    queryKey: ["comment"],
    queryFn: () => getCommentsByPost(id),
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className={styles.postDetail}>
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
          <div className={styles.post}>
            <h3>Post {id}</h3>
            <div className={styles.postDetail__info}>
              <div>
                <img
                  className={styles.postDetail__avatar}
                  src={post.avatar}
                  alt="img"
                />
              </div>
              <div>
                <p className={styles.postDetail__username}>{post.username}</p>
                <p className={styles.postDetail__location}>
                  {post.street}, {post.city}
                </p>
              </div>
            </div>
            <div className={styles.postDetail__info}>
              <h5 className={styles.postDetail__title}>{post.title}</h5>
              <p className={styles.postDetail__body}>{post.body}</p>
            </div>
          </div>
        )}

        {isCommentLoading ? (
          <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="rounded" width="100%" height={60} />
          </Stack>
        ) : (
          <div className={styles.comments}>
            {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                <h3>Comment {comment.id}</h3>
                <p className={styles.comment__email}>{comment.email}</p>
                <p className={styles.comment__name}>{comment.name}</p>
                <p className={styles.comment__body}>{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
