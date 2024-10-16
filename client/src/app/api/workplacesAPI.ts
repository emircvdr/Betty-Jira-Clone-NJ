// services/workplaceService.ts
import Cookies from "js-cookie";

export const fetchWorkplaces = async (userId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch(`http://localhost:5135/api/Workplace/getWorkplaces/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Veri alınırken bir hata oluştu");
        }

        return await response.json();
    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        throw error;
    }
};

export const createWorkplace = async (workplaceName: string, userId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch("http://localhost:5135/api/Workplace/createWorkplace", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                WorkplaceName: workplaceName,
                WorkplaceAdminId: userId,
            }),
        });

        if (!response.ok) {
            throw new Error("Workplace oluşturulamadı.");
        }

        return await response.json();
    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        throw error;
    }
};

export const updateWorkplace = async (workplaceId: number, workplaceName: string) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch("http://localhost:5135/api/Workplace/updateWorkplace", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                Id: workplaceId,
                WorkplaceName: workplaceName,
            }),
        });

        if (!response.ok) {
            throw new Error("Workplace güncellenemedi.");
        }

        return await response.json();
    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        throw error;
    }
};

export const deleteWorkplace = async (workplaceId: number) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch(`http://localhost:5135/api/Workplace/deleteWorkplaces/${workplaceId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Workplace silinemedi.");
        }

        return await response.json();
    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        throw error;
    }
};



