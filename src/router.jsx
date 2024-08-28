import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/appLayout/AppLayout";
import Home from "./pages/home/Home";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import Login from "./pages/login/Login";
import Albums from "./pages/albums/Albums";
import Photos from "./pages/photos/Photos";
import Todos from "./pages/todos/Todos";
import Profile from "./pages/profile/Profile";
import PostDetails from "./pages/postDetails/PostDetails";

export default function Router() {

  return (
    <BrowserRouter>
        <Routes>
            {/*Layout */}
            <Route element={<AppLayout />}>
                <Route path="/" element={ <Home /> } index/>
                <Route path="/albums" element={ <Albums /> } />
                <Route path="/photos/:id" element={ <Photos /> } />
                <Route path="/todos" element={ <Todos /> } />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/post/:id" element={ <PostDetails /> } />
            </Route>
            {/*Layout */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
