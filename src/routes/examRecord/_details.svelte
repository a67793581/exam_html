<script>

    import {checkResult} from '../../stores.js';
    export let cancel
    export let list
    export let students = []
    export let courses = []
    export let examRecord = {
        "id": 0,
        "course_id": 0,
        "student_id": 0,
        "key": "",
        "code": "",
        "exam_time": (new Date()).valueOf() / 1000,
        "achievement": 0,
    };
    let exam_time = getTime()
    $:  examRecord.exam_time = (new Date(exam_time)).valueOf() / 1000

    let promise

    function getTime() {
        let date = new Date(examRecord.exam_time * 1000)
        return date.getFullYear()
            + '-'
            + (date.getMonth() + 1).toString().padStart(2, '0')
            + '-'
            + date.getDate().toString().padStart(2, '0')
            + 'T'
            + date.getHours().toString().padStart(2, '0')
            + ':'
            + date.getMinutes().toString().padStart(2, '0')
    }

    async function create() {

        let method = "create"
        let id = ``
        if (examRecord.id) {
            method = "update"
            id = `id:${examRecord.id}`
        }
        const res = await fetch(`http://exam.cn/api/graphql/teacher`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            body: JSON.stringify({
                'variables': null,
                'operationName': null,
                'query': `
mutation {
  examRecordDML {
    ${method}(
    ${id}
    key:"${examRecord.key}"
    code:"${examRecord.code}"
    achievement:${examRecord.achievement}
    exam_time:${examRecord.exam_time}
    student_id:${examRecord.student_id}
    course_id:${examRecord.course_id}
    ) {
        id
        key
        code
        achievement
        exam_time
        student_id
        course_id
        student {
          id
          name
          key
        }
        course {
          id
          name
        }
    }
  }
}
                `
            })
        });
        await checkResult(res)
        await cancel()
        await list()
    }

    function clickSubmit() {
        promise = create();
    }

</script>

<style>
</style>
<div>
    <label>
        课程：
        <select bind:value={examRecord.course_id}>
            <option value=0 selected>请选择</option>

            {#each courses as v, index}
                <option value={v.id}>{v.name}</option>
            {/each}
        </select>
    </label>
    <br/>
    <label>
        学生：
        <select bind:value={examRecord.student_id}>
            <option value=0 selected>请选择</option>
            {#each students as v, index}
                <option value={v.id}>{v.name}</option>
            {/each}
        </select>
    </label>
    <br/>
    <label>
        考试唯一编号：
        <input type="text" bind:value="{examRecord.key}"/>
    </label>
    <br/>

    <label>
        考试时间：
        <input type="datetime-local" bind:value="{exam_time}"/>
    </label>
    <br/>

    <label>
        成绩：
        <input type="number" bind:value="{examRecord.achievement}" min="0"/>
    </label>
    <br/>

    <label>
        考试批次：
        <input type="text" bind:value="{examRecord.code}"/>
    </label>
    <br/>
    <button on:click={clickSubmit}>提交</button>
    {#await promise}
        <p style="color: red"></p>
    {:then promise}
        <p style="color: red"></p>
    {:catch promise}
        <p style="color: red">{promise.message}</p>
    {/await}
</div>