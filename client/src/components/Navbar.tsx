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
import { createWorkplace, fetchWorkplaces } from "@/app/api/workplacesAPI";
import { MdOutlineTaskAlt } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

const Navbar = () => {
    const route = useRouter();
    const pathname = usePathname(); // Aktif olan route'u almak için kullanıyoruz
    const [workplaceName, setWorkplaceName] = useState(""); // Workplace adını tutacak state
    const userId = Cookies.get("user"); // Cookie'den user id'sini alıyoruz
    const [workplaces, setWorkplaces] = useState([]);

    const [selectedWorkplace, setSelectedWorkplace] = useState("");

    useEffect(() => {
        const loadWorkplaces = async () => {
            try {
                const data = await fetchWorkplaces(userId);
                console.log(data)
                setWorkplaces(data);
            } catch (error) {
                console.error(error);
            }
        }
        loadWorkplaces();

        const savedWorkplace = Cookies.get("workplace");
        if (savedWorkplace) {
            setSelectedWorkplace(String(savedWorkplace)); // Cookie'den gelen ID'yi string'e çevir
        }

    }, []);

    const navbarItems = [
        {
            title: "Home",
            icon: <HiHome />,
            route: "/",
        },
        {
            title: "My Tasks",
            icon: <MdOutlineTaskAlt />,
            route: "/tasks",
        },
        {
            title: "Settings",
            icon: <CiSettings />,
            route: "/settings",
        },
        {
            title: "Members",
            icon: <IoPeopleOutline />,
            route: "/members",
        },
    ];

    // const titleMapping = {
    //     "/": "Dashboard",
    //     "/profile": "Profile",
    //     "/settings": "Settings",
    // };

    const handleCreateWorkplace = async () => {
        try {
            await createWorkplace(workplaceName, userId);
            setWorkplaceName("");
            const data = await fetchWorkplaces(userId);
            setWorkplaces(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleWorkplaceChange = (workplaceId) => {
        Cookies.set("workplace", workplaceId);
        setSelectedWorkplace(workplaceId);
    }

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
                                <Select value={selectedWorkplace || ""} onValueChange={handleWorkplaceChange}>
                                    <SelectTrigger className="w-[268px] h-[50px]">
                                        <SelectValue>
                                            {
                                                (() => {
                                                    const selectedWorkplaceData = workplaces.find((workplace) => String(workplace.id) === selectedWorkplace);
                                                    if (selectedWorkplaceData) {
                                                        const circleText = selectedWorkplaceData.workplaceName.charAt(0).toUpperCase(); // İlk harfi al
                                                        return (
                                                            <div className="flex flex-row gap-3">
                                                                <span className="font-bold">{circleText}</span> {/* İlk harf */}
                                                                <span className="ml-2">
                                                                    {selectedWorkplaceData.workplaceName}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                    return "Select a Workplace"; // Eğer seçilen yoksa placeholder
                                                })()
                                            }
                                        </SelectValue>
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
                                                        <SelectItem key={workplace.id} value={String(workplace.id)}>
                                                            <div className="flex flex-row gap-3">
                                                                <span className="font-bold">{circleText}</span> {/* İlk harf */}
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
