import { Request, Response, NextFunction } from 'express';
import { APIError } from '../config/error';

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {

    // Default status code & message
    let status = 500
    let message = 'Internal Server Error'

    if (error instanceof APIError) {
        status = error.statusCode
        message = error.message
    } 
    
    // Fallback to built in Error
    else if (error instanceof Error) {
        message = error.message
    }

    res.status(status).json({error: message})
}