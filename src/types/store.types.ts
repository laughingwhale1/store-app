import {IUser} from "./user.type.ts";
import {ProductArrayType} from "./product.type.ts";

export interface IStoreType {
    user: {
        token: string | null,
        data: IUser,
    }
    loading: boolean
    products: {
        data: Array<ProductArrayType>
        totalCount: number
    },
}