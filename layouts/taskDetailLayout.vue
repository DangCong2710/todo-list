<template>
  <v-app>
    <v-main v-if="taskByID[0]"  class="mx-6 mt-12">
    <task-detail-nav-component :deadline="formatDate(taskByID[0].deadline)" />
    <div>
      <div class="title text-h5 py-6">{{taskByID[0].name}}</div>
      <div class="content-wrap">
        <div class="show-content">
          <p>{{taskByID[0].content}} </p>
        </div>
      </div>
    </div>
      <Nuxt />
    <div v-show="!onEvent">
      <div class="task-create-at">
        TASK CREATED AT {{convertTimeStampToDate(taskByID[0].createdAt.seconds)}}
      </div>
    </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TaskDetailNavComponent from '~/components/TaskDetailNavComponent.vue';

  export default {
    name: 'TaskDetailLayout',
    components: { TaskDetailNavComponent },

    computed: {
      ...mapState(['taskTodos','onEvent']),
      taskByID() {
        return this.taskTodos.filter(task => task.id === this.$route.query.id)
      },
    },
    created() {
      this.getTasks();
    },
    methods: {
      ...mapActions(['getTasks']),
      convertTimeStampToDate (timestamp) {
        if (!timestamp) return null
        const [year, month, day] = new Date(timestamp * 1000).toISOString().substr(0, 10).split('-')
        return `${day}/${month}/${year}`
      },
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
    },
  }
</script>

<style lang="scss" scoped>
.content-wrap {
  position: relative;
  height: 600px;
  overflow: hidden;
  overflow-x: hidden;
  z-index: 0;

  .show-content {
    width: 100%;
    position: absolute;
    max-height:100%;
    overflow:auto;
  }
}

.task-create-at {
  position: absolute;
  bottom: 0;
  font-size: 14px;
  width: 100%;
  text-align: center;
  margin-bottom: 17px;
  z-index: 0;
}
</style>