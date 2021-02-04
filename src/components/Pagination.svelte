<script>
    export let pageCount = 0;
    export let active = 0;
    let page;
    $: {
        if(active){
            test()
        }
    }

    function test() {
        let arr = []
        if (pageCount > 0) {
            let is_ellipsis = false;
            if (active > 1) {
                arr.push({
                    "pageNumber": '上一页',
                    "isActive": false,
                })
            }
            for (let i = 0; i < pageCount; i++) {
                let pageNumber = i + 1;
                if (pageNumber < 3) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber > (pageCount - 3)) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber < (active + 3) && pageNumber >= active) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber > (active - 3) && pageNumber <= active) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else {
                    if (!is_ellipsis) {
                        arr.push({
                            "pageNumber": "ellipsis",
                            "isActive": pageNumber === active,
                        })
                        is_ellipsis = true;
                    }
                }
            }
            if (pageCount > 1) {
                arr.push({
                    "pageNumber": '下一页',
                    "isActive": false,
                })
            }

            page = arr
        }
    }
</script>

<style>
    /*容器*/
    .container {
        padding: 0.2rem;
        text-align: center;
    }

    /*基本样式*/
    .pagination ul, li {
        display: inline;
        padding-left: 0;
    }

    /*鼠标选中*/
    .pagination li:hover button {
        color: #fdfdfd;
        background-color: #1d1f20;
        border: solid 1px #1d1f20;
    }

    /*当前页*/
    .pagination li.active button {
        color: #fdfdfd;
        background-color: #1d1f20;
        border: solid 1px #1d1f20;
    }

    /*超链接*/
    .pagination li button {
        background: #fdfdfd;
        border: solid 1px #d6d6d6;
        border-radius: 0.2rem;
        color: #7d7d7d;
        text-decoration: none;
        text-transform: uppercase;
        display: inline-block;
        text-align: center;
        padding: 0.5rem 0.9rem;
        margin: 0.1em;
    }

    .large li.ellipsis {
        padding: 0 1rem;
    }

</style>
<div class="container large">
    <div class="pagination">
        <ul>
            {#if pageCount}
                {#each page as v,k}
                    {#if v.pageNumber === "ellipsis"}
                        <li class="ellipsis">. . .</li>
                    {:else}
                        <li class="{v.isActive ? 'active' : ''}">
                            <button on:click>{v.pageNumber}</button>
                        </li>
                    {/if}
                {/each}
            {:else}
                <li>没有数据</li>
            {/if}
        </ul>
    </div>
</div>