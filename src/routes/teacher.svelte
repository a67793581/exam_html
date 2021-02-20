<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>

    import ExamRecords from './examRecord/_examRecords.svelte';
    import Students from './student/_students.svelte';
    import Courses from './course/_courses.svelte';
    import Section from './../components/Section.svelte';
    import SectionDiv from './../components/SectionDiv.svelte';

    import {onMount} from "svelte";

    let promise;

    let key;

    let token = ""

    let use = "examRecords"

    onMount(async () => {
        token = window.localStorage.getItem("token");
    });

    async function test() {
        let formData = new FormData();
        formData.append("key", key);
        const res = await fetch(`http://exam.cn/api/teacher/login`, {
            method: 'POST',
            mode: 'cors',
            body: formData,
            headers: {
                'Authorization': "Bearer " + token
            }
        });

        const data = await res.json();

        if (res.status !== 200 || data.errors !== undefined) {
            throw data;
        }

        window.localStorage.setItem("token", data.token);
        token = data.token;
        return data;
    }

    function handleClick(e) {
        e.preventDefault();
        promise = test();
        return false
    }

</script>

{#if token}
    <Section>

        <SectionDiv id="examRecords" name="考试记录" use="Y">
            <ExamRecords/>
        </SectionDiv>
        <SectionDiv id="Students" name="学生列表" use="N">
            <Students/>
        </SectionDiv>
        <SectionDiv id="Courses" name="课程列表" use="N">
<!--            <Courses/>-->
        </SectionDiv>
    </Section>

{:else}
    <div>
        <form on:submit={handleClick}>
            <label>
                <input type="text" required bind:value={key} placeholder="请输入密码"/>
            </label>
            <button>登陆</button>
        </form>
    </div>
    {#if promise}
        <div>
            {#await promise}
                <p>...加载中</p>
            {:then promise}
                <ul>
                    <li>
                        token：{promise.token}
                    </li>
                </ul>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}
        </div>
    {/if}
{/if}