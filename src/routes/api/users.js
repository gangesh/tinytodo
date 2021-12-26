import db from '$lib/db'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const put = async request => {
    // Make sure the request is valid
    if (!request.body.email || !request.body.password) { return {status: 403} }
    const users = await db('users').where('email', request.body.email);
    if (users.length !== 0) { return {status: 409} }
    // Perform the action
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);

    request.body.password = hash;
    const user = await db('users').insert(request.body);

    request.body.id = user[0];
    const token = jwt.sign(request.body, import.meta.env.VITE_PWD_SALT);
    const settings = await db('settings').insert({userId: request.body.id});
    // Return
    return {
        body: {
            token
        }
    }
}

export const post = async request => {
    // Make sure the request is valid
    if (!request.body.email || !request.body.password) { return {status: 403} }
    const users = await db('users').where('email', request.body.email)
    if (users.length !== 1) { return {status: 403} }
    const check = bcrypt.compareSync(request.body.password, users[0].password);
    if (!check) { return {status: 403} }
    // Perform the action
    const token = jwt.sign(Object.assign({}, users[0]), import.meta.env.VITE_PWD_SALT);
    // Return
    return {
        body: {
            token
        }
    }
}