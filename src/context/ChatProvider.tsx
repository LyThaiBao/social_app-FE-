"use client"

import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client"
import { createContext, useEffect, useState } from "react"


export const ChatContext = createContext<Client | null>(null);

export function ChatProvider({children}:{children:React.ReactNode}){
    const [client,setClient] = useState<Client | null>(null);
    
    useEffect(()=>{
        const socket = new SockJS(process.env.NEXT_PUBLIC_WS_URL);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {console.log("STOMP Debug: ",str)},
            onConnect:() => {
                console.log(">>> Connected");
                setClient(stompClient) // Lưu vào state để các page dùng
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

    },[]);

    return <ChatContext.Provider value={client}>
        {children}
    </ChatContext.Provider>
}
