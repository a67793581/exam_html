<svelte:head>
    <title>学生主页</title>
</svelte:head>
<script>

    let promise;

    async function test() {
        const res = await fetch(`http://exam.cn/api/exam_record/details`, {method: 'GET', mode: 'cors'});
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
                    <!--
Achievement: 0
Code: ""
CourseID: 0
CreatedAt: 1610706333
DeletedAt: null
ExamTime: 0
ID: 1
Key: "test"
StudentID: 0
UpdatedAt: 1610706333
                    -->
                    <li>
                        考试编号：{promise.Key}
                    </li>
                    <li>
                        考试时间：{new Date(promise.ExamTime*1000).toLocaleString()}
                    </li>
                    <li>
                        成绩：{promise.Achievement}
                    </li>
                    <li>
                        考试批次：{promise.Code}
                    </li>
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    {/if}


</div>

