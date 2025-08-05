import 'express';

// @TODO: Define user structure more strictly

declare module 'express' {
    interface Request {
        user?: any
    }
}