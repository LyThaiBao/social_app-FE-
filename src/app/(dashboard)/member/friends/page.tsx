import { searchService } from "@/services/member/searchService";
import BoxSearch from "./_components/BoxSearch";
import { cookies } from "next/headers";
import { FriendSearchResponse } from "@/types/friend/friendResponse";
import MemberList from "./_components/MemberList";
import { Suspense } from "react";
import Loading from "./loading";

export default async function FriendPage({searchParams}:{searchParams:Promise<{keyword:string}>}){
    const searPs=  (await searchParams).keyword;
    const cook = await cookies();
    const token = cook.get("accessToken")?.value||"";
  
    const members:FriendSearchResponse  =   await searchService({token:token,keyword:searPs})||[];
  
    return <div>
    
        <BoxSearch/>
        {members&&<Suspense fallback={<Loading/>}><MemberList members={members}/>
        </Suspense>}
    </div>
}