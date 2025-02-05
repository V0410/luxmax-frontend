<template>
  <div>
    <canvas :id="id" :class="isMobile ? 'w-[280px] h-[200px]' : ''" />
  </div>
</template>
<script setup>
import Chart from "chart.js/auto";
const props = defineProps({
  data: {
    type: Array,
    default: [
      { time: "MON", salePrice: 5700, commission: 1000 },
      { time: "TUE", salePrice: 4800, commission: 860 },
      { time: "WED", salePrice: 4000, commission: 750 },
      { time: "THU", salePrice: 5400, commission: 900 },
      { time: "FRI", salePrice: 1000, commission: 100 },
      { time: "SAT", salePrice: 3200, commission: 400 },
      { time: "SUN", salePrice: 500, commission: 50 },
    ],
  },
  id: {
    type: String,
    default: "test-chart",
  },
  type: {
    type: String,
    default: "bar",
  },
  isMobile: Boolean,
});

const { t } = useI18n();

const planetChartData = computed(() => {
  return {
    type: props.type,
    data: {
      labels: props.data.map((el) => el.time),
      datasets: [
        {
          label: t("Our Commissions"),
          data: props.data.map((el) => el.commission),
          backgroundColor: "#2F3D2E",
        },
        {
          label: t("Sales Price"),
          data: props.data.map((el) => el.salePrice),
          backgroundColor: "#8CA18A",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          backgroundColor: "#9B9B9B",
        },
        legend: {
          position: props.isMobile ? "top" : "right",
          title: {
            font: "Inter",
            padding: 6,
          },
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      responsive: true,

      //   scales: {
      //     xAxes: [
      //       {
      //         gridLines: {
      //           drawBorder: true,
      //           display: false,
      //         },
      //         ticks: { fontFamily: "Inter" },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         gridLines: {
      //           drawBorder: false,
      //         },
      //         ticks: {
      //           min:
      //             Math.round(
      //               (Math.min(...props.data.map((el) => el.salePrice)) * 0.98) /
      //                 1000
      //             ) * 1000,
      //           max:
      //             Math.round(
      //               (Math.max(...props.data.map((el) => el.salePrice)) * 1.02) /
      //                 1000
      //             ) * 1000,
      //           stepSize:
      //             Math.round(
      //               (Math.round(
      //                 (Math.max(...props.data.map((el) => el.salePrice)) *
      //                   1.02) /
      //                   1000
      //               ) *
      //                 1000 -
      //                 Math.round(
      //                   (Math.min(...props.data.map((el) => el.salePrice)) *
      //                     0.98) /
      //                     1000
      //                 ) *
      //                   1000) /
      //                 5000
      //             ) * 1000,
      //           padding: 25,
      //           fontFamily: "Inter",
      //         },
      //       },
      //     ],
      //   },
    },
  };
});

const renderChart = (chartData) => {
  const chartExist = Chart.getChart(props.id);
  if (chartExist != undefined) {
    chartExist.destroy();
  }
  const ctx = document.getElementById(props.id);
  new Chart(ctx, chartData || planetChartData.value);
};

onMounted(() => {
  watch(
    () => planetChartData.value,
    (newVal) => {
      renderChart(newVal);
    },
    { immediate: true }
  );
});
</script>
