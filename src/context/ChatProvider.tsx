"use client"

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client"
import { createContext, useCallback, useState } from "react"
import { NotificationProvider } from "./NotificationProvider";
import { MessageResponse } from "@/types/message/messageResponse";


interface ChatContextType{
    client:Client | null;
    activateChat: () => void;
    deactivateChat: () => void;
}
export const ChatContext = createContext< ChatContextType | null>(null);

export function ChatProvider({children}:{children:React.ReactNode}){
    const [client,setClient] = useState<Client | null>(null);
    const [unRead,setUnRead] = useState<Record<string,number>[]|null>(null);
    //-------------Hand shake-------------
    const  activateChat = useCallback(() => {
        const socket = new SockJS(process.env.NEXT_PUBLIC_WS_URL); // anten 
        const stompClient = new Client({
            webSocketFactory: () => socket, // cam anten vao
            debug: (str) => {console.log("STOMP Debug: ",str)},
            onConnect:() => {
                console.log(">>> Connected");
                setClient(stompClient) // Lưu vào state để các page dùng

                stompClient.subscribe(`/queue/notification`,(msg) => {
                    const body:MessageResponse = JSON.parse(msg.body);
                    
                console.log("NOTIFICATION >>> ",body)
                })
            },
            onDisconnect: () => {
                console.log(">>> Disconnected");
                setClient(null);
            },
            onStompError: (frame) => {
                console.error("Error: ",frame.headers['message']);
            }
        });
        //Kích hoạt kết nối
        stompClient.activate(); 

        //Cleanup: Khi component này bị "hủy"
        return () => {
            stompClient.deactivate();
        };

    },[client])

    const deactivateChat = useCallback(()=>{
        if(client){
            client.deactivate();
            setClient(null);
        }
    },[client])

    // const marskRead = ()=>{
        
    // }

    return <ChatContext.Provider value={{client,activateChat,deactivateChat}}>
            {children}
    </ChatContext.Provider>
}
