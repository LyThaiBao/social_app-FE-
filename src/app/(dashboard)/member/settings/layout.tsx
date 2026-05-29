import HeaderSetting from "./_components/HeaderSetting";

export default function SettingLayout({children}:{children:React.ReactNode}){

    return <div>
        <HeaderSetting/>
        {children}
    </div>
}