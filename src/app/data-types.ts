export interface SignUp{
    name:string,
    email:string,
    password:string
}

export interface login{
    email:string,
    password:string
}

export interface product{

    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id?:string,
    quantity:number|undefined,
    productId:string | undefined
}

export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    description:string,
    image:string,
    id?:string,
    quantity:number|undefined,
    userId:string,
    productId:string
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order{
   email:string,
   address:string,
   contact:string,
   userId:string,
   totalPrice:number,
   id:string,
   image:string
 }



