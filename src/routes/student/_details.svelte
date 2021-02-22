<script>
    import {checkResult} from "../../stores";

    export let cancel
    export let list
    export let student = {
        "id": 0,
        "key": "",
        "name": "",
    };
    async function create() {

        let method = "create"
        let id = ``
        if (student.id) {
            method = "update"
            id = `id:${student.id}`
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
  studentDML {
    ${method}(
    ${id}
    key:"${student.key}"
    name:"${student.name}"
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
        await checkResult(res)
        await cancel()
        await list()
    }


</script>

<style>
</style>
<div>
    <label>
        学号：
        <input type="text" bind:value="{student.key}"/>
    </label>
    <br/>
    <label>
        姓名：
        <input type="text" bind:value="{student.name}"/>
    </label>
    <br/>
    <button on:click={create}>提交</button>
</div>