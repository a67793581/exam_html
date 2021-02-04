<script>
    export let examRecord = {
        "id": 0,
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

    function test1() {
        examRecord.key = key
        examRecord.code = code
        examRecord.achievement = achievement
        examRecord.exam_time = (new Date(exam_time)).valueOf() / 1000
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
        <input type="text" bind:value="{achievement}"/>
    </label>
    <br/>

    <label>
        考试批次：
        <input type="text" bind:value="{code}"/>
    </label>
    <br/>
    <button on:click={test1}>提交</button>
</div>