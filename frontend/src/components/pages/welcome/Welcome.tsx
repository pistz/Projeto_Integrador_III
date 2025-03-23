import { Divider } from "antd"
import { centerImgStyle, innerDivStyle, mainDivStyle } from "./styles"
import welcome from '../../../assets/logo.png'
import React, { useCallback, useEffect, useState } from "react"
import { getUserFromToken } from "../../../config/token"
import { notifyError } from "../../shared/notify/notify"

export const Welcome:React.FC = () =>{
    const [userName, setUserName] = useState('');

    const loadUserName = useCallback(async () => {
        try{
            const user = getUserFromToken()!;
            setUserName(user.name);
        }catch(err){
            notifyError(err);
        }
    }, [setUserName]);

    useEffect(() =>{
        loadUserName()
    },[loadUserName])

    return (
        <>
            <div style={mainDivStyle}>
                <Divider variant='dotted'>{`Bem vindo, ${userName}`}</Divider>
                <div style={innerDivStyle}>
                    <img style={centerImgStyle} src={welcome} alt="welcome"/>
                </div>
                <footer style={{marginTop:'1rem'}}>
                    <p>
                    </p>
                </footer>
                
            </div>
            
        </>
    )
}