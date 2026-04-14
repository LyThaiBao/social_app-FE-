import MemberProfile from "./_components/MemberProfile";

export default function ProfileMember(){
    const profileData = {
    "id": 1,
    "fullName": "Ly Thai Bao",
    "birthDay": "2006-09-01"
};
    return <div>
        <MemberProfile data={profileData}/>
    </div>
}