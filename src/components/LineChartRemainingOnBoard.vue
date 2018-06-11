<template>
  <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Remaining on board</h2>
          <LineChart
            :chartData="chartData"
          />
        </div>
      </div>
    </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  components: {
    LineChart
  },

  data () {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            borderColor: '#FC2525',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: 'white',
            data: [40, 39, 10, 40, 39, 80, 40]
          },{
            label: 'Data Two',
            borderColor: '#05CBE1',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            borderWidth: 1,
            data: [60, 55, 32, 10, 2, 12, 53]
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.container {
  max-width: 800px;
  margin:  0 auto;
}

.Chart {
  background: $color-white;
  padding: 20px;
  text-align: center;
  @include box-shadow(0 0 100px 1px rgba(0,0,0,0.1));
}

.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>
