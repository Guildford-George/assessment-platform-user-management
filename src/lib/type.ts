import {Request} from "express"
export interface RequestExtend extends Request{
    user: {
        organization_id: string
    }
}
