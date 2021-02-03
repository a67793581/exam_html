<script>
    import {onMount} from "svelte";
    import Pagination from '../components/Pagination.svelte';

    let promise;
    let last_id;
    let next_id;
    let active = 1;
    let todoPage = 1;
    let first = 1;
    let pageCount = 0;
    let pageInfo = 0;

    async function test(e) {
        let whereJson = [
            "first:" + first
        ];
        if (e) {
            todoPage = parseInt(e.target.innerHTML);
            if (todoPage === active) {
                return promise
            }
            // afterCount: 7
            // endCursor: 1
            // first: 1
            // hasNextPage: true
            // startCursor: 1
            // totalCount: 8
            console.log({
                "todoPage": todoPage,
                "pageCount": pageCount,
                "active": active,
                "offset": (todoPage - (active + 1)) * first,
                "after": pageInfo.endCursor
            })
            if (todoPage > active && todoPage <= pageCount) {
                whereJson.push("after" + ":" + pageInfo.endCursor);
                whereJson.push("offset" + ":" + (todoPage - (active + 1)) * first);
            }
            //目标页 2 当前页5 每页条数1
            if (todoPage < active && todoPage >= 1) {
                whereJson.push("before" + ":" + pageInfo.startCursor);
                whereJson.push("offset" + ":" + ((active - 1) - todoPage) * first);
            }

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
      first
    }
  }
}

                `
            })
        });
        const data = await res.json();
        if (res.status === 200) {
            active = todoPage;
            pageInfo = data.data.ExamRecordConnection.pageInfo;
            pageCount = Math.ceil(pageInfo.totalCount / pageInfo.first);
            promise = data;
            console.log({"active": active, "pageInfo": pageInfo, "pageCount": pageCount})
        } else {
            throw new Error(data);
        }
    }


    onMount(async () => {
        test();
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
            <button>新增</button>
            <button>导入</button>
        </th>
    </tr>
    <tr>
        <th>自增id</th>
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
                        <button value="{v.id}">修改</button>
                        <button value="{v.id}">删除</button>
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
                                on:click={test}
                    />
                </td>
            </tr>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}
</table>