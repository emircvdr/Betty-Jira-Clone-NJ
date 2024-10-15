"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
    const [data, setData] = useState(null);  // API'den gelen veriyi burada tutacağız
    const [error, setError] = useState(null); // Hata durumlarını burada tutacağız
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
                setError(error.message);  // Hata durumunda error state'e ata
            }
        };
        fetchData();
    }, []);
    const circleText = data?.username ? data.username.charAt(0).toUpperCase() : "A";
    return (
        <div className="flex h-full w-full">
            <div className="w-1/2 p-4">
                <div className="flex flex-col w-full h-full items-center">
                    <div className="w-[120px] h-[120px] rounded-full bg-white border  flex items-center justify-center">
                        <h1 className="text-2xl">{circleText}</h1>
                    </div>
                    <div className="flex flex-col gap-3 mt-5">
                        <div className="flex flex-row gap-3">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="firstName"
                                    // value={data?.email}
                                    disabled
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="lastName"
                                    // value={data?.email}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="name"
                                value={data?.username}
                                disabled
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data?.email}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 bg-blue-300"></div>
        </div>
    )
}

export default Profile;