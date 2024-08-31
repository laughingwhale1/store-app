export interface IUser {
    id: number
    name: string
    email: string
}

export type UserLoginRequest = {
    email: string
    password: string
    remember: boolean
}

export interface UserLoginResponse {
    token: string
    user: {
        id: number
        name: string
        email: string
    }
}