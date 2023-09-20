import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

/**
 * This component is a pie chart.
 */
const PieChart = ({ labels, chartData }) => {

    // Setting up the data to be displayed
    var pieData = {
        labels: labels,
        datasets: [{
            // Mapping chart data
            data: chartData?.map(x => x),

            // Setting the styling
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
            hoverOffset: 10
        }]
    };

    // Custom Data Labels to display the numbers in the pie chart itself
    const customDataLabels = {
        id: 'customDataLabels',
        afterDatasetsDraw(chartData, args, pluginOptions) {
            const { ctx, data } = chartData;
            ctx.save();

            // Mapping each data in the dataset passed to this component
            data.datasets[0].data.forEach((datapoint, index) => {
                const {x, y} = chartData.getDatasetMeta(0).data[index].tooltipPosition()

                // Styling for the text
                ctx.font = 'bold 18px sans-serif';
                ctx.fillStyle = data.datasets[0].borderColor[index];
                ctx.textAlign = 'center';
                ctx.textBaseLine = 'middle';

                ctx.fillText(datapoint, x, y);
            })
        }
    }

    // Setting the options for the pie chart
    var options = {
        plugins: {
            legend: { display: false }
        },
        layout: {
            padding: {
                top: 10,
                left: 10,
                right: 10,
                bottom: 10
            }
        },
        responsive: true
    };

    return (
        <Pie
            height={400}
            data={pieData}
            options={options}
            plugins={[customDataLabels]}
        />
    );
};


export default PieChart;