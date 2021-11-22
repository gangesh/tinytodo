import db from '$lib/db';
import jwt from 'jsonwebtoken';

export const get = async request => {
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }

    let lists = await db('lists').where('userId', token.id);
    if (lists.length === 0) { return {body: []} }

    for (let i = 0; i < lists.length; i++) {
        lists[i] = {
            id: lists[i].id,
            name: lists[i].name,
            items: await db('items').where('listId', lists[i].id)
        }
    }

    return {
        body: lists
    }
}

export const post = async request => {
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    
    request.body.userId = token.id;
    let item = await db('lists').insert(request.body);

    return {
        body: item
    }
}