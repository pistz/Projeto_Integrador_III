import React, { useState } from 'react'
import { 
    ScheduleOutlined, 
    CalendarOutlined, 
    FileSearchOutlined, 
    GoldOutlined, 
    ProjectOutlined } from '@ant-design/icons'
import { Button, Divider, Flex } from 'antd'
import { Modal } from '../../../shared/modal/Modal'
import { GetAllMovements } from './getAllMovements'
import { ButtonContent } from './types'
import { GetSingleDateMovement } from './getSingleDateMovement'
import { GetDateRangeMovement } from './getDateRangeMovement'
import { GetCurrentStockByProductId } from './getCurrentStockByProductId'
import { GetCurrentStock } from './getCurrentStock'


export const Reports:React.FC = () => {
    
    const movementButtonStyles:React.CSSProperties ={
        alignContent:'center',
        justifyContent:"stretch",
        fontWeight:'bolder', 
        color:'#496989'
    }

    const currentStockButtonStyles:React.CSSProperties ={
        alignContent:'center',
        justifyContent:"stretch",
        fontWeight:'bolder', 
        color:'#074173'
    }

    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [key, setKey] = useState(1);

    const showModal = (content: React.ReactNode) => {
        setModalContent(content);
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
      };

      const handleOnClick = (type:string) =>{
        const content = stockActivityButtons.map(value => value.type == type ? value.content : null)
        setKey((value) => value + 1)
        return showModal(content)
    }

    const stockActivityButtons:ButtonContent[] = [
        {
            type:'getAllMovements',
            content:<GetAllMovements />
        },
        {
            type:'getSingleDateMovement',
            content:<GetSingleDateMovement />
        },
        {
            type:'getDateRangeMovement',
            content:<GetDateRangeMovement />
        },
        {
            type:'getCurrentStockByProductId',
            content:<GetCurrentStockByProductId />
        },
        {
            type:'getCurrentStock',
            content:<GetCurrentStock />
        },
    ]

  return (

    <>
        <Divider orientation='left'style={{color:'#a19ba1'}}>Estoque Atual</Divider>
            <Flex align='stretch' justify='space-around' vertical gap={15}>

                <Button htmlType='button' type='text' icon={<FileSearchOutlined />} onClick={() => handleOnClick("getCurrentStockByProductId")}
                style={currentStockButtonStyles}>
                    Estoque por Produto
                </Button>

                <Button htmlType='button' type='text' icon={<GoldOutlined />} onClick={() => handleOnClick("getCurrentStock")}
                style={currentStockButtonStyles}>
                    Estoque Total Atual
                </Button>


            </Flex>

        <Divider orientation='left' style={{color:'#a19ba1'}}>Movimentações de Produtos</Divider>
            <Flex align='stretch' justify='space-around' vertical gap={15}>

                <Button htmlType='button' type='text' icon={<ProjectOutlined />} onClick={() => handleOnClick("getAllMovements")} 
                    style={movementButtonStyles} >
                    Todas
                </Button>

                <Button htmlType='button' type='text' icon={<ScheduleOutlined />} onClick={() => handleOnClick("getSingleDateMovement")}
                    style={movementButtonStyles}>
                    Por dia
                </Button>

                <Button htmlType='button' type='text' icon={<CalendarOutlined />} onClick={() => handleOnClick("getDateRangeMovement")}
                    style={movementButtonStyles}>
                    Entre datas
                </Button>

            </Flex>

        <Modal open={isModalOpen} onCancel={closeModal} modalContent={modalContent} key={key} width={1500}/>
    </>
  )
}
