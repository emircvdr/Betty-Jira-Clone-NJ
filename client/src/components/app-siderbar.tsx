/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import { Bell, ChevronDown, ChevronUp, Home, ListChecks, LogOut, Settings, User, User2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useSidebarContext } from "@/context/SiderbardContext";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CreateNewWorkplaceDialog from "./CreateNewWorkplaceDialog";

const GreenCircle = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="8"
        height="8"
        fill="green"
    >
        <circle cx="12" cy="12" r="10" />
    </svg>
);



export function AppSidebar() {
    const {
        open,
    } = useSidebar()
    const route = useRouter();
    const userId = Cookies.get("user");
    const pathname = usePathname();
    const { workplaces, username, membersWorkplaces, allWorkplaces, workplacesInvites } = useSidebarContext();
    const [selectedWorkspace, setSelectedWorkspace] = useState<any | null>(null);

    const menuItems = [
        {
            title: "Home",
            icon: Home,
            url: "/",
        },
        {
            title: "My Notifications",
            icon: Bell,
            url: "/notifications",
            notificatons: (
                <span className="bg-red-500 text-white  border rounded-full w-6 h-6 text-center flex items-center justify-center">
                    {workplacesInvites?.length}
                </span>
            )
        },
        {
            title: "My Tasks",
            icon: ListChecks,
            url: "/tasks",
        },
        {
            title: "Settings",
            icon: Settings,
            url: "/settings",
        },
        {
            title: "Members",
            icon: User,
            url: "/members",
        },
    ];

    // Sayfa yüklendiğinde cookie'den workspace ID'sini al
    useEffect(() => {
        const workplaceId = Cookies.get("workplace");
        console.log("Cookie'den okunan ID:", workplaceId); // Cookie'den okunan değeri kontrol et


        if (workplaceId) {
            const idNumber = Number(workplaceId);
            const workspace = [...workplaces, ...allWorkplaces].find(ws => ws.id === idNumber);
            console.log("Bulunan Workspace:", workspace); // Bulunan workspace'ı kontrol et
            setSelectedWorkspace(workspace || null); // Eğer workspace bulunamazsa null ata
        }
    }, [workplaces, allWorkplaces]);

    const handleWorkspaceSelect = (workspace: any) => {
        setSelectedWorkspace(workspace);
        Cookies.set("workplace", workspace.id); // Workspace ID'sini cookie'ye kaydet
        console.log("Seçilen Workspace ID:", workspace.id); // Seçilen ID'yi kontrol et
    };

    const selectedWorkplaceFirstLetter = selectedWorkspace?.workplaceName.charAt(0).toUpperCase();

    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <div className="h-[70px] w-full flex justify-center ">
                <Image src="/logo.svg" alt="logo" width={60} height={60} className="cursor-pointer" />
            </div>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    {selectedWorkspace ?
                                        <div className="flex gap-3 items-center">
                                            <span className="
                                            w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-bold
                                            ">{selectedWorkplaceFirstLetter}</span>
                                            <div className="flex flex-col">
                                                <span>{selectedWorkspace.workplaceName}</span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {
                                                        membersWorkplaces && membersWorkplaces.length > 0 &&
                                                            membersWorkplaces.some((x) => x.acceptedUserId == userId && x.workplaceId === selectedWorkspace.id) ?
                                                            "Member" : "Owner"
                                                    }
                                                </span>
                                            </div>


                                        </div>
                                        : "Select Workspace"}
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={
                                open ? "w-[--radix-popper-anchor-width]" : "w-48"
                            }>
                                <DropdownMenuLabel className="text-muted-foreground text-sm">Workplaces</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {
                                        workplaces.map((x) => (
                                            <DropdownMenuItem key={x.id} onClick={() => handleWorkspaceSelect(x)}>
                                                <span>{x.id === selectedWorkspace?.id ? GreenCircle() : ""}</span>
                                                <span>{x.workplaceName}</span>
                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuGroup>
                                {
                                    membersWorkplaces && membersWorkplaces.length > 0 &&
                                    (
                                        <>
                                            <DropdownMenuLabel className="text-muted-foreground text-sm">Members Workplaces</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                {
                                                    allWorkplaces.filter((item) => membersWorkplaces.some((x) => x.acceptedUserId == userId && x.workplaceId === item.id))
                                                        .map((workplace) => {
                                                            return (
                                                                <DropdownMenuItem key={workplace.id} onClick={() => handleWorkspaceSelect(workplace)}>
                                                                    <span>{workplace.id === selectedWorkspace?.id ? GreenCircle() : ""}</span>
                                                                    <span>{workplace.workplaceName}</span>
                                                                </DropdownMenuItem>
                                                            )
                                                        })
                                                }
                                            </DropdownMenuGroup>
                                        </>
                                    )

                                }
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <CreateNewWorkplaceDialog />
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url} size={
                                            open ? "lg" : "sm"
                                        }>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                        <SidebarMenuBadge>{item.notificatons}</SidebarMenuBadge>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size={
                                    open ? "lg" : "sm"
                                }>
                                    <User2 /> {username?.username}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem onClick={() => route.push("/profile")}>
                                    <User2 />
                                    <span> Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    Cookies.remove("user");
                                    Cookies.remove("token");
                                    route.push("/login");
                                }}>
                                    <LogOut />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    );
}
