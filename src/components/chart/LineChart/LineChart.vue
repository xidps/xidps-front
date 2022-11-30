<script setup lang="ts">

import {reactive} from "vue";
import {Line as LineGenerator} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale, PluginOptionsByType,
} from 'chart.js'
import {TChartOptions} from "vue-chartjs/dist/types";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
)


interface IDataSets {
  label: string[] | string;
  backgroundColor: string[] | string;
  data: number[]
}

interface IChartData {
  labels: string[];
  datasets: IDataSets[]
}

interface ILineChart {
  chartData: IChartData;
  options: TChartOptions<'line'>
}

interface ILineChartProps {
  chartId?: string;
  width?: number;
  height?: number;
  cssClasses?: string;
  styles?: Partial<CSSStyleDeclaration>;
  plugins?: PluginOptionsByType<'line'>;
  data?: ILineChart
}

const props = withDefaults(defineProps<ILineChartProps>(), {
  chartId: 'line-chart',
})

</script>

<template>
  <LineGenerator
      :height="height"
      :chart-option="data.options"
      :chart-data="data.chartData"
      :chart-id="chartId"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
  />
</template>



