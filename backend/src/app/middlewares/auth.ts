import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';
import HttpStatus from 'http-status-codes';

interface userRequest extends Request {
    userId: string;
};

//This middleware won't allow any request that use him if token is invalid, token will be checked before every request made
const authMiddleware = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        //Get Header from request
        const authHeader = <string>req.headers.authorization;

        //If there's none, there's no token provided
        if (!authHeader)
            return res.status(HttpStatus.FORBIDDEN).send({ message: 'Token não encontrado' });

        //Split header due to "Bearer " that comes before the actual token
        const parts = authHeader.split(' ');

        const [scheme, token] = parts;

        //Check if Bearer is correctly formatted
        if (!/^Bearer$/i.test(scheme))
            return res.status(HttpStatus.FORBIDDEN).send({ message: 'Header mal formatado' });

        //Compares both tokens, if equal, allow the request to keep going
        jwt.verify(token, authConfig.secret, async (err, decoded: any) => {
            if (err) {
                return res.status(HttpStatus.FORBIDDEN).send({ message: 'Token Inválido' });
            }

            req.userId = decoded.id;
            return next();
        });
    } catch (error) {
        if (error.code == 10000)
            return res.status(HttpStatus.BAD_REQUEST).send({ message: error.name });
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Erro ao verificar token' });
    }
};

export default authMiddleware;
