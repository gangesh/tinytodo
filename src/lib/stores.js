import { writable } from 'svelte/store';
import { browser } from "$app/env";
import { filters } from './dict';
import { goto } from '$app/navigation';

const getQueryParam = (field) => {
    if (!browser) { return null; }
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.get(field);
    return hasParam ? urlParams.get(field) : null;
}

const setQueryParam = (field, val) => {
    if (!browser) { return null; }
    const url = new URL(window.location);
    if (url.searchParams.get(field) && url.searchParams.get(field) === val) { return; }
    url.searchParams.set(field, val);
    return goto(`${url.toString()}`, { replaceState: true });
}

const clearQueryParam = (field) => {
    if (!browser) { return null; }
    const url = new URL(window.location);
    if (!url.searchParams.get(field)) { return; }
    url.searchParams.delete(field);
    return goto(`${url.toString()}`, { replaceState: true });
}

export const token = writable(browser && localStorage.getItem("token") ? localStorage.getItem("token") : null);
export const principal = writable(null);
export const lists = writable(null);
export const filter = writable(
    getQueryParam('filter') && Object.keys(filters).indexOf(getQueryParam('filter')) !== -1 ? 
    getQueryParam('filter') : 
    'ALL'
);

export const activeItem = writable(null);

export async function fetchData(token) {
    const lists$ = await fetch('/api/lists', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(i => i.json());
    lists.set(lists$);
}

if (browser) {
    filter.subscribe((value) => {
        if (value === null || value === 'ALL') {
            clearQueryParam('filter', null);
            return;
        }
        setQueryParam('filter', value);
    });
    token.subscribe((value) => {
        if (value === null) { localStorage.removeItem("token"); return }
        localStorage.setItem("token", value);
        fetchData(value);
    });
}