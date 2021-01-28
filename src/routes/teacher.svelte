<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>
    let promise;

    let key;
    async function test() {
        const res = await fetch(`http://exam.cn/api/graphql/teacher`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                'variables': null,
                'operationName': null,
                'query': `
    {
      examRecord(key:"${key}") {
        key
      }
    }
                `
            })
        });
        const data = await res.json();
        console.log(data)
        if (res.status === 200) {
            return data.data;
        } else {
            this.error(res.status, data.message);
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
                    考试编号：{promise.examRecord.key}
                </li>
            </ul>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
{/if}
