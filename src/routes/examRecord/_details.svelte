<script>
    export let cancel
    export let list
    export let examRecord = {
        "id": 0,
        "course_id": 0,
        "student_id": 0,
        "key": "",
        "code": "",
        "exam_time": (new Date()).valueOf() / 1000,
        "achievement": 0,
    };

    let key = examRecord.key
    let code = examRecord.code
    let exam_time = getTime(examRecord.exam_time)
    let achievement = examRecord.achievement


    function getTime(time) {
        let date = new Date(time * 1000)
        return date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + 'T' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes())
    }

    function pad(num, n = 2) {
        return Array(n > num ? (n - ('' + num).length + 1) : 0).join(0) + num;
    }

    async function create() {
        examRecord.key = key
        examRecord.code = code
        examRecord.achievement = achievement
        examRecord.exam_time = (new Date(exam_time)).valueOf() / 1000
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
  ExamRecordDML {
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
        const data = await res.json();
        if (res.status === 200) {
            await cancel()

        } else {
            throw new Error(data);
        }
        list()
    }


</script>

<style>
</style>
<div>
    <label>
        考试编号：
        <input type="text" bind:value="{key}"/>
    </label>
    <br/>

    <label>
        考试时间：
        <input type="datetime-local" bind:value="{exam_time}"/>
    </label>
    <br/>

    <label>
        成绩：
        <input type="number" bind:value="{achievement}" min="0"/>
    </label>
    <br/>

    <label>
        考试批次：
        <input type="text" bind:value="{code}"/>
    </label>
    <br/>
    <button on:click={create}>提交</button>
</div>