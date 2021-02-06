<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>

    import ExamRecords from './examRecord/_examRecords.svelte';
    import {onMount} from "svelte";

    let promise;

    let key;

    let token = ""

    onMount(async () => {
        token = window.localStorage.getItem("token");
    });

    async function test() {
        let formData = new FormData();
        formData.append("key", key);
        const res = await fetch(`http://exam.cn/api/teacher/login`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
            headers: {
                'Authorization': "Bearer " + token
            }
        });

        const data = await res.json();

        if (res.status !== 200 || data.errors !== undefined) {
            throw data;
        }

        window.localStorage.setItem("token", data.token);
        token = data.token;
        return data;
    }

    function handleClick(e) {
        e.preventDefault();
        promise = test();
        return false
    }

</script>

{#if token}

    <div>
        <ExamRecords />
    </div>
{:else}
    <div>
        <form on:submit={handleClick}>
            <label>
                <input type="text" required bind:value={key} placeholder="请输入密码"/>
            </label>
            <button>登陆</button>
        </form>
    </div>
    {#if promise}
        <div>
            {#await promise}
                <p>...加载中</p>
            {:then promise}
                <ul>
                    <li>
                        token：{promise.token}
                    </li>
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    {/if}
{/if}