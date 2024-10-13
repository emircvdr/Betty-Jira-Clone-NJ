"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { FaArrowDown, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        // Reset the form after submission
        setForm({
            email: "",
            password: ""
        });
    };

    return (
        <div className="flex justify-center w-full px-4">
            <Card className="w-full max-w-[450px] h-auto py-5">
                <CardHeader>
                    <CardTitle className="text-center text-2xl mb-2">Welcome Back!</CardTitle>
                    <CardDescription className="text-center">
                        Please enter your credentials to access your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button size="lg" className="w-full">Login</Button>
                </CardFooter>
                <div className="flex justify-evenly items-center">
                    <Separator orientation="horizontal" className="w-[150px]" />
                    <FaArrowDown color="#c4c3c3d5" />
                    <Separator orientation="horizontal" className="w-[150px]" />
                </div>
                <div className="flex flex-col gap-5 items-center mt-5 w-full p-3">
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <FcGoogle size={20} />
                        &nbsp;
                        <p className="font-bold">Login with Google</p>
                    </Button>
                    <Button variant="secondary" className="w-full max-w-[300px]">
                        <FaGithub size={20} />
                        &nbsp;
                        <p className="font-bold">Login with Github</p>
                    </Button>
                    <p className="text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-blue-600">Register</Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;
