'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';

import {Button} from "@/components/ui/button";

const links = [
    {
        href: "/user/list",
        label: "Users"
    },
    {
        href: "/role/list",
        label: "Roles"
    },
    {
        href: "/tag/list",
        label: "Tags"
    },
    {
        href: "/post/list",
        label: "Posts"
    }
]

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="p-4">
            <div className="flex align-center max-w-6xl gap-2 mx-auto">
                {links.map(({href, label}) => {
                    const classes = pathname === href ? "bg-gray-100" : "";

                    return <Button key={href} className={classes} variant="ghost" asChild>
                        <Link href={href}>{label}</Link>
                    </Button>;
                })}
            </div>
        </nav>
    );
}
