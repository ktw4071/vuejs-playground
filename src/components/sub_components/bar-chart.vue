<script>
// CommitChart.js
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Pizza Sales',
          backgroundColor: '#67c23a',
          data: [40, 20, 12, 39, 15, 40, 39, 50, 40, 20, 12, 11]
        }
      ]
    },
    {
      maintainAspectRatio: false
    })
  }
}
</script>
