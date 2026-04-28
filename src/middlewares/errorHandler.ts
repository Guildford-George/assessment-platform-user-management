import { NextFunction, Request, Response } from "express";
import HttpException, { HttpStatus } from "../lib/exception/httpException";

class ErrorHandler {
    async handle(error: unknown, req: Request, res: Response, next: NextFunction) {
        try {
            if (error instanceof HttpException && error.isOperational === true) {
                return res.status(error.statusCode).json({
                    success: false,
                    data: {
                        message: error.message
                    }
                })

            }

            // report unknuown and uncaught error 
            await this.reportErrorToDeveloper(error as Error, req)

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                data: {
                    message: "Something went wrong"
                }
            })
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                data: { message: "Something went wrong" }
            })
        }
    }

    async reportErrorToDeveloper(error: Error, req: Request) {
        const errorReport = {
            message: error.message,
            stack: error.stack,
            path: req.originalUrl,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers,
            timestamp: new Date().toISOString(),
        };

        return
    }
}

export default ErrorHandler