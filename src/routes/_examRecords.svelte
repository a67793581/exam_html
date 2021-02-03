<script>
    import {onMount} from "svelte";
    import Pagination from '../components/Pagination.svelte';

    let promise;

    async function test() {
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
  ExamRecordConnection(first:1) {
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
            return data;
        }else{
            throw new Error(data);
        }
    }


    onMount(async () => {
        promise = test();
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
                    <Pagination afterCount={promise.data.ExamRecordConnection.pageInfo.afterCount}
                                totalCount={promise.data.ExamRecordConnection.pageInfo.totalCount}
                                first={promise.data.ExamRecordConnection.pageInfo.first}
                    />
                </td>
            </tr>
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}
    {/if}
</table>