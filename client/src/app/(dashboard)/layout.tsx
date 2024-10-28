"use client";

import { AppSidebar } from "@/components/app-siderbar";
import CustomTrigger from "@/components/CustomTrigger";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeIcon } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-screen">
                <div className="flex flex-col w-full h-[60px]">
                    <div className="flex flex-row items-center gap-2 justify-start w-full h-full p-2">
                        <CustomTrigger pageTitle="Dashboard" icon={<HomeIcon />} />
                    </div>
                    <Separator />
                </div>
                <main className="w-full h-[calc(100vh-60px)]">
                    {children}
                </main>
            </div>
        </SidebarProvider>

    );
};

export default DashboardLayout;