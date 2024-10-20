"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowDown, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const result = await fetch("http://localhost:5135/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!result.ok) {
                throw new Error("An error occurred while registering");
            }

            const data = await result.json();
            Cookies.set("token", data.token, { expires: 7 });
            Cookies.set("user", data.id, { expires: 7 });
            router.push("/");

        } catch (error) {
            setError(error.message);
            console.error("Register error:", error);
        }
        // Reset the form after submission
        setForm({
            username: "",
            email: "",
            password: ""
        });
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <div className="flex justify-center w-full px-4">
            <Card className="w-full max-w-[450px] h-auto py-5">
                <CardHeader>
                    <CardTitle className="text-center text-2xl mb-2">Join Us Today!</CardTitle>
                    <CardDescription className="text-center">
                        By signing up, you acknowledge that you have read and accepted our{" "}
                        <Link href="" className="text-blue-600">Privacy Policy</Link> and{" "}
                        <Link href="" className="text-blue-600">Terms of Service</Link>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <Button size="lg" className="w-full">Register</Button>
                    </form>
                </CardContent>
                <div className="flex justify-evenly items-center">
                    <Separator orientation="horizontal" className="w-[150px]" />
                    <FaArrowDown color="#c4c3c3d5" />
                    <Separator orientation="horizontal" className="w-[150px]" />
                </div>
                <div className="flex flex-col gap-5 items-center mt-5 w-full p-3">
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <FcGoogle size={20} />
                        &nbsp;
                        <p className="font-bold">Register with Google</p>
                    </Button>
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <FaGithub size={20} />
                        &nbsp;
                        <p className="font-bold">Register with Github</p>
                    </Button>
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600">Login</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Register;
