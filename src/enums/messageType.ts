export enum MessageType{
    TEXT,
    IMAGE,
    VIDEO,
    FILE,
    NOTIFICATION,// use for notification like: member A just left group (content == null)
    RECALLED 
}   