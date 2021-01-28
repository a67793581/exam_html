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
        id
        course_id
        student_id
        code
        key
        exam_time
        achievement
        student(id:10) {
          id
          name
          key
        }
        course (id:1){
          id
          name
        }
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
                <li>
                    考试时间：{new Date(promise.examRecord.exam_time * 1000).toLocaleString()}
                </li>
                <li>
                    成绩：{promise.examRecord.achievement}
                </li>
                <li>
                    考试批次：{promise.examRecord.code}
                </li>
                <li>
                    课程名称：{promise.examRecord.course.name}
                </li>
                <li>
                    学生姓名：{promise.examRecord.student.name}
                </li>
            </ul>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    </div>
{/if}
