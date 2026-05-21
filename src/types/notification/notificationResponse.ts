import { NotificationType } from "@/enums/notificationType";


export interface NotificationResponse<T>{
    id:number;
    type:NotificationType;
    payload:T;
    time:string;
}