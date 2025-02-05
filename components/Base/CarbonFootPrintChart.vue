<template>
  <div>
    <canvas :id="id" class="w-full laptop-l:w-[380px]" />
  </div>
</template>
<script setup>
import Chart from "chart.js/auto";
const props = defineProps({
  data: {
    type: Array,
    default: [100, 20, 200, 180],
  },
  id: {
    type: String,
    default: "test-chart",
  },
  type: {
    type: String,
    default: "bar",
  },
});

const { t } = useI18n();

const planetChartData = computed(() => {
  return {
    type: props.type,
    data: {
      labels: [t("Electricity"), t("Water"), t("Materials"), t("Petrol")],
      datasets: [
        {
          data: props.data,
          backgroundColor: ["#4EB000", "#00A06C", "#00A8A0", "#008A27"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      spacing: 4,
      borderRadius: 6,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          backgroundColor: "#9B9B9B",
        },
        legend: {
          position: "right",
          title: {
            font: "Inter",
            padding: 6,
          },
          fullSize: true,
        },
      },
      scales: {},
      responsive: true,
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
