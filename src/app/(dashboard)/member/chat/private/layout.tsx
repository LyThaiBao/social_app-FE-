"use client"
import { ChatContext } from "@/context/ChatProvider";
import { ChatType, SchemaChat } from "@/types/conversation/schemaChat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";      
import { ChangeEvent, useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {Send} from "lucide-react"
import { ChatEnum } from "@/enums/chatEnum";
import { uploadFile } from "@/services/upload/uploadFile";
import { toast } from "sonner";
import { UploadResponse } from "@/types/upload/uploadResponse";
export default function PrivateChatPage({ children }: { children: React.ReactNode}) {


  return (
    <div className="flex flex-col h-full bg-gray-50 "> 
      <main className="flex-1  p-4">
        {children}
      </main>

     
    </div>
  );
}