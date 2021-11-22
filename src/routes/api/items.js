import db from '$lib/db';
import jwt from 'jsonwebtoken';

export const post = async request => {
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    
    let item = await db('items').insert(request.body);

    return {
        body: item
    }
}