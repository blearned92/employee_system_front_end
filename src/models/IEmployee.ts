import { IAddress } from "./IAddress"

export interface IEmployee {
    firstName:String,
    lastName:String,
    address: IAddress,
    salary:number,
    id:number
}