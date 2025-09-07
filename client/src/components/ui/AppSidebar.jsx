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
} from "@/components/ui/sidebar"
import Logo from '@/assets/logo.png'
import { Link } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { TbLogs } from "react-icons/tb";
import { FaCommentDots } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { RouteCategoryDetails } from "@/helpers/routeName.js";




const AppSidebar = ()=>{
  return (
    <Sidebar>
      <SidebarHeader className="bg-gray-100"> 
        <img src={Logo} alt="Logo" width={40} height={40} />
      </SidebarHeader>
        <SidebarContent className="bg-gray-100">
          <SidebarGroup >
             <SidebarMenu>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaHome />
                    <Link to='/'>Home</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BiSolidCategory />
                    <Link to={RouteCategoryDetails}>Categories</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <TbLogs />
                    <Link to=''>Blogs</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaCommentDots />
                    <Link to=''>Comments</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FaUser />
                    <Link to=''>Users</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

             </SidebarMenu>
          </SidebarGroup >

          <SidebarGroup >
            <SidebarGroupLabel>
              Categories
            </SidebarGroupLabel>
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <GoDotFill />
                    <Link to=''>Category Items</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarGroup >

        </SidebarContent>
      
    </Sidebar>
  )
}

export default AppSidebar