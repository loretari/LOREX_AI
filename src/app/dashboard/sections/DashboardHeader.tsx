"use client";

import { Button, ButtonProps } from '../../../components/Buttons';
import {useState} from "react";
import { Orbit } from "../../../components/Orbit";
import { twMerge } from 'tailwind-merge';
import {Logo} from "../../../components/Logo";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import UserNav from "../components/UserNav";
import {CreditCard, DoorClosed, Home, Settings} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "../../../lib/utils";
import {KindeUser} from "@kinde-oss/kinde-auth-nextjs";



type NavItem = {
    name: string;
    href: string;
};

type LoginItem = NavItem & {
    buttonVariant: ButtonProps["variant"];
}


export const navItems:  NavItem[] = [
    {
        name: "Home",
        href: "/dashboard",
        icon: Home,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
    {
        name: "Page",
        href: "/dashboard/billing",
        icon: CreditCard,
    },


];
// ] satisfies {
//   name: string;
//   href: string;
//   buttonVariant: ButtonProps["variant"];
// }[];

export const loginItems: LoginItem[] = [
    {
        buttonVariant: "tertiary",
        name: "Susisiekite",
        href: "#susisiekite",
    },
    {
        buttonVariant: "primary",
        name: "Išbandykite",
        href: "#išbandykiteDabar",
    },
];

export const DashboardHeader = ({
         isAuthenticated,
         user
        } : {
         isAuthenticated: boolean;
         user: KindeUser | null;
      }) => {
    const pathname = usePathname();


    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    return (
        <>
            <header className= "border-b border-gray-200/20 relative z-40">
                <div className= "container">
                    <div className= "h-18 lg:h-20  flex justify-between items-center ">
                        <Link href= "/">
                        <div className= "flex gap-4 items-center cursor-pointer">
                            {/*<Image src= {logo} />*/}
                            <Logo />
                            <div className= "font-extrabold text-2xl hover:text-purple-500 hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.5)] transition-all duration-300">LorexAI</div>
                        </div>
                        </Link>
                        {/*<div className= "h-full hidden lg:block">*/}
                            {/*<nav className= "h-full">*/}
                            {/*    {navItems.map(({ name, href }) => (*/}
                            {/*        <a*/}
                            {/*            href={href}*/}
                            {/*            key={name}*/}
                            {/*            className= "h-full px-8 relative font-bold text-xs tracking-widest whitespace-nowrap text-gray-400 uppercase inline-flex items-center before:content-[''] before:absolute before:bottom-0 before:h-2 before:w-px before:bg-gray-200/20 before:left-0  last:after:absolute last:after:bottom-0 last:after:h-2 last:after:w-px last:after:bg-gray-200/20 last:after:right-0 "*/}
                            {/*            onClick={(e) => {*/}
                            {/*                e.preventDefault();*/}
                            {/*                const element = document.querySelector(href);*/}
                            {/*                if (element) {*/}
                            {/*                    setIsMobileNavOpen(false);*/}
                            {/*                    element.scrollIntoView({ behavior: 'smooth' });*/}
                            {/*                }*/}
                            {/*            }}*/}
                            {/*        >*/}
                            {/*            {name}*/}
                            {/*        </a>*/}
                            {/*    ))}*/}
                            {/*</nav>*/}
                        {/*</div>*/}
                        <div className= "hidden lg:flex gap-4">
                            <UserNav
                                email={user?.email as string}
                                name={user?.give_name as string}
                                image={user?.picture as string}
                            />
                            {isAuthenticated ? (
                                <LogoutLink><Button variant= "primary">Atsijungti</Button></LogoutLink>

                            ) : (
                                loginItems.map(({ buttonVariant, name }) => (
                                    <LoginLink key={name}>
                                        <Button variant={buttonVariant}>{name}</Button>
                                    </LoginLink>
                                )),
                                    loginItems.map(({ buttonVariant, name }) => (
                                        <RegisterLink key={name}>
                                            <Button variant={buttonVariant}>{name}</Button>
                                        </RegisterLink>

                                    ))
                            )}


                            {/*))}*/}
                        </div>
                        <div className= "flex items-center lg:hidden">

                            <button className= "size-10 rounded-lg border-2 border-transparent [background:linear-gradient(var(--color-gray-950),var(--color-gray-950))_content-box,conic-gradient(from_45deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400))] _border-box] relative"
                                    onClick={() => setIsMobileNavOpen((curr) => !curr)}>
                                <div className= "absolute top-1/2 left-1/2 -translate-x-1/2
       -translate-y-1/2 flex flex-col items-center justify-center gap-1">
                                    <div className= {twMerge(
                                        "w-5 h-0.5 bg-gray-100 transform transition duration-300 origin-center",
                                        isMobileNavOpen && "rotate-45 translate-y-0.5 "
                                    )}
                                    ></div>

                                    <div className={twMerge(
                                        "w-5 h-0.5 bg-gray-100 transform transition duration-300 origin-center",
                                        isMobileNavOpen && "-translate-y-0.5 -rotate-45"
                                    )}
                                    ></div>
                                </div>

                            </button>

                        </div>
                    </div>
                </div>
            </header>
            {isMobileNavOpen && (

                <div className= "fixed top-18 left-0 bottom-0 right-0 bg-gray-950 z-30 overflow-hidden">
                    <div className= "absolute-center isolate -z-10">
                        <Orbit />
                    </div>
                    <div className= "absolute-center isolate -z-10">
                        <Orbit className= "size-[350px]"/>
                    </div>
                    <div className= "absolute-center isolate -z-10">
                        <Orbit className= "size-[500px]"/>
                    </div>
                    <div className= "absolute-center isolate -z-10">
                        <Orbit className= "size-[650px]"/>
                    </div>
                    <div className= "absolute-center isolate -z-10">
                        <Orbit className= "size-[800px]"/>
                    </div>
                    <div className= "container h-full">
                        <nav className= "flex flex-col items-center gap-4 py-8 h-full justify-center">
                            {/*{navItems.map(({name, href}) => (*/}
                            {/*    <a*/}
                            {/*        href= {href}*/}
                            {/*        key= {name}*/}
                            {/*        className= "text-gray-400 uppercase tracking-widest font-bold text-xs h-12"*/}
                            {/*        onClick={(e) => {*/}
                            {/*            e.preventDefault();*/}
                            {/*            const element = document.querySelector(href);*/}
                            {/*            if (element) {*/}
                            {/*                setIsMobileNavOpen(false);*/}
                            {/*                element.scrollIntoView({ behavior: 'smooth' });*/}
                            {/*            }*/}
                            {/*        }}*/}
                            {/*    >{name}</a>*/}
                            {/*))}*/}


                        {/*</nav>*/}
                            {navItems.map((item, index) => (
                                <Link key={index} href={item.href}>

                   <span className={cn(
                       "group flex items-center rounded-md px-3 py-2 text-m font-medium hover:bg-popover-foreground hover:text-chart-3",
                       pathname === item.href ? "bg-popover-foreground" : "bg"
                   )}
                   >
                       <item.icon className= "mr-2 h-4 w-4 text-chart-3" />
                       <span>{item.name}</span>
                   </span>

                                </Link>
                            ))}
                        <UserNav/>
                            <LogoutLink>
                                Logout {""}
                                <span>
                <DoorClosed className= "w-4 h-4"/>
            </span>
                            </LogoutLink>
                        {/*{isAuthenticated ? (*/}
                        {/*       */}
                        {/*    <LogoutLink><Button variant= "primary">Atsijungti</Button></LogoutLink>*/}
                        {/*) : (*/}
                        {/*    loginItems.map(({ buttonVariant, name }) => (*/}
                        {/*        <LoginLink key={name} className= "w-full max-w-xs">>*/}
                        {/*            <Button block variant={buttonVariant}>{name}</Button>*/}
                        {/*        </LoginLink>*/}
                        {/*    )),*/}
                        {/*        loginItems.map(({ buttonVariant, name }) => (*/}
                        {/*            <RegisterLink key={name} className= "w-full max-w-xs">*/}
                        {/*                <Button block variant={buttonVariant}>{name}</Button>*/}
                        {/*            </RegisterLink>*/}

                        {/*        ))*/}
                        {/*)}*/}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardHeader;
