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
            const value = req.body[name];

            if (required && (value === undefined || value === null || value === '')) {
                errors.push(`El campo ${name} es requerido`);
            } else if (value !== undefined && value !== null && value !== '') {
                if (type === 'date') {
                    // Validar que sea una fecha válida
                    const date = new Date(value);
                    if (isNaN(date.getTime())) {
                        errors.push(`El campo ${name} debe ser una fecha válida`);
                    }
                } else if (typeof value !== type) {
                    errors.push(`El campo ${name} debe ser de tipo ${type}`);
                }
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