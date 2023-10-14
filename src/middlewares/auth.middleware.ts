import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('authorization');
    // Check if token is missing
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied' });
    }

    const decoded = jwt.verify(
      token?.split(' ')[1],
      'some-secret-encrypeted',
    ) as JwtPayload;

    // req.user = decoded.userId; // change this in future or create custom.d.ts and pass it in tsconfig
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
}
