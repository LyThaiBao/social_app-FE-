export default async function ChatWithMemberPage({params}:{params:Promise<{id:string}>}){
    const p = (await params).id;
    return <div>Chat Direct with Member {p} here </div>
}