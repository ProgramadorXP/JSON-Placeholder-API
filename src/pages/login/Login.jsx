import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { AccountCircle, EmailRounded } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import styles from "./Login.module.css";
import { validateUser } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Login() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
  };

  const { mutate } = useMutation({
    mutationFn: validateUser,
    onSuccess: (data) => {
      if (data) {
        navigate("/");
        toast.success("Logged in successfully");
      } else{
        navigate("/login");
        toast.error("User not found");
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = (data) => mutate(data);

  useEffect(() => {
    if(token) {
      navigate("/");
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[A-Za-z]+$/i,
            message: "Invalid username",
          },
        }}
        render={({ field }) => (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "black", mr: 1, my: 0.5 }} />
            <TextField
              {...field}
              label="Username"
              variant="standard"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
              fullWidth
            />
          </Box>
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
        render={({ field }) => (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailRounded sx={{ color: "black", mr: 1, my: 0.5 }} />
            <TextField
              {...field}
              label="Email"
              variant="standard"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
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
          Log In
        </Button>
      </Box>
    </form>
  );
}
