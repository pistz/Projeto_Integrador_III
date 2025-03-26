export interface Product{
    name:string,
    description:string,
    brand_id:number,
    category_id:number
}

export interface ProductId extends Product{
    id:number
}