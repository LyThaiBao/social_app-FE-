import { NotificationType } from "@/enums/notificationType";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface NotificationResponse<T>{
    type:NotificationType;
    payload:T;
    timestamp:Timestamp;
}