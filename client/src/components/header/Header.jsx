import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { Button } from "../ui/button";
import SearchBar from "../ui/searchBar";
import { RouteProfile, RouteSignIn, RouteSignUp } from "@/helpers/routeName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userimg from "@/assets/user.png";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/redux/user/user.slice";
import { getEnv } from "@/helpers/getEnv";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
      method: "POST",
      credentials: "include", // Include cookies
    });

    const data = await response.json();
    if (!response.ok) {
      showToast("error", data?.message || "Logout failed");
      return;
    }

    dispatch(removeUser());
    navigate(RouteSignUp);
    showToast("success", data?.message || "Logout successful");
  };

  return (
    <header className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
      <div className="flex items-center gap-3">
        {/* constrain logo size so it doesn't overflow */}
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-medium">Brand</span>
      </div>

      <div className="flex-1 max-w-2xl mx-4 ">
        <SearchBar />
      </div>

      <div>
        {!user.status ? (
          <Button asChild>
            <Link to={RouteSignIn} className="text-sm">
              <FaSignInAlt />
              Sign in
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>

              <Avatar>
                <AvatarImage src={user?.userData?.avatar || userimg} />
                <AvatarFallback>
                  {user?.userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user?.userData?.name}</p>
                <p className="text-sm">{user?.userData?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="hover:bg-blue-100 cursor-pointer"
              >
                <Link to="/profile">
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="hover:bg-blue-100 cursor-pointer"
              >
                <Link to={RouteProfile}>
                  <IoCreateOutline />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-100 cursor-pointer"
              >
                <MdOutlineLogout color="brown" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
