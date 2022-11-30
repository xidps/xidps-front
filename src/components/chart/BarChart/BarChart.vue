<script setup lang="ts">
import {Bar} from "vue-chartjs";
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PluginOptionsByType, LineElement,
} from 'chart.js';
import {reactive} from "vue";

ChartJS.register(Title, Tooltip, Legend,LineElement, BarElement, CategoryScale, LinearScale);


interface IBarChartProps {
  chartId?: string;
  width?: number;
  height: number;
  cssClasses?: string;
  styles?: Partial<CSSStyleDeclaration>;
  plugins?: PluginOptionsByType<'bar'>;
}

const props = withDefaults(defineProps<IBarChartProps>(), {
  chartId: 'bar-chart',
})

const state = reactive({
  chartData: {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ],
    chartOptions: {
      responsive: true,
      maintainAspectRatio:true
    }
  }
})
</script>

<template>
  <Bar
      :chart-options="state.chartOptions"
      :chart-data="state.chartData"
      :chart-id="chartId"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
  />
</template>



