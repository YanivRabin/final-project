import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { _id: string };
}

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).send('No token provided');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user: { _id: string }) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

export default authenticate;
