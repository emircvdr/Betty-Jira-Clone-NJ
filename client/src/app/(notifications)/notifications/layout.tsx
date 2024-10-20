"use client";

import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface NotificationLayoutProps {
    children: React.ReactNode;
};

const NotificationsLayout = ({ children }: NotificationLayoutProps) => {


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

export default NotificationsLayout;