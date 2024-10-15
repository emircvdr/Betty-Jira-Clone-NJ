"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";


const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);  // API'den gelen veriyi burada tutacağız
  const [error, setError] = useState(null); // Hata durumlarını burada tutacağız


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
        setData(data);  // Gelen veriyi state'e ata
      } catch (error) {
        setError(error.message);  // Hata durumunda error state'e ata
      }
    };

    fetchData();
  }, [router]);

  const circleText = data?.username ? data.username.charAt(0).toUpperCase() : "a";


  return (

    <div className="flex flex-col">
      <div>
        <h1 className="text-red-900">hello</h1>
      </div>
    </div>

  );
}

export default Dashboard;