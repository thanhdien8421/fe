import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Công ty",
    url: "/company",
    icon: Home,
  },
  {
    title: "Bài đăng tuyển dụng",
    url: "/recruitment",
    icon: Inbox,
  },
  {
    title: "Dữ liệu cá nhân",
    url: "/profile",
    icon: Calendar,
  },
  {
    title: "CV tuyển dụng",
    url: "/record",
    icon: Search,
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar className="h-full">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

