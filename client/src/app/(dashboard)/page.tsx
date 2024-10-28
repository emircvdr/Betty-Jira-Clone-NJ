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





  return (
    <div className="w-full h-full">
      <h1 className="text-red-900">hello</h1>
    </div>



  );
}

export default Dashboard;