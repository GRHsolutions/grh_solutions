import React from "react";
import { useLocation } from "react-router-dom"


export interface Item {
    visible: boolean;
    to: string;
    disabled: boolean;
    active: boolean;
    label: string;
    subItems?: Item[]; // Subitems opcionales
}

export interface Returnable {
    items: Item[];
}

export const renderedItems = (): Promise<Returnable> => {
    const local = useLocation();

    React.useEffect(()=> {
        console.log(local);
    }, [local])

    const render = () => {
        switch(local){
            case "home" {
                return 
            }
        }
    }

    return 
}