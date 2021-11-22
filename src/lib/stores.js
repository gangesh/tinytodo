import { writable } from 'svelte/store';
import { browser } from "$app/env";

export const token = writable(browser && localStorage.getItem("token") ? localStorage.getItem("token") : null);
export const principal = writable(null);
export const lists = writable(null);

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
    token.subscribe((value) => {
        if (value === null) { localStorage.removeItem("token"); return }
        localStorage.setItem("token", value);
        fetchData(value);
    });
}