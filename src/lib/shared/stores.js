import { writable } from 'svelte/store';

// User/JWT-related
// https://stackoverflow.com/a/61300826/2933427
export const createWritableStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);

  return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

export const user = createWritableStore('user', {});

// JWT-related
export const aud = writable('UNKNOWN');
export const browser = writable('UNKNOWN');
export const ip = writable('UNKNOWN');
export const os = writable('UNKNOWN');
