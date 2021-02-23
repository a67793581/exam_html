<script>
    import {Parser} from 'json2csv';
    import {checkResult} from "../../stores";

    export let cancel;
    export let list;
    let promise;

    function uploadClick(e) {
        promise = upload(e);
    }

    async function upload(e) {
        e.target.setAttribute("disabled", true)
        e.target.innerHTML = "上传中..."

        let formData = new FormData();
        let fileField = document.getElementById("uploadFile");
        formData.append('uploadFile', fileField.files[0]);
        const res = await fetch(`http://exam.cn/api/teacher/import`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': "Bearer " + window.localStorage.getItem("token")
            },
            body: formData
        });
        e.target.removeAttribute("disabled");//去掉不可点击
        e.target.innerHTML = "上传";
        await checkResult(res);
        fileField.value = '';
        await cancel();
        await list();
    }

    function downloadClick(e) {
        download(e);
    }

    async function download() {

        let json2csvParser = new Parser({fields: ['考试唯一编号', '考试时间', '成绩', '考试批次','课程','学生姓名','学号']});
        let csv = json2csvParser.parse();


        let title = "导入模板.csv";
        let uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
        let link = document.createElement("a");
        link.href = uri;
        link.download = title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
</script>

<style>
</style>
<div>
    <h1>导入</h1>
    <h3>
        <button on:click={downloadClick}>点击下载《导入模板》</button>
    </h3>
    <input id="uploadFile" type="file"/>
    <button on:click={uploadClick}>上传</button>
    {#await promise}
        <p style="color: red"></p>
    {:then promise}
        <p style="color: red"></p>
    {:catch promise}
        <p style="color: red">{promise.message}</p>
    {/await}
</div>