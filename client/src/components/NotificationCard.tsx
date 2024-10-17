import React from 'react';
import { Button } from "@/components/ui/button"; // Tailwind CSS ile uyumlu buton bileşeni
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

const NotificationCard = ({ username, workspaceName, invitationId }) => {
    const handleAccept = async () => {
        const token = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:5135/api/WorkplaceInvite/respondToInvite/${invitationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: "Accepted",
                    respondedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Workplace oluşturulamadı.");
            }
            toast.success("Accepted");
            return await response.json();

        } catch (error) {
            console.error("Bir hata oluştu: ", error);
            throw error;
        }

    };
    const handleReject = async () => {
        const token = Cookies.get("token");
        try {
            const response = await fetch(`http://localhost:5135/api/WorkplaceInvite/respondToInvite/${invitationId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: "Rejected",
                    respondedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Workplace oluşturulamadı.");
            }
            toast.success("Rejected.");
            return await response.json();
        } catch (error) {
            console.error("Bir hata oluştu: ", error);
            throw error;
        }
    };
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold">{username}</h2>
            <p className="text-gray-600">
                {username} has invited you to join the workplace &quot;{workspaceName}&quot;.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={handleAccept}>Accept</Button>
                <Button onClick={handleReject} variant="destructive">Reject</Button>
            </div>
        </div>
    );
};

export default NotificationCard;
