"use client"

import { useChatContext } from "@/hooks/useChatContext"
import { getAllNotification } from "@/services/notification/getAllNotification";
import { FriendRequest } from "@/types/notification/friendRequest";
import { NewMessageResponse } from "@/types/notification/newMessage";
import { NotificationResponse } from "@/types/notification/notificationResponse";

import { useEffect, useState } from "react";
import FriendRequestNotifi from "./_components/FriendRequestNotifi";
import { NotificationType } from "@/enums/notificationType";
import { markReadNotifi } from "@/services/notification/markReadNotifi";
import { useNotfiContext } from "@/context/NotificationProvider";
import NotifiEmpty from "./_components/NotifiEmpty";
import FriendResponseNotifi from "./_components/FriendResponseNotifi";
import { deleteNotification } from "@/services/notification/deleteNotification";


export default function NotificationPage(){
    const [notifications,setNotifications] = useState<NotificationResponse<FriendRequest|NewMessageResponse>[]>([]);
    const[flag,setFlag] = useState<boolean>(false);
    const [ownerId,setOwnerId] = useState<number|null>(null);
    const {setUnReadNotifi} = useNotfiContext();
    useEffect(()=>{
        const id = Number(localStorage.getItem("memberId"));
        setOwnerId(id);
    },[]) 


   
    const {notification} = useChatContext();

    useEffect(()=>{
     (async ()=>{
        if(!ownerId) return;
       const notifications =  await getAllNotification(ownerId);
       setNotifications(notifications);
       console.log("ALL NOTIFI: ",notifications)
     })()
    },[ownerId,notification,flag])

  
   useEffect(()=>{
    (async ()=>{
        if(!ownerId) return;
        await markReadNotifi(ownerId);
        // need set un read = 0
        setUnReadNotifi(0);
    })()
   },[ownerId])


   if(notifications.length == 0){
    return <NotifiEmpty/>
   }

   async function onDeleteNotifi(id:number){
    console.log(">>DELETED ID: ",id);
    await deleteNotification(id);
    setFlag(pre =>!pre);
    
   }

    return <div>
    {notifications.map((n)=>{

        if(n.type == NotificationType.REQUEST_FRIEND){
            const payload =  n.payload as FriendRequest;
            return <FriendRequestNotifi id={n.id} key={n.id} senderId={payload.senderId} senderName={payload.senderName} sentTime={n.time} onDelete={onDeleteNotifi}  />
        }
        if(n.type == NotificationType.FRIEND_ACCEPTED){
            const payload = n.payload as FriendRequest;
            return <FriendResponseNotifi key={n.id} id={n.id} onDelete={onDeleteNotifi}  senderId={payload.senderId} senderName={payload.senderName} sentTime={n.time} />
        }
    })}
    
    </div>
}