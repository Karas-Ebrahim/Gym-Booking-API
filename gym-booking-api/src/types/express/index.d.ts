import { IUser } from "../../models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: IUser["role"];
            };
        }
    }
}

export {};