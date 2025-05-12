'use client';

import Link from "next/link";
import {cn} from "../../../lib/utils";
import {usePathname} from "next/navigation";
import { navItems } from "./UserNav";


export function DashboardNav() {
    const pathname = usePathname();



    console.log(pathname);

    return (
       <nav className= "grid items-start gap-2">
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
       </nav>
    )
}