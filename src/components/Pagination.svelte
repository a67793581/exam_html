<script>
    export let pageCount = 0;
    export let active = 0;
    let page;
    $: {
        if (pageCount || active) {
            build()
        }
    }

    function build() {
        let arr = []
        if (pageCount > 0) {
            let before_is_ellipsis = false;
            let after_is_ellipsis = false;
            if (active > 1) {
                arr.push({
                    "pageNumber": active - 1,
                    "explain": '上一页',
                    "isActive": false,
                })
            }
            for (let i = 0; i < pageCount; i++) {
                let pageNumber = i + 1;
                if (pageNumber < 3) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "explain": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber > (pageCount - 3)) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "explain": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber < (active + 3) && pageNumber >= active) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "explain": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else if (pageNumber > (active - 3) && pageNumber <= active) {
                    arr.push({
                        "pageNumber": pageNumber,
                        "explain": pageNumber,
                        "isActive": pageNumber === active,
                    })
                } else {
                    if (!before_is_ellipsis && pageNumber < active) {
                        arr.push({
                            "pageNumber": "ellipsis",
                            "explain": ". . .",
                            "isActive": pageNumber === active,
                        })
                        before_is_ellipsis = true;
                    }

                    if (!after_is_ellipsis && pageNumber > active) {
                        arr.push({
                            "pageNumber": "ellipsis",
                            "explain": ". . .",
                            "isActive": pageNumber === active,
                        })
                        after_is_ellipsis = true;
                    }
                }
            }
            if (pageCount > 1) {
                arr.push({
                    "pageNumber": active + 1,
                    "explain": "下一页",
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
                        <li class="ellipsis">{v.explain}</li>
                    {:else}
                        <li class="{v.isActive ? 'active' : ''}">
                            <button on:click value="{v.pageNumber}">{v.explain}</button>
                        </li>
                    {/if}
                {/each}
            {:else}
                <li>没有数据</li>
            {/if}
        </ul>
    </div>
</div>