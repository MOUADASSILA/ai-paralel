import { writable } from 'svelte/store';

export const chatVisible = writable(false);
export const chatMessages = writable([]);
export const codeGeneratorInput = writable('');
export const codeGeneratorOutput = writable('');