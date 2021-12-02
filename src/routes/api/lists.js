import db from '$lib/db';
import jwt from 'jsonwebtoken';
import { isDueNow, isDueSoon, isOverdue } from '../../lib/days';

export const get = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    // Perform the action
    let lists = await db('lists').where('userId', token.id);
    if (lists.length === 0) { return {body: []} }
    for (let i = 0; i < lists.length; i++) {
        const items = await db('items').where('listId', lists[i].id);
        lists[i] = {
            id: lists[i].id,
            name: lists[i].name,
            order: lists[i].order,
            items: {
                ALL: items,
                TODO: items.filter(i => i.status === 'TODO'),
                NOW: items.filter(i => isDueNow(i)),
                SOON: items.filter(i => isDueSoon(i)),
                OVERDUE: items.filter(i => isOverdue(i)),
                DONE: items.filter(i => i.status === 'DONE'),
            }
        }
    }
    // Return
    return {
        body: lists
    }
}

export const post = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    // Perform the action
    request.body.userId = token.id;
    let item = await db('lists').insert(request.body);
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
    let list = await db('lists').where('id', request.body.id);
    if (!list || list.length !== 1) { return {status: 412} }
    const payload = Object.assign(list[0], request.body);
    let newList = await db('lists').where('id', request.body.id).update(payload);
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
    let items = await db('items').where('listId', request.body.id).del()
    let list = await db('lists').where('id', request.body.id).del()
    // Return
    return {
        body: {status: 'success'}
    }
}