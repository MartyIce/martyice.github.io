import { writable } from 'svelte/store';

export let showSettings = writable(false);
export let query = writable('requests | limit 25');
export let error = writable('');

export let secretKey = writable(localStorage.getItem("secretKey") || "");
secretKey.subscribe(val => localStorage.setItem("secretKey", val));
export let appId = writable(localStorage.getItem("appId") || "");
appId.subscribe(val => localStorage.setItem("appId", val));


