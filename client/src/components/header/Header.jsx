import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { Button } from "../ui/button";
import SearchBar from "../ui/searchBar";
import {
  RouteAddBlog,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
} from "@/helpers/RouteNames.js";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu, Search } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleLogout = async () => {
    const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/logout`, {
      method: "POST",
      credentials: "include",
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
    <header
      className="flex justify-between items-center h-16 fixed w-full z-20
      border-b bg-white/80 backdrop-blur-md shadow-sm px-4 md:px-8"
    >
      {/* Mobile Menu Trigger and Search Button */}
      <div className="md:hidden flex items-center gap-2">
        <SidebarTrigger>
          <Menu className="h-6 w-6" />
        </SidebarTrigger>
        {!mobileSearchOpen && (
          <Button variant="ghost" onClick={() => setMobileSearchOpen(true)} className="p-2">
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Logo + Brand */}
      <Link
        to="/"
        className="flex items-center gap-2 hover:opacity-90 transition"
      >
        <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
          Blogify
        </span>
      </Link>

      {/* Search (hidden on mobile) */}
      <div className="hidden md:flex flex-1 max-w-lg mx-6">
        <SearchBar />
      </div>

      {/* Mobile Search */}
      {mobileSearchOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-sm z-30 p-4">
          <div className="flex items-center gap-2">
            <SearchBar />
            <Button
              variant="ghost"
              onClick={() => setMobileSearchOpen(false)}
              className="p-2"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>
      )}

      {/* Auth Section */}
      <div>
        {!user.status ? (
          <Button asChild className="flex gap-2 rounded-full px-5">
            <Link to={RouteSignIn} className="flex items-center gap-2">
              <FaSignInAlt className="text-base" />
              <span className="text-sm font-medium">Sign in</span>
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="cursor-pointer hover:scale-110 transition-transform duration-200">
                <AvatarImage src={user?.userData?.avatar || userimg} />
                <AvatarFallback className="bg-violet-100 text-violet-600 font-bold">
                  {user?.userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-60 shadow-xl rounded-xl p-2"
            >
              <DropdownMenuLabel className="pb-2 border-b">
                <p className="font-semibold">{user?.userData?.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.userData?.email}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile} className="flex items-center gap-2">
                  <FaRegUser className="text-blue-500" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteAddBlog} className="flex items-center gap-2">
                  <IoCreateOutline className="text-green-500" />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer hover:!bg-red-50 flex items-center gap-2"
              >
                <MdOutlineLogout />
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
