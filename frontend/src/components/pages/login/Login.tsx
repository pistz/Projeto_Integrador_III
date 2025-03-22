import { Button, Form, FormProps, Input } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { Container } from './style'
import image from '../../../assets/logo.png'
import { login } from '../../../config/loadApi'


type Login = {
    email:string,
    password:string
}

export const Home:React.FC = () => {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);


    const clearForm =()=>{
        form.resetFields()
    }

//TODO - fazer lógica de login
    const onFinish:FormProps['onFinish']  = async(data:Login) =>{
        setLoading(true)
        console.log(data);
        const token = await login(data)
        console.log('Token recebido: ', token)
        clearForm()
        setLoading(false)
    }


    return (
        <Container backgroundImage={image}>
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
                    rules={[{ required: true, message:"E-mail é um campo obrigatório" },{pattern:emailPattern, message:"e-mail inválido"}]}>
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