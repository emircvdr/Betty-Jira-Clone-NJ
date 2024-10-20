/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchWorkplaces } from "../api/workplacesAPI";
import { useSidebarContext } from "@/context/SiderbardContext";


const Dashboard = () => {
  const router = useRouter();
  const { setWorkplaces, setUsername, setMembersWorkplaces, setAllWorkplaces, setWorkplaceInvites } = useSidebarContext();

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("user");
    if (!token) {
      router.push("/login");
      return;
    }
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
        setUsername(data)  // Gelen veriyi state'e ata
      } catch (error) {
        console.error(error);
      }
    };
    const loadWorkplaces = async () => {
      try {
        const data = await fetchWorkplaces(userId);
        console.log(data)
        setWorkplaces(data);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchWorkplaceInvites = async () => {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

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
        setWorkplaceInvites(data);
      } catch (error) {
        console.error(error);
      }
    };

    const listWorkplaces = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(`http://localhost:5135/api/Workplace/listWorkplaces`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Veri alınırken bir hata oluştu");
        }
        const data = await response.json();
        setAllWorkplaces(data);
      } catch (error) {
        console.error(error);
      }
    }

    const relationWorkplaces = async () => {
      const token = Cookies.get("token");
      const user = Cookies.get("user");

      try {
        const response = await fetch(`http://localhost:5135/api/RelationWorkplace/GetRelationListByUserId/${user}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Veri alınırken bir hata oluştu");
        }
        const data = await response.json();
        setMembersWorkplaces(data)
      } catch (error) {
        console.error(error);
      }

    }
    relationWorkplaces();
    loadWorkplaces();
    fetchWorkplaceInvites();
    listWorkplaces()

    fetchData();
  }, [router]);



  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-red-900">hello</h1>
      </div>
    </div>

  );
}

export default Dashboard;