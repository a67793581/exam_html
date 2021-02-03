<script>
    export let first = 5;
    export let afterCount = 0;
    export let totalCount = 0;
    let page = [];
    if (totalCount > 0) {
        let active = parseInt(((totalCount - afterCount) / first).toString())
        let pageCount = Math.ceil(totalCount / first);
        let is_ellipsis = false;
        for (let i = 0; i < pageCount; i++) {
            let pageNumber = i + 1;
            if (pageNumber < 3) {
                page.push({
                    "pageNumber": pageNumber,
                    "isActive": pageNumber === active,
                })
                console.log("前几页" + pageNumber)
            } else if (pageNumber > (pageCount - 3)) {
                page.push({
                    "pageNumber": pageNumber,
                    "isActive": pageNumber === active,
                })
                console.log("后几页" + pageNumber + '|' + (pageCount - 3))
            } else if (pageNumber < (active + 3) && pageNumber >= active) {
                page.push({
                    "pageNumber": pageNumber,
                    "isActive": pageNumber === active,
                })
                console.log("当前页的后几页" + pageNumber)
            } else if (pageNumber > (active - 3) && pageNumber <= active) {
                page.push({
                    "pageNumber": pageNumber,
                    "isActive": pageNumber === active,
                })
                console.log("当前页的前几页" + pageNumber)
            } else {
                if (!is_ellipsis) {
                    page.push({
                        "pageNumber": "ellipsis",
                        "isActive": pageNumber === active,
                    })
                    is_ellipsis = true;
                }
                console.log("其他" + pageNumber)
            }
        }
        if (pageCount > 1) {
            page.push({
                "pageNumber": '>',
                "isActive": false,
            })
        }

        if (active > 1) {
            page.push({
                "pageNumber": '<',
                "isActive": false,
            })
        }
        console.log({
            "totalCount": totalCount,
            "afterCount": afterCount,
            "first": first,
            "active": active,
            "pageCount": pageCount,
            "page": page
        })
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
    .pagination li:hover a {
        color: #fdfdfd;
        background-color: #1d1f20;
        border: solid 1px #1d1f20;
    }

    /*当前页*/
    .pagination li.active a {
        color: #fdfdfd;
        background-color: #1d1f20;
        border: solid 1px #1d1f20;
    }

    /*超链接*/
    .pagination li a {
        background: #fdfdfd;
        border: solid 1px #d6d6d6;
        border-radius: 0.2rem;
        color: #7d7d7d;
        text-decoration: none;
        text-transform: uppercase;
        display: inline-block;
        text-align: center;
        padding: 0.5rem 0.9rem;
    }
    .large li.ellipsis {
        padding: 0 1rem;
    }

</style>
<div class="container large">
    <div class="pagination">
        <ul>
            {#if totalCount}
                {#each page as v,k}
                    {#if v.pageNumber === "ellipsis"}
                        <li class="ellipsis">. . .</li>
                    {:else}
                        <li class="{v.isActive ? 'active' : ''}"><a href="javascript:void(0)">{v.pageNumber}</a></li>
                    {/if}
                {/each}
            {:else}
                <li class="active"><a href="javascript:void(0)">没有数据</a></li>
            {/if}
        </ul>
    </div>
</div>