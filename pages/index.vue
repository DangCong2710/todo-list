<template>
  <div class="">
    <div class="d-flex flex-row justify-space-between align-center pt-10 pb-8">
      <div class="d-flex flex-row align-center">
        <img width="25px" height="25px" :src="require(`~/assets/images/Union.png`)" />
        <div class="list-to-do-banner accent--text">LIST OF TODO</div>
      </div>
    </div>
    <div class="card-wrap">
      <div class="card">
        <div
          v-for="(task, index) in taskTodos"
          :key="index"
          class="task-card"
          @click="onChangeDirect(task.id)"  
        >
          <div class="task-title">
              {{ task.name }}
            <div class="clock-icon">
              <img :src="require(`~/assets/fonts/clock-2.png`)" />
            </div>
          </div>
          <div class="task-content"> {{ task.content }}</div>
          <div class="created-at">Created at {{ formatDate(task.createdAt.seconds) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    name: 'IndexPage',
    data: () => {
      return {
        taskById: {}
      }
    },
    computed: {
      ...mapState(['taskTodos']),

    },
    created() {
      this.getTasks();
    },
    methods: {
      ...mapActions(['getTasks']),
      onChangeDirect(id) {
        this.$router.push({path:'task' + '/detail?id=' + id})
      },
      formatDate (timestamp) {
        if (!timestamp) return null
        const [year, month, day] = new Date(timestamp * 1000).toISOString().substr(0, 10).split('-')
        return `${day}/${month}/${year}`
      },
      timestampFromStrDate (strDate) {
        const dt = Date.parse(strDate);  
        return dt / 1000;  
      },
      convertTimeStampToDate(timestamp) {
        if (!timestamp) return null
        return new Date(timestamp * 1000)
      },
    }
  }
</script>

<style lang="scss" scoped>
.v-btn {
  padding: 8px !important;
  width: auto !important;
  min-width: 24px !important;
  height: auto !important;
}

.list-to-do-banner {
  font-family: 'Bebas Neue', cursive;
  font-size: 36px;
  line-height: 30px;
  margin-bottom: -5px;
  padding-left: 8px;
  font-weight: 400;
}

.card-wrap {
  position: relative;
  height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;

  .card {
    width: 100%;
    position: absolute;
    max-height:100%;
    overflow:auto;
  }
}

.task-card {
  position: relative;
  background-color: #F79E89;
  color: white;
  border-radius: 12px;
  height: 120px;
  width: 100%;
  margin-bottom: 16px;
  overflow: hidden;

  .task-title {
    padding: 8px 15px 12px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 600;
    letter-spacing: 0.01em;

    .clock-icon {
      width: 10px;
      height: 10px;
      object-fit: cover;
    }
  }

  .task-content {
    font-weight: 400;
    font-size: 14px;
    line-height: 170%;
    height: 40px;
    letter-spacing: 0.01em;
    padding: 0 41px 16px 16px;
    overflow: hidden;
  }

  .created-at {
    position: absolute;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    padding-left: 16px;
    padding-bottom: 5px;
    bottom: 0;
  }
}


</style>