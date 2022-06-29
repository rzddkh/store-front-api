// @ts-nocheck
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {TOKEN_SECRET} = process.env;

const verifyAuthToken = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    try {

        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET);

        next();
    } catch (err) {
        res.status(401);
        res.send('Invalid Token. Authorization failed!');
    }
}

export default verifyAuthToken;
