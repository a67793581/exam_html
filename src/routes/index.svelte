<svelte:head>
    <title>首页</title>
</svelte:head>

<style>
    .居中 {
        display: flex;
        justify-content: center;
    }

    .百分之50 {
        display: inline-block;
        width: 50%
    }
</style>
<h1 class="居中">考试报名数据处理系统</h1>
<div class="居中">
    <span class="百分之50">
        <a href="student" class="居中">
            <div>
                <div class="居中"><img alt="学生" src="svg/icon/学生.svg"/></div>
                <div class="居中"><h1>我是学生</h1></div>
            </div>
        </a>
    </span>
    <span class="百分之50">
        <a href="teacher" class="居中">
            <div>
                <div class="居中"><img alt="老师" src="svg/icon/老师.svg"/></div>
                <div class="居中"><h1>我是老师</h1></div>
            </div>
        </a>
    </span>
</div>
