<script>
    let loaded = false;
    import { generateChartOptions } from 'aichart'
    import { onMount } from 'svelte';

    let chart;
    const data = 'Category A constitutes 35% of the total, Category B accounts for 20%, Category C represents 15%, Category D represents 10%, and Category E accounts for the remaining 20%.'
    let chartData = {
    }
    const debug = true;
    generateChartOptions(data, debug).then((response) => chartData = response)

    onMount(async () => {
        chart = await import("svelte-apexcharts");
        loaded = true;
    });
</script>
{#if loaded}
<div use:chart={chartData.options} />
{/if}

<h1> Hello World </h1>
