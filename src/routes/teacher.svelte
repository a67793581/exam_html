<svelte:head>
    <title>老师主页</title>
</svelte:head>
<script>

    import ExamRecords from './examRecord/_examRecords.svelte';
    import Students from './student/_students.svelte';
    import Courses from './course/_courses.svelte';
    import Section from './../components/Section.svelte';
    import SectionDiv from './../components/SectionDiv.svelte';
    import { onDestroy } from 'svelte';

    import {onMount} from "svelte";
    import {checkResult, tokenWritable} from "../stores";

    let promise;

    let key;
    //token变量
    let token;
    //绑定token到当前变量
    const unsubscribe = tokenWritable.subscribe(value => {
        console.log("刷新token:"+value)
        token = value;
    });
    onDestroy(unsubscribe);
    //读取本地token
    onMount(async () => {
        tokenWritable.set(window.localStorage.getItem("token"));
    });

    let use = "examRecords";

    async function login() {
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

        const data = await checkResult(res);

        window.localStorage.setItem("token", data.token);
        tokenWritable.set(data.token);
        return data;
    }

    function handleClick(e) {
        e.preventDefault();
        promise = login();
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
            <Courses/>
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