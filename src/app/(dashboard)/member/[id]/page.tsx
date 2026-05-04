import { getMemberById } from "@/services/member/getMemberById";
import MemberProfile from "./_components/MemberProfile";
import { cookies } from "next/headers";
import { getMe } from "@/services/me/getMeService";
import { getByBothId } from "@/services/friendShip/getBothId";

export default async function ProfileMember({params}:{params:Promise<{id:string}>}){
    const cook = cookies();
    const token = (await cook).get("accessToken")?.value||"";
    const id = (await params).id;
    const [memberInfo,meInfo] = await Promise.all([getMemberById({token:token,id:Number(id)}),getMe({token})]);
    const friendship = await getByBothId({token:token,request:{requesterId:meInfo.memberId,addresserId:Number(id)}});
    return <div>
        <MemberProfile data={memberInfo} me={meInfo} friendship={friendship}/>
    </div>
}