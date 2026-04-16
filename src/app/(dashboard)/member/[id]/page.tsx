import { getMemberById } from "@/services/member/getMemberById";
import MemberProfile from "./_components/MemberProfile";
import { cookies } from "next/headers";
import { getMe } from "@/services/me/getMeService";

export default async function ProfileMember({params}:{params:Promise<{id:string}>}){
  
    const cook = cookies();
    const token = (await cook).get("accessToken")?.value||"";
    const id = (await params).id;
    const [memberInfo,meInfo] = await Promise.all([getMemberById({token:token,id:id}),getMe({token})]);
    console.log("ME >>>",meInfo)
    return <div>
        <MemberProfile data={memberInfo} />
    </div>
}