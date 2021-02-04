<script>

    export let id = "modal";
    export let name = "显示模态框";
</script>

<style>
    /*显示模态框*/
    .modal > input {
        display: none;
    }

    /*隐藏模态框*/
    .modal > input ~ * {
        overflow: hidden;
        max-height: 0;
        opacity: 0
    }

    /*灰色遮盖*/
    .modal > label {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        margin: 0;
        border-radius: 0;
        background: rgba(17, 17, 17, 0.6);
        transition: all 0.3s;
        z-index: 100000;
    }

    /*内容*/
    .modal > div {
        border: 0;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 1000000;
        transition: all .3s;
        background: #fff;
        padding: 1px;
        transform: translateX(-50%) translateY(-50%);
    }

    /*隐藏开关*/
    .modal > input:checked ~ * {
        display: block;
        opacity: 1;
        max-height: 10000px;
    }

</style>
<!--勾选开关-->
<label for="{id}" class="button button-primary button-pill button-tiny">{name}</label>

<div class="modal">
    <!--    检测是否开启modal的隐藏开关-->
    <input type="checkbox" name="" id="{id}">
    <!--全屏遮盖 勾选开关-->
    <label for="{id}"></label>

    <!--内容主体-->
    <div>
        <slot/>
    </div>
</div>