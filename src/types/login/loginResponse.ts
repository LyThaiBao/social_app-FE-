

export interface LoginResponse{
    memberId:number;
    accessToken:string;
    refreshToken:string;
    fullName:string;
    roles:string[];
}