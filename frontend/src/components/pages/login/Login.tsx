import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, FormProps, Input } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { Container } from './style'
import image from '../../../assets/logo.png'

import { Login } from '../../../api/Login/Login'
import { notifyError } from '../../shared/notify/notify'
import { useAuth } from '../../../context/useAuthContext'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { getTokenId } from '../../../config/token'


type LoginType = {
    email:string,
    password:string
}

export const LoginScreen:React.FC = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate:NavigateFunction = useNavigate();
    
    const handleNavigateHome = useCallback(() =>{
        navigate('/app/home');
    },[navigate]);

    const tokenId = getTokenId();

    const {setSigned, setToken} = useAuth();

    const clearForm =()=>{
        form.resetFields();
    }

    const onFinish:FormProps['onFinish']  = async(data:LoginType) =>{
        setLoading(true)
        try {
            const {token} = await Login.login(data)
            sessionStorage.setItem(tokenId,token);
            setToken(token);
            handleNavigateHome();
            clearForm();
        } catch (error) {
            notifyError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        const logged = sessionStorage.getItem(tokenId)?.toString();
        if(logged){
            setSigned(true)
            handleNavigateHome();
        }
    },[setSigned,tokenId,handleNavigateHome])


    return (
        <Container $bgImage={image}>
            <h1 style={{fontWeight:700, fontSize:'5rem', color:"#fff"}}>Repono</h1>
            <h3 style={{color:'#cabbbb'}}>Acesso ao sistema</h3>
            <Form
                form={form}
                onFinish={onFinish}
                style={{background: 'transparent'}}
                layout='vertical'
                initialValues={{remember:false}}
                autoComplete='off'
                clearOnDestroy={true}
            >
                <label style={{color:'#FFF'}}>E-mail</label>
                <Form.Item name={['email']}
                    rules={[{ required: true, message:"E-mail é um campo obrigatório" },
                    {
                        pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                        message:"e-mail inválido"}]}>
                <Input style={{fontWeight:'bold', width:'15rem'}}/>
                </Form.Item>

                <label style={{color:'#FFF'}}>Senha</label>
                <Form.Item name={['password']}>
                <Input style={{fontWeight:'bold', width:'15rem'}} type='password'/>
                </Form.Item>
                <Button type='primary' htmlType='submit' style={{marginRight:'4rem', marginBottom:'3rem'}} loading={loading}>Entrar</Button> 
            </Form>
            <Footer 
                style={{backgroundColor:'transparent', color:'#fff', padding:'5.9rem 0 0 0'}}>
                    Projeto Integrador - Univesp {new Date().getFullYear()}
            </Footer>
        </Container>
    )
}