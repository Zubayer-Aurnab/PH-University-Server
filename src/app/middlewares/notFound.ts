import { Request, Response } from "express";
import HttpStatus from "http-status";

const notFound = (_req: Request, res: Response) => {

    return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: "API not found",
        error: ""

    });
};
export default notFound