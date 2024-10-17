"use client"
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UpperNavbar = () => {
    const route = useRouter();
    const pathname = usePathname();
    const [data, setData] = useState(null);  // API'den gelen veriyi burada tutacağız

    useEffect(() => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");
        // Eğer token varsa, API çağrısı yapalım
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Auth/GetUser/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Bearer token ile isteği yetkilendiriyoruz
                    },
                });

                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }

                const data = await response.json();
                setData(data);  // Gelen veriyi state'e ata
            } catch (error) {
                console.error(error)

            }
        };

        fetchData();
    }, []);
    const titleMapping = {
        "/": "Dashboard",
        "/profile": "Profile",
        "/settings": "Settings",
        "/members": "Members",
        "/notifications": "My Notifications",
    };
    const circleText = data?.username ? data.username.charAt(0).toUpperCase() : "A";
    return (
        <div className="flex-1 h-[100px] bg-white shadow-md">
            <div className="flex flex-row w-full h-full items-center justify-between p-7">
                <h1 className="text-black text-2xl">{titleMapping[pathname]}</h1>

                <div className="flex items-center gap-10">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="w-[50px] h-[50px] rounded-full bg-white border cursor-pointer flex items-center justify-center">
                                {circleText}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">
                                        {data?.username}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {data?.email}
                                    </p>
                                    <Separator orientation="horizontal" className="w-full" />
                                </div>
                                <div className="grid gap-2 w-full">
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full flex items-center justify-between"
                                            onClick={() => route.push("/profile")}
                                        >
                                            Profile
                                            <span className="ml-auto text-xs tracking-widest opacity-60">
                                                ⇧⌘P
                                            </span>
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full flex items-center justify-between"
                                        >
                                            Settings
                                            <span className="ml-auto text-xs tracking-widest opacity-60">
                                                ⌘S
                                            </span>
                                        </Button>
                                    </div>
                                    <Separator orientation="horizontal" className="w-full" />
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full flex items-center justify-between"
                                            onClick={() => {
                                                Cookies.remove("user");
                                                Cookies.remove("token");
                                                route.push("/login");
                                            }}
                                        >
                                            Log out
                                            <span className="ml-auto text-xs tracking-widest opacity-60">
                                                ⇧⌘Q
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
};

export default UpperNavbar;