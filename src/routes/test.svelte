<script>

    import {tokenWritable} from '../stores.js';
    import {onMount} from "svelte";


    let token;

    const unsubscribe = tokenWritable.subscribe(value => {
        token = value;
    });
    console.log(tokenWritable)

    onMount(async () => {
        tokenWritable.set(window.localStorage.getItem("token"));
    });
</script>

{#if token}
    {token}
{/if}