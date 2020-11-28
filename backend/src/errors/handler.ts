import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors{
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, resp, next) => {
    if (err instanceof ValidationError){
        let errors: ValidationErrors = {};

        err.inner.forEach(e => {
            errors[e.path] = e.errors;
        });

        return resp.status(400).json({ message: 'Validation fails', errors });
    }

    console.error(err);

    return resp.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;