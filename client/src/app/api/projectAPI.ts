import Cookies from "js-cookie";


export const createProject = async (projectName: string, adminId: string, workplaceId:string) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch("http://localhost:5135/api/Project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                Name: projectName,
                WorkplaceId: workplaceId,
                AdminId: adminId,
            }),
        });

        if (!response.ok) {
            throw new Error("Proje oluşturulamadı.");
        }

        return await response.json();
    } catch (error) {
        console.error("Bir hata oluştu: ", error);
        throw error;
    }
};

export const fetchProjects = async (workplaceId: string) => {
    const token = Cookies.get("token");
    try {
        const response = await fetch(`http://localhost:5135/api/Project/GetProjectWithWorkplaceID/${workplaceId}`, {
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




