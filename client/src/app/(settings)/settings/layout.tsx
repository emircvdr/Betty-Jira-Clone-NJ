"use client";
interface SettingsLayoutProps {
    children: React.ReactNode;
};

const SettingsLayout = ({ children }: SettingsLayoutProps) => {


    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-row w-full flex-grow">
                <div className="hidden md:flex md:w-[300px] h-full">
                </div>
                <div className="flex flex-col w-full">
                    <main className="h-full py-8 px-6 flex flex-col overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SettingsLayout;