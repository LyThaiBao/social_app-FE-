export async function getMessageByConversationId({conversationId}:{conversationId:number}){
    const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/message`
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(conversationId) // dua 1 so len thoi ko phai 1 obj
        })
    }
    catch(err){

    }
}