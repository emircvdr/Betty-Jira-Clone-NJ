"use client";
import Navbar from "@/components/Navbar";
import UpperNavbar from "@/components/UpperNavbar";

interface RegisterLayoutProps {
    children: React.ReactNode;
};

const ProfileLayout = ({ children }: RegisterLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-row w-full flex-grow">
                <div className="hidden md:flex md:w-[300px] h-full">
                    <Navbar />
                </div>
                <div className="flex flex-col w-full">
                    <UpperNavbar />
                    <main className="h-full flex flex-col overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
