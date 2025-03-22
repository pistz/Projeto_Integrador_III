import { Divider } from "antd"
import { centerImgStyle, innerDivStyle, mainDivStyle } from "./styles"
import welcome from '../../../assets/logo.png'
import React from "react"

export const NotFound:React.FC = () =>{

    return (
        <>
            <div style={mainDivStyle}>
                <Divider variant='dotted'>Em construção</Divider>
                <div style={innerDivStyle}>
                    <img style={centerImgStyle} src={welcome} alt="Under_construction"/>
                </div>
                <footer style={{marginTop:'1rem'}}>
                    <p>
                    </p>
                </footer>
                
            </div>
            
        </>
    )
}