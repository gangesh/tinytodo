import db from '$lib/db';
import jwt from 'jsonwebtoken';

export const get = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    // Perform the action
    const settings = await db('settings').where('userId', token.id);
    // Return
    return {
        body: settings[0]
    }
}

export const put = async request => {
    // Make sure the request is valid
    if (!request.headers.authorization) { return {status: 403} }
    const token = jwt.verify(request.headers.authorization, import.meta.env.VITE_PWD_SALT);
    if (!token) { return {status: 403} }
    if (!request.body.id) { return {status: 400}  }
    // Perform the action
    let settings = await db('settings').where('userId', token.id);
    if (!settings || settings.length !== 1) { return {status: 412} }
    const payload = Object.assign(settings[0], request.body);
    if (!payload.dateFormat || payload.dateFormat === '') { payload.dateFormat = 'j M Y' }
    let newSettings = await db('settings').where('userId', token.id).update(payload);
    // Return
    return {
        body: payload
    }
}