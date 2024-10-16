"use client";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";  // usePathname'i ekledik
import { HiHome } from "react-icons/hi";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { FaPlusCircle } from "react-icons/fa";

const Navbar = () => {
    const route = useRouter();
    const pathname = usePathname(); // Aktif olan route'u almak için kullanıyoruz
    const [workplaceName, setWorkplaceName] = useState(""); // Workplace adını tutacak state
    const userId = Cookies.get("user"); // Cookie'den user id'sini alıyoruz
    const token = Cookies.get("token"); // Yetkilendirme için token alıyoruz

    const [workplaces, setWorkplaces] = useState([]);
    useEffect(() => {
        const token = Cookies.get("token");
        const userId = Cookies.get("user");

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Workplace/getWorkplaces/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,  // Bearer token ile isteği yetkilendiriyoruz
                    },
                })
                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                setWorkplaces(data);
            } catch (error) {
                console.error("Bir hata oluştu: ", error);
            }
        }
        fetchData();
    }, []); // Workplace'leri tutacak state

    const navbarItems = [
        {
            title: "Dashboard",
            icon: <HiHome />,
            route: "/",
        },
        {
            title: "Projects",
            icon: <HiHome />,
            route: "/settings",
        },
    ];

    // const titleMapping = {
    //     "/": "Dashboard",
    //     "/profile": "Profile",
    //     "/settings": "Settings",
    // };

    const handleCreateWorkplace = async () => {
        try {
            const response = await fetch("http://localhost:5135/api/Workplace/createWorkplace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Token ile yetkilendirme
                },
                body: JSON.stringify({
                    WorkplaceName: workplaceName,
                    WorkplaceAdminId: userId, // User ID'yi backend'e gönderiyoruz
                }),
            });

            if (response.ok) {
                console.log("Workplace başarıyla oluşturuldu.");
                setWorkplaceName(""); // İşlem başarılı olursa input'u temizliyoruz
            } else {
                console.error("Workplace oluşturulamadı.");
            }
        } catch (error) {
            console.error("Bir hata oluştu: ", error);
        }
    };

    return (
        <div className="flex flex-row">
            <div className="w-[300px] flex flex-col h-screen bg-white shadow-md">
                <div className="h-[100px] w-full flex justify-center shadow-md ">
                    <Image src="/logo.svg" alt="logo" width={70} height={70} onClick={() => {
                        route.push("/");
                    }} className="cursor-pointer" />
                </div>
                <div className="w-full h-[120px] flex flex-col items-center justify-center gap-5 mt-3 mb-6">
                    {
                        workplaces && workplaces.length > 0 ?
                            <div className="flex flex-col mt-5 gap-2">
                                <div className="flex flex-row items-center justify-between">
                                    <h3 className="text-sm text-gray-500 font-semibold text-center self-start">
                                        Workplaces
                                    </h3>
                                    <FaPlusCircle className="cursor-pointer" />
                                </div>
                                <Select>
                                    <SelectTrigger className="w-[268px] h-[50px]">
                                        <SelectValue placeholder="Select a Workplace" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Workplaces</SelectLabel>
                                            {
                                                workplaces.map((workplace) => {
                                                    const circleText = workplace.workplaceName
                                                        ? workplace.workplaceName.charAt(0).toUpperCase() // Her workplace'in adının ilk harfi
                                                        : "A";
                                                    return (
                                                        <SelectItem key={workplace.id} value={workplace?.workplaceName}>
                                                            <div className="flex flex-row gap-3">
                                                                <span className="font-bold">{circleText}</span> {/* Her workplace'in ilk harfi */}
                                                                <span className="ml-2">
                                                                    {workplace?.workplaceName}
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            </div>
                            :
                            (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Create a Workplace</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Create a Workplace</DialogTitle>
                                            <DialogDescription>
                                                Create a new workplace to start collaborating with your team.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Workplace Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="col-span-3"
                                                    placeholder="Enter a name for your workplace"
                                                    value={workplaceName}
                                                    onChange={(e) => setWorkplaceName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogClose>
                                            <Button className="w-full" onClick={handleCreateWorkplace}>Create</Button>
                                        </DialogClose>
                                    </DialogContent>
                                </Dialog>
                            )

                    }

                    <Separator orientation="horizontal" />
                </div >
                <div className="p-3">
                    {navbarItems.map((item, index) => (
                        <div
                            key={index}
                            className="p-1"
                        >
                            <Button
                                variant="outline"
                                onClick={() => route.push(item.route)}
                                className={`w-full h-[50px] flex items-center justify-start p-3 rounded-lg 
                                    ${pathname === item.route ? "bg-black text-white" : ""}
                                    transition-colors duration-100`}
                            >
                                {item.icon}
                                <span className="ml-2 text-md tracking-wide">
                                    {item.title}
                                </span>
                            </Button>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default Navbar;
