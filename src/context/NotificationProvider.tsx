"use client"
import { useChatContext } from "@/hooks/useChatContext";
import { getUnReadNotifi } from "@/services/notification/getUnReadNotifi";
import React, { createContext, useContext, useEffect, useState } from "react";

interface NotifiContextType{
    unReadNotifi:number;
    setUnReadNotifi:React.Dispatch<React.SetStateAction<number>>;
}

const NotifiContext = createContext<NotifiContextType|null>(null);

export function NotificationProvider({children}:{children:React.ReactNode}){
    const [unReadNotifi,setUnReadNotifi] = useState<number>(0);
    const {notification} = useChatContext();
        const [ownerId,setOwnerId] = useState<number|null>(null);
    useEffect(()=>{
        const id = Number(localStorage.getItem("memberId"));
        setOwnerId(id);
    },[]) 

    useEffect(()=>{
        (async ()=>{
            if(!ownerId) return;
            const count = await getUnReadNotifi(ownerId);
            setUnReadNotifi(count);
        })()
    },[notification,ownerId])
   

    return <NotifiContext.Provider value={{unReadNotifi,setUnReadNotifi}}>
        {children}
    </NotifiContext.Provider>

}

export const useNotfiContext = () =>{
    const a = useContext(NotifiContext);
    if(!a){
        throw new Error("U r use this hook out of NotificationProvider");
    }
    return a;
}