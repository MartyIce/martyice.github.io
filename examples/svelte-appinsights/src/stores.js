import { writable } from 'svelte/store';

export let query = writable('requests | limit 25');
export let secretKey = writable('');
export let appId = writable('');
