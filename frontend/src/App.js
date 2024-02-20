import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx"
import Login from "./pages/forms/Login.jsx"
import Register from "./pages/forms/Register.jsx"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreatePost from "./pages/create-post/CreatePost.jsx"
import PostsPage from "./pages/postPage/PostsPage.jsx"
import Footer from "./components/footer/Footer.jsx";
import PostDetails from "./pages/post-details/PostDetails.jsx";
import {ToastContainer} from "react-toastify"
import Category from "./pages/category/category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UsersTable from "./pages/admin/UsersTable.jsx";
import PostsTable from "./pages/admin/PostsTable.jsx";
import CategoriesTable from "./pages/admin/CategoriesTable.jsx";
import CommentsTable from "./pages/admin/CommentsTable.jsx";
import ForgotPassword from "./pages/forms/ForgotPassword.jsx";
import ResetPassword from "./pages/forms/ResetPassword.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import {useSelector} from "react-redux"
import VerifyEmail from "./pages/verify-email/verifyEmail.jsx";
function App() {
  
  const {user}=useSelector(state => state.auth)

  return (
    <BrowserRouter >
    <ToastContainer theme="colored" position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={!user ? <Login /> :<Navigate to="/" /> }/>
        <Route path="/register" element={!user ?  <Register />:<Navigate to="/" />}/>
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="/create-post" element={user ?<CreatePost />:<Navigate to='/'/>}/>
        <Route path="/posts/details/:id" element={<PostDetails />}/>
        <Route path="/posts/categories/:category" element={<Category/>}/>
        <Route path="/posts" element={<PostsPage />}/>

        <Route path="admin-dashboard">
          <Route index element={user?.isAdmin? <AdminDashboard /> : <Navigate to='/'/>}/>
          <Route path="users-table" element={user?.isAdmin?<UsersTable />: <Navigate to='/'/>}/>
          <Route path="posts-table" element={user?.isAdmin?<PostsTable />: <Navigate to='/'/>}/>
          <Route path="categories-table" element={user?.isAdmin?<CategoriesTable />: <Navigate to='/'/>}/>
          <Route path="comments-table" element={user?.isAdmin?<CommentsTable />: <Navigate to='/'/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      
      </Routes>
      <Footer />
    
    </BrowserRouter>
  );
}

export default App;
