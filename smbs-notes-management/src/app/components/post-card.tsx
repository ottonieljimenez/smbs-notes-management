'use client'

import Link from "next/link";
import { useState } from "react";

import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";

export default function PostCard({
    userFullName,
    userName,
    avatarUrl,
    content
}: {
    userFullName: string
    userName: string
    avatarUrl: string
    content: string
}) {
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <Card className="shadow-none bg-transparent hover:bg-slate-800 transition border-b rounder-none cursor-pointer border-white/20">
            <CardHeader className="justify-between">
                <div className="flex gap-x-2">
                    <Link href={`/${userName}`}>
                        <Avatar radius="full" size="md" src={avatarUrl} />
                    </Link>
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
                        <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-5 py-5 text-xs text-white">
                <p>
                    {content}
                </p>
            </CardBody>
        </Card>
    );
}
