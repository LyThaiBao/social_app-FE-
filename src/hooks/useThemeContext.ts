import ThemeProvider, { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

export function useThemeContext(){

    const theme = useContext(ThemeContext);

    return {theme};
}