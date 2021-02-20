<script>
    export let cancel
    export let list
    export let examRecord = {
        "id": 0,
        "key": "",
        "name": "",
    };
    let exam_time = getTime()
    $:  examRecord.exam_time = (new Date(exam_time)).valueOf() / 1000



    function getTime() {
        let date = new Date(examRecord.exam_time * 1000)
        return date.getFullYear()
            + '-'
            + (date.getMonth() + 1).toString().padStart(2,'0')
            + '-'
            + date.getDate().toString().padStart(2,'0')
            + 'T'
            + date.getHours().toString().padStart(2,'0')
            + ':'
            + date.getMinutes().toString().padStart(2,'0')
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
  StudentDML {
    ${method}(
    ${id}
    key:"${examRecord.key}"
    name:"${examRecord.name}"
    ) {
        id
        key
        name
    }
  }
}
                `
            })
        });
        const data = await res.json();

        if (res.status !== 200 || data.errors !== undefined) {
            throw data;
        }
        await cancel()
        await list()
    }


</script>

<style>
</style>
<div>
    <label>
        学号：
        <input type="text" bind:value="{examRecord.key}"/>
    </label>
    <br/>
    <label>
        姓名：
        <input type="text" bind:value="{examRecord.name}"/>
    </label>
    <br/>
    <button on:click={create}>提交</button>
</div>