import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import { FaCommentDots, FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteComment,
  RouteIndex,
  RouteUser,
} from "@/helpers/routeName.js";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const location = useLocation();
  const user = useSelector(state => state.user)
  const refresh = useSelector((state) => state.category.refresh); 

  const { data: categoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/auth/category/all`,
    {
      method: "get",
      credentials: "include",
    },[refresh]
    
  );

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar className="bg-gradient-to-b from-gray-50 to-gray-100 border-r shadow-sm hidden md:flex">
      {/* Header with Logo */}
      <SidebarHeader className="flex items-center justify-center h-16 border-b">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="p-3">
        {/* Main Menu */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase text-xs text-gray-500 mb-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive("/") ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-200"
                }`}
              >
                <Link to={RouteIndex}>
                  <FaHome className="text-lg" />
                  Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>


            {user && user.status 
            ?
            <>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(RouteBlog)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link to={RouteBlog}>
                  <TbLogs className="text-lg" />
                  Blogs
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(RouteComment)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link to={RouteComment}>
                  <FaCommentDots className="text-lg" />
                  Comments
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            </>
            :
            <></>
            }


            {user && user.status && user.userData.role ==='admin'
            ?
            <>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(RouteCategoryDetails)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link to={RouteCategoryDetails}>
                  <BiSolidCategory className="text-lg" />
                  Categories
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(RouteUser)
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                <Link to={RouteUser}>
                  <FaUser className="text-lg" />
                  Users
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            </>
            :
            <>
            </>
            }
         
          </SidebarMenu>
        </SidebarGroup>

        {/* Categories Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="uppercase text-xs text-gray-500 mb-2">
            Categories
          </SidebarGroupLabel>
          <SidebarMenu>
            {categoryData?.data?.length > 0 &&
              categoryData.data.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                      isActive(RouteBlogByCategory(category.slug))
                        ? "bg-purple-100 text-purple-700 font-semibold"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <Link to={RouteBlogByCategory(category.slug)}>
                      <GoDotFill className="text-xs" />
                      {category.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 text-xs text-gray-500 border-t">
        © {new Date().getFullYear()} MegaBlog
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
