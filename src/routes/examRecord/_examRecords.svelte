<script>
    import {onMount} from "svelte";
    import Pagination from '../../components/Pagination.svelte';
    import Modal from '../../components/Modal.svelte';
    import Details from './_details.svelte';

    let promise;
    let active = 1;
    let todoPage = 1;
    let first = 2;
    let pageCount = 0;
    let pageInfo = {
        totalCount: 0,
        startCursor: 0,
        endCursor: 0,
    };
    let oldWhereJson = [
        "first:" + first
    ]

    async function list(e) {
        let whereJson = [
            "first:" + first
        ];
        if (e) {
            todoPage = parseInt(e.target.value);
        }

        if (todoPage === active) {
            whereJson = oldWhereJson
        }
        if (todoPage > active && todoPage <= pageCount) {
            whereJson.push("after" + ":" + pageInfo.endCursor);
            whereJson.push("offset" + ":" + (todoPage - (active + 1)) * first);
        }
        //目标页 2 当前页5 每页条数1
        if (todoPage < active && todoPage >= 1) {
            whereJson.push("before" + ":" + pageInfo.startCursor);
            whereJson.push("offset" + ":" + ((active - 1) - todoPage) * first);
        }

        let where = "(" + whereJson.toString() + ")";
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
{
  ExamRecordConnection${where} {
    edges {
      node {
        id
        created_at
        updated_at
        course_id
        student_id
        code
        key
        exam_time
        achievement
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
      cursor
    }
    pageInfo {
      totalCount
      afterCount
      startCursor
      endCursor
      hasNextPage
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

        active = todoPage;
        oldWhereJson = whereJson;
        pageInfo = data.data.ExamRecordConnection.pageInfo;
        pageCount = Math.ceil(pageInfo.totalCount / first);
        promise = data;
    }


    async function cancel() {
        let mods = document.querySelectorAll('.modal > [type=checkbox]');
        [].forEach.call(mods, function (mod) {
            mod.checked = false;
        });
    }

    async function del(id) {
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
    delete(id:${id}) {
      id
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
        await list();
    }

    onMount(async () => {
        await list();
    });
</script>
<style type="text/css">
    table {
        border-collapse: collapse;
        margin: auto;
    }

    table td, table th {
        border: 1px solid #cad9ea;
        color: #666;
        padding: 0.0em 0.3em;
    }

    table thead th {
        background-color: #CCE8EB;
    }

    table tr:nth-child(odd) {
        background: #fff;
    }

    table tr:nth-child(even) {
        background: #F5FAFA;
    }
</style>
<table>
    <tr>
        <th colspan="9">考试记录</th>
        <th colspan="1">
            <Modal id="create" name="新增" className="button button-pill button-action button-tiny">
                <div slot="body">
                    <h1>新增考试记录</h1>
                    <Details cancel={cancel} list={list}/>
                </div>
            </Modal>
            <button class="button button-pill button-action button-tiny">导入</button>
        </th>
    </tr>
    <tr>
        <th>编号</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>考试时间</th>
        <th>考试唯一编号</th>
        <th>考试批次</th>
        <th>考试成绩</th>
        <th>课程</th>
        <th>学生</th>
        <th>操作</th>
    </tr>

    {#if promise}
        {#await promise}
            <tr>
                <td colspan="10">加载中...</td>
            </tr>
        {:then promise}
            {#each promise.data.ExamRecordConnection.edges.node as v, index}
                <tr>
                    <td>{v.id}</td>
                    <td>{new Date(v.created_at * 1000).toLocaleString()}</td>
                    <td>{new Date(v.updated_at * 1000).toLocaleString()}</td>
                    <td>{new Date(v.exam_time * 1000).toLocaleString()}</td>
                    <td>{v.key}</td>
                    <td>{v.code}</td>
                    <td>{v.achievement}</td>
                    <td>{v.course.name}</td>
                    <td>{v.student.name}</td>
                    <td>
                        <Modal id="{v.id}_del" name="删除" className="button button-caution button-pill button-tiny">
                            <div slot="body">
                                <h1>确定删除编号{v.id}的数据吗</h1>
                                <button class="button button-caution button-pill button-tiny" on:click={del(v.id)}>
                                    确定
                                </button>
                                <button class="button button-pill button-tiny" on:click={cancel}>取消</button>
                            </div>
                        </Modal>
                        <Modal id="{v.id}_update" name="修改">
                            <div slot="body">
                                <h1>正在修改编号{v.id}的信息</h1>
                                <Details examRecord={v} cancel={cancel} list={list}/>
                            </div>
                        </Modal>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td colspan="10">没有数据...</td>
                </tr>
            {/each}

            <tr>
                <td colspan="10">
                    <Pagination bind:active={active}
                                bind:pageCount={pageCount}
                                on:click={list}
                    />
                </td>
            </tr>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}
</table>