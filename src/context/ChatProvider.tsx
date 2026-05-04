"use client"

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client"
import { createContext, useCallback, useState } from "react"
import { NotificationResponse } from "@/types/notification/notificationResponse";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationType } from "@/enums/notificationType";
import { FriendRequest } from "@/types/notification/friendRequest";


interface ChatContextType{
    client:Client | null;
    activateChat: () => void;
    deactivateChat: () => void;
    unRead:Record<string,boolean>;
    markAsRead:(id:number|string)=>void;
    //-----Friend request-----
    friendRequest:NotificationResponse<FriendRequest>|null;
    notification:number;

}
export const ChatContext = createContext< ChatContextType | null>(null);

export function ChatProvider({children}:{children:React.ReactNode}){
    const [client,setClient] = useState<Client | null>(null);
    const [unRead,setUnRead] = useState<Record<string,boolean>>({});
    const [friendRequest,setFriendRequest] = useState<NotificationResponse<FriendRequest>|null>(null);
    const [notification,setNotification] = useState<number>(0);
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
                    const body = JSON.parse(msg.body); // body: <type:<friend request | like ,...>, payload ,timeStamp: time happened notifi>
                    switch(body.type){
                        case NotificationType.NEW_MESSAGE:
                            const newMsg:NotificationResponse<NewMessageResponse> = body;
                            setUnRead(pre => ({
                                ...pre,
                                [newMsg.payload.conversationId]: true
                            }))
                        break;

                         case NotificationType.REQUEST_FRIEND:
                            setNotification(pre => pre+1);
                            const friendRequest:NotificationResponse<FriendRequest> =  body;
                            setFriendRequest(friendRequest); // save and give for consummer compo  
                            console.log(">>> FRIEND REQUEST: ",body)
                         break;
                    }
                    // console.log("NOTIFICATION >>> ",body)
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

    const markAsRead = (id:number|string)=>{
        setUnRead(pre => ({...pre,[id]:false}))
    }

    const sawNotifi = () =>{
        setNotification(0);
    }

    return <ChatContext.Provider value={{client,activateChat,deactivateChat,unRead,markAsRead,friendRequest,notification}}>
            {children}
    </ChatContext.Provider>
}
