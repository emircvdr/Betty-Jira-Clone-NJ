/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Bell, ChevronDown, ChevronUp, HelpCircleIcon, Home, ListChecks, LogOut, PlusCircle, Settings, User, User2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CreateNewWorkplaceDialog from "./CreateNewWorkplaceDialog";
import { fetchWorkplaces } from "@/app/api/workplacesAPI";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import CreateNewProjectDialog from "./CreateNewProjectDialog";
import { fetchProjects } from "@/app/api/projectAPI";

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
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [workplaces, setWorkplaces] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [workplaceInvites, setWorkplaceInvites] = useState<any[]>([]);
    const [allWorkplaces, setAllWorkplaces] = useState<any[]>([]);
    const [membersWorkplaces, setMembersWorkplaces] = useState<any[]>([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState<any | null>(null);
    const token = Cookies.get("token");
    const userId = Cookies.get("user");
    const workplaceId = Cookies.get("workplace");

    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Auth/GetUser/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        const listProjects = async () => {
            const token = Cookies.get("token");
            try {
                const response = await fetch(`http://localhost:5135/api/Project/GetProjectWithWorkplaceID/${workplaceId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Bir hata oluştu: ", error);
                throw error;
            }
        }

        const loadWorkplaces = async () => {
            try {
                const data = await fetchWorkplaces(userId);
                if (data) setWorkplaces(prev => data); // sadece değişiklik varsa state güncelle
            } catch (error) {
                console.error(error);
            }
        };

        const fetchWorkplaceInvites = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/WorkplaceInvite/getInviteById/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }

                const data = await response.json();
                setWorkplaceInvites(data);
            } catch (error) {
                console.error(error);
            }
        };

        const listWorkplaces = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Workplace/listWorkplaces`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }

                const data = await response.json();
                if (data) setAllWorkplaces(prev => data);
            } catch (error) {
                console.error(error);
            }
        };

        const relationWorkplaces = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/RelationWorkplace/GetRelationListByUserId/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }

                const data = await response.json();
                setMembersWorkplaces(data);
            } catch (error) {
                console.error(error);
            }
        };

        const setWorkplaceFromCookie = () => {
            if (workplaceId && workplaces.length && allWorkplaces.length) {
                const workspace = [...workplaces, ...allWorkplaces].find(ws => ws.id === Number(workplaceId));
                setSelectedWorkspace(workspace || null);
            }
        };

        fetchData();
        loadWorkplaces();
        fetchWorkplaceInvites();
        listWorkplaces();
        relationWorkplaces();
        setWorkplaceFromCookie();
        listProjects();
    }, [router, workplaces.length, allWorkplaces.length]);

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
                    {workplaceInvites?.length}
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
            isVisible: !isMember,
        },
        {
            title: "Members",
            icon: User,
            url: "/members",
        },
    ];

    const selectedWorkplaceFirstLetter = selectedWorkspace?.workplaceName.charAt(0).toUpperCase();
    const userFirstLetter = user?.username.charAt(0).toUpperCase();

    const handleWorkspaceSelect = (workspace: any) => {
        setSelectedWorkspace(workspace);
        Cookies.set("workplace", workspace.id);
        console.log("Seçilen Workspace ID:", workspace.id);
        const isMember = membersWorkplaces.some(
            (x) => x.workplaceAdminId != userId && x.acceptedUserId == userId && x.workplaceId === workspace.id
        )
        setIsMember(isMember);
    };



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
                                menuItems.filter(item => item.isVisible !== false).map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url} size={
                                            open ? "sm" : "sm"
                                        } >
                                            <a href={item.url} className="mb-2 font-semibold">
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
                <Collapsible defaultOpen className="group/collapsible"  >
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Projects
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent >
                            <SidebarGroupContent>
                                {
                                    !isMember && (
                                        <SidebarMenuButton asChild size={
                                            open ? "md" : "sm"
                                        } className="border">
                                            {
                                                open ? (
                                                    <CreateNewProjectDialog />
                                                ) : <PlusCircle />
                                            }
                                        </SidebarMenuButton>
                                    )
                                }
                                {
                                    projects.map((item) => (
                                        <SidebarMenu key={item.id}>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild size={open ? "sm" : "sm"}>
                                                    <span>
                                                        {item.name}
                                                    </span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </SidebarMenu>
                                    ))
                                }
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size={
                                    open ? "lg" : "lg"
                                }>
                                    {
                                        open ? (
                                            <>
                                                <span className=" w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-bold">{userFirstLetter}</span>
                                                <div className="flex flex-col">
                                                    <span>{user?.username}</span>
                                                    <span className="text-muted-foreground text-[12px]">{user?.email}</span>
                                                </div>
                                                <ChevronUp className="ml-auto" />
                                            </>
                                        ) : <span className="
                                        w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-bold
                                        ">{userFirstLetter}</span>
                                    }
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side={
                                open ? "top" : "right"
                            } className={
                                open ? "w-[--radix-popper-anchor-width]" : "w-48"
                            }>
                                <div className="flex items-start gap-2 p-1">
                                    <span className=" w-9 h-9 rounded-md bg-black text-white flex items-center justify-center font-bold">{userFirstLetter}</span>
                                    <div className="flex flex-col gap-0">
                                        <span className="text-sm">{user?.username}</span>
                                        <span className="text-muted-foreground text-[12px]">{user?.email}</span>
                                    </div>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/profile")}>
                                    <User2 />
                                    <span> Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    <HelpCircleIcon />
                                    <span> Help</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    Cookies.remove("user");
                                    Cookies.remove("token");
                                    router.push("/login");
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
