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

export const loading = writable(false);
export const token = writable(browser && localStorage.getItem("token") ? localStorage.getItem("token") : null);
export const principal = writable(null);
export const lists = writable(null);
export const settings = writable({title: 'myTinyTodo'});
export const search = writable(null);
export const tags = writable([]);
export const filter = writable(
    getQueryParam('filter') && Object.keys(filters).indexOf(getQueryParam('filter')) !== -1 ? 
    getQueryParam('filter') : 
    'ALL'
);

export const activeItem = writable(null);

export async function fetchData(token) {
    loading.set(true);
    const lists$ = await fetch('/api/lists', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(i => i.json());
    lists.set(lists$);
    loading.set(false);
}

export async function fetchSettings(token) {
    loading.set(true);
    const settings$ = await fetch('/api/settings', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(i => i.json());
    settings.set(settings$);
    loading.set(false);
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
        loading.set(true);
        fetchSettings(value);
        fetchData(value);
    });
}