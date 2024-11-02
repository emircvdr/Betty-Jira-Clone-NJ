"use client";

import { AppSidebar } from "@/components/app-siderbar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface SettingsLayoutProps {
    children: React.ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {


    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
                <main className="w-[99%] h-[98%] bg-white rounded-lg  shadow-lg">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
};

export default SettingsLayout;