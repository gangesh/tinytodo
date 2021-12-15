import db from '$lib/db';
import jwt from 'jsonwebtoken';
import { isDueNow, isDueSoon, isOverdue } from '../../lib/days';

const mapGuests = async (guests) => {
    for (let i = 0; i < guests.length; i++) {
        const user = await db('users').where('id', guests[i].userId);
        guests[i] = { id: user[0].id, email: user[0].email, role: guests[i].role };
    }
    return guests;
}

const mapList = async (list) => {
    const items = await db('items').where('listId', list.id);
    const owner = await db('users').where('id', list.userId);
    const guests = await db('guests').where('listId', list.id);
    return {
        id: list.id,
        name: list.name,
        order: list.order,
        owner: owner[0].email,
        guests: await mapGuests(guests),
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

export const get = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return { status: 403 } }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return { status: 403 } }
    // Perform the action
    let mine = await db('lists').where('userId', token.id);
    let shared = await db('guests').where('userId', token.id);
    for (let i = 0; i < mine.length; i++) {
        mine[i] = await mapList(mine[i]);
    }
    for (let i = 0; i < shared.length; i++) {
        const list = await db('lists').where('id', shared[i].listId);
        shared[i] = await mapList(list[0]);
    }
    return {
        body: {
            mine, shared
        }
    }
}

export const post = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return { status: 403 } }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return { status: 403 } }
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
    if (!request.headers.authorization) { return { status: 403 } }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return { status: 403 } }
    if (!request.body.id) { return { status: 400 } }
    // Perform the action
    let list = await db('lists').where('id', request.body.id);
    if (!list || list.length !== 1) { return { status: 412 } }
    const payload = Object.assign(list[0], request.body);
    let newList = await db('lists').where('id', request.body.id).update(payload);
    // Return
    return {
        body: payload
    }
}

export const del = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return { status: 403 } }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return { status: 403 } }
    if (!request.body.id) { return { status: 400 } }
    // Perform the action
    let items = await db('items').where('listId', request.body.id).del()
    let list = await db('lists').where('id', request.body.id).del()
    // Return
    return {
        body: { status: 'success' }
    }
}