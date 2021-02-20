<script>
    import {onMount} from "svelte";

    export let id;
    export let name = "显示模态框";
    export let use = "Y";

    onMount(async () => {
        document.getElementById(id).checked = use === "Y"
    });
</script>

<style>

    label {
        background: #eee;
        border: 1px solid #ddd;
        padding: .7em 1em;
        cursor: pointer;
        z-index: 1;
        margin-left: -1px;
    }

    div {
        width: 100%;
        margin-top: -1px;
        padding: 1em;
        border: 1px solid #ddd;
        order: 1;
    }

    /*选中默认隐藏*/
    input[type=radio], div {
        display: none;
    }

    /*选中改变颜色*/
    input[type=radio]:checked + label {
        background: #fff;
        border-bottom: 1px solid #fff;
    }

    /*选中显示*/
    input[type=radio]:checked + label + div {
        display: block;
    }


</style>

<input id="{id}" type="radio" name="grp">
<label for="{id}">{name}</label>
<div>
    <slot>
        默认内容
    </slot>
</div>
