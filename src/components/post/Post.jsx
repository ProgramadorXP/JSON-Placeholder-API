import { Link } from "react-router-dom";
import styles from "./Post.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost, updatePost } from "../../api/PostAPI";
import { toast } from "react-toastify";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function Post({ id, avatar, username, title, body }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const queryClient = useQueryClient();

  const initialValues = {
    id: id,
    title: title,
    body: body,
  };

  const { mutate: updateP } = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      console.log(data)
      toast.success("Data updated");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.log(error)
      toast.error("Failed to update post");
    } 
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleUpdate = (data) => {
    updateP(data)
  };

  const { mutate : deleteP } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const handleDelete = () => {
    deleteP(id);
  };

  return (
    <article className={styles.post}>
      <div className={styles.post__header}>
        <div className={styles.post__details}>
          <div className={styles.post__containerImg}>
            <img
              className={styles.post__userImg}
              src={avatar}
              alt="Avatar image"
            />
          </div>
          <div>
            <Link className={styles.post__username} to={"#"}>
              {username}
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.post__description}>
        <p className={styles.post__title}>{title}</p>
        <p className={styles.post__body}>{body}</p>
      </div>
      <div className={styles.post__linkGroup}>
        <Link to={`/post/${id}`} className={styles.post__view}>
          Comments
        </Link>
        <Link onClick={handleOpen} className={styles.post__update}>
          Update
        </Link>
        <Modal
          keepMounted
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <form className={styles.form} onSubmit={handleSubmit(handleUpdate)}>
            <h2>Post</h2>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    {...field}
                    label="Title"
                    variant="standard"
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ""}
                    fullWidth
                  />
                </Box>
              )}
            />
            <Controller
              name="body"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <TextField
                    {...field}
                    label="Content"
                    variant="standard"
                    error={!!errors.body}
                    helperText={errors.body ? errors.body.message : ""}
                    fullWidth
                  />
                </Box>
              )}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                sx={{
                  mt: 3,
                  background: "rgb(21, 116, 108)",
                  ":hover": { backgroundColor: "rgb(21, 116, 108, 0.8)" },
                }}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </form>
        </Modal>
        <Link onClick={handleDelete} className={styles.post__delete}>
          Delete
        </Link>
      </div>
    </article>
  );
}
