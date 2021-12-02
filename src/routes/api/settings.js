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