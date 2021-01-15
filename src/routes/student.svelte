<svelte:head>
    <title>学生主页</title>
</svelte:head>
<script>

    let promise;

    async function test() {
        const res = await fetch(`http://exam.cn/api/test_mysql`, {method: 'GET', mode: 'cors'});
        const data = await res.json();
        if (res.status === 200) {
            return data;
        } else {
            throw new Error(data);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        promise = test();
    }

</script>
<div>
    <form>
        <label>
            <input type="text" placeholder="请输入考试唯一编号"/>
        </label>
        <button on:click={handleClick}>查询成绩</button>
    </form>
    {#if promise}
        <div>
            {#await promise}
                <p>...加载中</p>
            {:then promise}
                <ul>
                    <li>
                        {promise.name}
                    </li>
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    {/if}


</div>

