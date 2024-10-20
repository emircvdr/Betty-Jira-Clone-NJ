"use client";

import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface MembersLayoutProps {
    children: React.ReactNode;
};

const MembersLayout = ({ children }: MembersLayoutProps) => {


    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default MembersLayout;