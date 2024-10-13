"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface RegisterLayoutProps {
    children: React.ReactNode;
};

const RegisterLayout = ({ children }: RegisterLayoutProps) => {
    const pathname = usePathname()
    return (
        <div>
            <div className="w-full flex items-center justify-between p-12">
                <Image src="/logo.svg" alt="logo" width={80} height={80} />
                <Button>
                    <Link href={
                        pathname === "/register" ? "/login" : "/register"
                    }>
                        {pathname === "/register" ? "Login" : "Register"}
                    </Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
export default RegisterLayout;