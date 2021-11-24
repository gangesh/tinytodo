import db from '$lib/db';
import jwt from 'jsonwebtoken';

export const post = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    // Perform the action
    let item = await db('items').insert(request.body);
    // Return
    return {
        body: item
    }
}

export const put = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    if (!request.body.id) { return {status: 400}  }
    // Perform the action
    let item = await db('items').where('id', request.body.id);
    if (!item || item.length !== 1) { return {status: 412} }
    const payload = Object.assign(item[0], request.body);
    let newItem = await db('items').where('id', request.body.id).update(payload);
    // Return
    return {
        body: payload
    }
}

export const del = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    if (!request.body.id) { return {status: 400}  }
    // Perform the action
    let item = await db('items').where('id', request.body.id).del()
    // Return
    return {
        body: {status: 'success'}
    }
}