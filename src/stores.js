import {writable} from 'svelte/store';

export const tokenWritable = writable("");

export async function checkResult(result) {
    const data = await result.json();
    if(result.status === 401){
        window.localStorage.removeItem("token")
        tokenWritable.set("");
    }
    else if (result.status !== 200) {
        throw data;
    }
    else if (data.errors !== undefined) {
        throw data.errors[0];
    }

    return data

}