"use client"
import NotificationCard from "@/components/NotificationCard";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Notifications = () => {
    const [invitations, setInvitations] = useState([]);
    const [users, setUsers] = useState([]);
    const [workplaces, setWorkplaces] = useState([]);
    useEffect(() => {
        const token = Cookies.get("token");
        const user = Cookies.get("user");
        const fetchWorkplaceInvitations = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/WorkplaceInvite/getInviteById/${user}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                console.log(data);
                setInvitations(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Auth/GetList`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchWorkspaces = async () => {
            try {
                const response = await fetch(`http://localhost:5135/api/Workplace/listWorkplaces`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Veri alınırken bir hata oluştu");
                }
                const data = await response.json();
                console.log(data);
                setWorkplaces(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchWorkspaces();
        fetchUsers();
        fetchWorkplaceInvitations();
    }, []);



    return (

        <div className="w-full h-full p-5">
            <div className="mt-3 ">
                <Card className="w-full h-full">
                    <CardContent className="w-full h-full flex flex-col  mt-3">
                        {
                            invitations && invitations.length > 0 ?
                                (
                                    invitations.map((invitation) => {
                                        const user = users.find((u) => u.id === invitation.invitedByUserId);
                                        const workplace = workplaces.find((w) => w.id === invitation.workplaceId);
                                        return (
                                            <NotificationCard
                                                key={invitation.id}
                                                username={user?.username}
                                                workspaceName={workplace?.workplaceName}
                                                invitationId={invitation.id}
                                                workplaceAdminId={user?.id}
                                                workplaceId={workplace?.id}
                                            />
                                        )
                                    })
                                )
                                :
                                <h1 className="text-muted-foreground text-center">
                                    You have no notifications.
                                </h1>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Notifications;