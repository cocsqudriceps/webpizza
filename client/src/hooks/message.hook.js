import {useCallback} from "react";
import M from 'materialize-css'
export const useMessage = () => {
    return useCallback((text, color) => {
        if (M && text) {
            M.toast({html: text, classes: color})
        }
    }, [])
}
