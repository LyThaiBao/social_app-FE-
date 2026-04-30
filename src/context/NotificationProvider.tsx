"use client"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useChatContext } from "@/hooks/useChatContext";

interface props{
    not:()=>void;
} 

const Notification = createContext<props|null>(null);
export function NotificationProvider({children}:{children:React.ReactNode}){

    const {client} = useChatContext();

   
        const not = ()=>{
            if(!client?.connected) return "chua connect" ;
            console.log("PREPARE NOTIFICATION >>> ");
            const sub = client.subscribe(`/queue/notification`,(msg) => {
            console.log("NOTIFICATION >>> ",msg);
            const content = JSON.parse(msg.body);
            return content;
        })
        }

    return <Notification.Provider value={{not}}>{children}</Notification.Provider>
}