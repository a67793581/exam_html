<script>
    import SectionDiv from './SectionDiv.svelte';
</script>

<style>
    section {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }

</style>
<section>
    <slot>
        <SectionDiv id="1"/>
        <SectionDiv id="2" use="N"/>
    </slot>
</section>