<script>
    import { query, secretKey, appId, error } from "./stores.js";
    import AppInsightsRepository from "./AppInsightsRepository.js";

    let aiRepository = new AppInsightsRepository();

    async function executeQuery() {
        // event handler code goes here
        // console.log($query);
        $error = '';
        let promise = await aiRepository.Execute($appId, $secretKey, $query);
        var results = await promise.text();
        buildChart(JSON.parse(results));
    }

    async function buildChart(results) {
        try {
            var ctx = document.getElementById("aiResults").getContext("2d");
        const formattedData = results.tables[0].rows.map((r) => {
            return {
                x: new Date(r[0]),
                y: r[7],
            };
        });
        formattedData.sort((a, b) => {
            return a.x - b.x;
        });
        console.log(formattedData);

        new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        data: formattedData,
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            type: "time",
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: "duration",
                            },
                        },
                    ],
                },
            },
        });
        }
        catch {
            $error = 'There was a problem';
        }
    }
</script>

<div class="row">
    <div class="col-12">
        <button on:click={executeQuery} class="float-right"> Execute </button>
    </div>
</div>
<div class="row">
    <div class="col-3 text-right">
        Results:
    </div>
    <div class="col-9">
        <canvas id="aiResults" width="200" height="200" />
    </div>
</div>