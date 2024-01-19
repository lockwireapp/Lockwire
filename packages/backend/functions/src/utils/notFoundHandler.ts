import { Response, Request } from 'express';

export function notFoundHandler(_: Request, res: Response) {
    res.status(404).send({
        message: 'Not Found',
    });
}
