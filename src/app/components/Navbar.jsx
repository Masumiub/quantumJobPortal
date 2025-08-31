"use client";

import React from "react";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Logo from '../../../public/assets/logo.png'
import { TbCategory } from "react-icons/tb";
import Swal from "sweetalert2";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    // Hide navbar on dashboard pages
    if (pathname.startsWith('/userdashboard')) {
        return null;
    }

    const handleLogout = async () => {
        await signOut({ redirect: false });
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: "Logged Out successfully!",
                                  showConfirmButton: false,
                                  timer: 1500
                                });
        router.push("/");
    };

    return (
        <div className='bg-black'>
            <div className="navbar bg-neutral text-neutral-content max-w-7xl mx-auto py-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/jobs'>Jobs</Link></li>
                            <li><Link href='/Login'>Become a Seller</Link></li>
                        </ul>
                    </div>
                    <div className="flex gap-6 items-center">


                    <Link href="/" className=""> <Image src={Logo} alt="logo" className="w-full h-10"></Image> </Link>
                    <button className="btn btn-sm rounded-full  border-1 border-green-500 bg-green-950 text-green-500 shadow-none hidden lg:flex"><TbCategory />Categories</button>
                                    </div>
                </div>

                {
                    session ? (
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                <li><Link href='/'>HOME</Link></li>
                                <li><Link href='/jobs'>JOBS</Link></li>
                            </ul>
                        </div>
                    ) : ""
                }

                <div className="navbar-end">

                    <div className="bg-green-950/70 py-2 px-2  rounded-lg mr-4 hidden md:block">
                        <select defaultValue="Freelancer" className="select w-30 text-white bg-green-800/20  mr-25">
                            <option>Freelancer</option>
                            <option>Recuriter</option>
                        </select>
                    </div>


                    {status === "loading" ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : session ? (
                        <>
                            <span className="hidden md:inline mr-2 text-right">
                                Hi, {session.user.name || session.user.email}
                            </span>
                            {session.user.role === "user" && (
                                <Link href="/userdashboard" className="btn  text-white bg-green-500 rounded-full mr-2 border-0 shadow-none btn-md">
                                    Dashboard
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-md btn-outline rounded-full">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="mr-8 text-green-400 hidden lg:block"
                                onClick={() => router.push("/Login")}
                            >
                                BECOME A SELLER
                            </button>
                            <button
                                className="mr-8"
                                onClick={() => router.push("/Login")}
                            >
                                LOGIN
                            </button>
                            <button
                                className="btn text-white bg-green-500 rounded-full border-0 shadow-none btn-md"
                                onClick={() => router.push("/Register")}
                            >
                                Registration
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}