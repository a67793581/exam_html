<script>
    import {checkResult} from "../../stores";

    export let cancel
    export let list
    export let course = {
        "id": 0,
        "name": "",
    };
    async function create() {

        let method = "create"
        let id = ``
        if (course.id) {
            method = "update"
            id = `id:${course.id}`
        }
        const res = await fetch(`/api/graphql/teacher`, {
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
  courseDML {
    ${method}(
    ${id}
    name:"${course.name}"
    ) {
        id
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


    let promise
    function clickSubmit() {
        promise = create();
    }
</script>

<style>
</style>
<div>
    <label>
        课程名称：
        <input type="text" bind:value="{course.name}"/>
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