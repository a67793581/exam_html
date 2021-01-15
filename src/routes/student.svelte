<svelte:head>
    <title>学生</title>
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
            <input type="text" placeholder="请输入考试唯一编号"/>
        </label>
        <button on:click={test}>查询成绩</button>
    </form>
</div>

