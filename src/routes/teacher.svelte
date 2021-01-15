<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>
    let is_student = true;

    async function test(e) {
        e.preventDefault();
        const res = await fetch(`http://exam.cn/api/test`, {method: 'GET', mode: 'cors'});
        const data = await res.json();
        if (res.status === 200) {
            console.log(data);
            return {post: data};
        } else {
            this.error(res.status, data.message);
        }
    }

</script>
<div>
    <form>
        <label>
            <input type="text" placeholder="请输入密码"/>
        </label>
        <button on:click={test}>登陆</button>
    </form>
</div>
