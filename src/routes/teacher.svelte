<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>
    let promise;

    let key;

    async function test() {
        let formData = new FormData();
        formData.append("key", key);
        const res = await fetch(`http://exam.cn/api/teacher/login`, {
            method: 'POST',
            mode: 'cors',
            body: formData
        });
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw data;
        }
    }

    function handleClick(e) {
        e.preventDefault();
        promise = test();
        return false
    }

</script>
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
