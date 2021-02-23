<svelte:head>
    <title>学生主页</title>
</svelte:head>
<script>

    import {checkResult} from "../stores";

    let promise;

    let key;

    async function test() {
        // const res = await fetch(`http://exam.cn/api/exam_record/details`, {method: 'GET', mode: 'cors'});
        const res = await fetch(`http://exam.cn/api/graphql/student`, {
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

        return await checkResult(res);
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
            <input type="text" required bind:value={key} placeholder="请输入考试唯一编号"/>
        </label>
        <button>查询成绩</button>
    </form>
    {#if promise}
        <div>
            {#await promise}
                <p>...加载中</p>
            {:then promise}
                <ul>
                    <li>
                        考试唯一编号：{promise.data.examRecord.key}
                    </li>
                    <li>
                        考试时间：{new Date(promise.data.examRecord.exam_time * 1000).toLocaleString()}
                    </li>
                    <li>
                        成绩：{promise.data.examRecord.achievement}
                    </li>
                    <li>
                        考试批次：{promise.data.examRecord.code}
                    </li>
                    <li>
                        课程名称：{promise.data.examRecord.course.name}
                    </li>
                    <li>
                        学生姓名：{promise.data.examRecord.student.name}
                    </li>
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    {/if}


</div>

