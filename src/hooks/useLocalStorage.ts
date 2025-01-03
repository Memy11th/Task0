import React from "react";

export const useLocalStorage = <T>(key:string,initialValue:T)=>{
        const [value,setValue]= React.useState<T>(()=>{
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue
            } catch (err) {
                console.log(err);
                return initialValue
            };
        });

        React.useEffect(()=>{
            try {
                window.localStorage.setItem(key,JSON.stringify(value));
            } catch (err) {
                console.log(err);
            }
        },[value,key]);

        return [value,setValue] as const;
}