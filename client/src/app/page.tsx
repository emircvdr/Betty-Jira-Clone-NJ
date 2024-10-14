"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;