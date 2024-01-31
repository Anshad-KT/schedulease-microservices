import { Request, Response, NextFunction } from 'express';
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract serializeErrors(): {
        message: string;
        field?: string; 
    }[];
}
export declare const errorHandler: (err: CustomError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;