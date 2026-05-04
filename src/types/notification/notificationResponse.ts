import { NotificationType } from "@/enums/notificationType";
import { Instant } from "next";


export interface NotificationResponse<T>{
    type:NotificationType;
    payload:T;
    time:string;
}