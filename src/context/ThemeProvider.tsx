import { createContext, useCallback, useEffect, useRef, useState } from "react"



type Theme = "dark"|"light";
interface ThemeProviderType{
    theme:Theme;
    setTheme:(theme: Theme) => void;
}
export const ThemeContext = createContext<ThemeProviderType|null>(null)
export default function ThemeProvider({children}:{children:React.ReactNode}){
   const [theme,setMode] = useState<Theme>(()=>{
    const local =  localStorage.getItem("theme") as Theme;
    if(local){
        return local;
    }
    return "light"
   });

    const setTheme = useCallback((theme:Theme)=>{
        setMode(theme)
        localStorage.setItem("theme",theme);
    },[])
   
    useEffect(()=>{
        const root = window.document.documentElement;
        if(theme == "dark"){
            root.classList.add("dark")
        }
        if(theme == "light"){

            root.classList.remove("dark");
        }
        
    },[theme])

    return <ThemeContext.Provider value={{theme,setTheme}}>
        {children}
    </ThemeContext.Provider>
}

