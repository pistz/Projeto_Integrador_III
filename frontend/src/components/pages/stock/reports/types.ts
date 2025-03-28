export interface ButtonContent{
    type:string,
    content: React.ReactNode
}

export enum MovementSource {
    BUY = "COMPRA",
    DONATION = "DOAÇÃO",
    USE = "USO",
    EXPIRED = "DESCARTE"
}

export enum MovementType {
    IN = 'ENTRADA',
    OUT = 'SAÍDA'
}

export interface Movement {
    id:number,
    product_id:number,
    movement_type:string,
    movement_source:string,
    quantity:number,
    movement_date:string,
    created_by:string,
    observations?:string,
}