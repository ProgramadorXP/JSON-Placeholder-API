import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api/TodoAPI";
import styles from "./Todos.module.css";
import { Box, CircularProgress } from "@mui/material";

export default function Todos() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h3 className={styles.title}>My todos</h3>
      <section className={styles.todos}>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <ul className={styles.menu}>
            {data.map((todo) => (
              <li className={styles.menu__item} key={todo.id}>
                <span className={todo.completed ? styles.completed : ""}>
                  {todo.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
