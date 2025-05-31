import { NextFunction, Request, Response } from "express";

type SchemaValues = {
    name: string;
    required?: boolean;
    type?: string
    [key: string]: any;
}

type Parameters = {
    schema: SchemaValues[]
}

export const validationSchemaHandler = ({
    schema
}: Parameters) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = [];

        schema.forEach((item) => {
            const { name, required = true, type = 'string' } = item;

            if (required && !req.body[name]) {
                errors.push(`El campo ${name} es requerido`);
            } else if (req.body[name] && typeof req.body[name] !== type) {
                errors.push(`El campo ${name} debe ser de tipo ${type}`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Errores de validación',
                errors
            });
        }

        next();
    };
}