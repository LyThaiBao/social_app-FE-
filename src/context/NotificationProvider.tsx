"use client"
import React, { useContext, useEffect } from "react";
import { ChatContext } from "./ChatProvider";


export function NotificationProvider({children}:{children:React.ReactNode}){
    const client = useContext(ChatContext);

    useEffect(()=>{
        if(!client?.connected) return ;
        const sub = client.subscribe(`user/queue/notificationa`,(msg) => {
            console.log("MES >>> ",msg);
        })
        return () => sub.unsubscribe();
    },[client])

    return <>{children}</>
}