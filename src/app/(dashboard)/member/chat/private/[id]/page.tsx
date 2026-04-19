import HeaderChat from "../_components/HeaderChat";

export default async function ChatWithMemberPage({params}:{params:Promise<{id:string}>}){
    const p = (await params).id;

    
    return <div>
        <HeaderChat partnerName="Ly Thai Bao"/>
        <h3 className="text-red-400">{p}</h3>
         </div>
}