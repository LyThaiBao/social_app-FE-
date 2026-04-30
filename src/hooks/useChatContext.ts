import { ChatContext } from "@/context/ChatProvider"
import { useContext } from "react"

export const useChatContext = () =>{
    const context = useContext(ChatContext);
    if(!context){
        throw new Error("You must use this hook context within Chat Provider");
    }
    return context;
}