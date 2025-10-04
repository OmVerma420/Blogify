// AppRoutes.jsx
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getRedirectResult } from "firebase/auth";
import { auth } from "./helpers/firebase";
import { showToast } from "./helpers/showToast";
import { getEnv } from "./helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/user/user.slice";
import {
  RouteIndex, RouteProfile, RouteSignIn, RouteSignUp,
  RouteCategoryDetails, RouteAddCategory, RouteEditCategory,
  RouteBlog, RouteAddBlog, RouteEditBlog, RouteBlogDetails,
  RouteBlogByCategory, RouteSearch, RouteComment, RouteUser
} from "./helpers/RouteNames.js";

// pages
import Index from "./pages/Index.jsx";
import Layout from "./Layout/Layout.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/profile.jsx";
import CategoryDetails from "./pages/category/categoryDetails.jsx";
import AddCategory from "./pages/category/addCategory.jsx";
import EditCategory from "./pages/category/editCategory.jsx";
import AddBlog from "./pages/blog/addBlog.jsx";
import { BlogDetails } from "./pages/blog/blogDetail.jsx";
import EditBlog from "./pages/blog/editBlog.jsx";
import BlogPage from "./pages/blogPage.jsx";
import BlogByCategory from "./pages/blog/blogByCategory.jsx";
import SearchResult from "./pages/searchResult.jsx";
import Comment from "./pages/commentDetail.jsx";
import Users from "./pages/users.jsx";

// guards
import AuthRouteProtection from "./components/ui/authRouteProtection.jsx";
import OnlyAdminAllowed from "./components/ui/onlyAdminAllowed.jsx";

function AppRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Google redirect login here
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          const bodyData = {
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          };

          const response = await fetch(
            `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify(bodyData),
            }
          );

          const data = await response.json();
          if (!response.ok) {
            showToast("error", data?.message || "Login failed");
            return;
          }

          showToast("success", data?.message || "Login successful");
          dispatch(setUser(data.data.user));
          navigate(RouteIndex);
        }
      } catch (error) {
        showToast("error", "Google login failed");
      }
    };
    handleRedirectResult();
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path={RouteIndex} element={<Layout />}>
        <Route index element={<Index />} />

        <Route path={RouteBlogDetails()} element={<BlogPage />} />
        <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
        <Route path={RouteSearch()} element={<SearchResult />} />

        <Route element={<AuthRouteProtection />}>
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteAddBlog} element={<AddBlog />} />
          <Route path={RouteEditBlog} element={<EditBlog />} />
          <Route path={RouteComment} element={<Comment />} />
          <Route path={RouteProfile} element={<Profile />} />
        </Route>

        <Route element={<OnlyAdminAllowed />}>
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteEditCategory} element={<EditCategory />} />
          <Route path={RouteUser} element={<Users />} />
        </Route>
      </Route>

      <Route path={RouteSignIn} element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>
      <Route path={RouteSignUp} element={<AuthLayout />}>
        <Route index element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
