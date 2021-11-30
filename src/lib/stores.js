import { writable } from 'svelte/store';
import { browser } from "$app/env";
import { goto } from '$app/navigation';
import { filters } from './dict';

const getQueryParam = (field) => {
    if (!browser) { return null; }
    const urlParams = new URLSearchParams(window.location.search);
    const hasParam = urlParams.get(field.trim());
    return hasParam ? urlParams.get(field.trim()) : null;
}

const setQueryParam = (field, val) => {
    if (!browser) { return null; }
    const url = new URL(window.location);
    if (url.searchParams.get(field) && url.searchParams.get(field) === val.trim()) { return; }
    url.searchParams.set(field, val.trim());
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
export const search = writable(getQueryParam('search') ? getQueryParam('search') : null)
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
    search.subscribe((value) => {
        if (value === null || value.trim() === '') {
            clearQueryParam('search', null);
            return;
        }
        setQueryParam('search', value.trim());
    });
    token.subscribe((value) => {
        if (value === null) { localStorage.removeItem("token"); return }
        localStorage.setItem("token", value);
        fetchData(value);
    });
}