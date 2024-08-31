import {IUser} from "./user.type.ts";

export interface IStoreType {
    user: {
        token: string | null,
        data: IUser
    }
    loading: boolean
}