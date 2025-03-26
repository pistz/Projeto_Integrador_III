export interface CreateProduct{
    name:string,
    description:string,
    brand_id:number,
    category_id:number
}

export interface Product extends CreateProduct{
    id:number
}