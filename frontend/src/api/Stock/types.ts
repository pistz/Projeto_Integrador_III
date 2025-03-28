export interface ProductMovement {
    product_id:number,
    movement_type:string,
    movement_source:string,
    quantity:number,
    created_by:string,
    observations?:string,
}

export interface Movement extends ProductMovement{
    id:number,
    movement_date:string,
}