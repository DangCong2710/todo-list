<template>
  <div v-if="taskData" v-show="onEvent" class="task-form">
    <div class="text-file-wrap">
      <hr class="hr-line" @click="onEditTask">
      <v-text-field
        v-model="taskData.name"
        dark
        label="Title"
        class="white--text"
        outlined
      />
      <v-textarea
        v-model="taskData.content"
        dark
        outlined
        name="input-20"
        label="Description"
        hide-details
        clearable
        no-resize
        height="424px"
      />
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="taskData.deadline"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            slot="append"
            :v-model="taskData.deadline"
            :value="computedDateFormatted"
            dark
            label="Deadline"
            class="white--text"
            clearable
            readonly
            outlined
            hide-details
            v-bind="attrs"
            v-on="on"
          >
            <template slot="append">
              <v-icon
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              mdi-calendar
            </v-icon>
            </template>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
      <v-btn
        width="100%"
        outlined
        color="primary"
        class="add-task-btn"
        @click="onUpdateTask"
      >
        Update todo
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    data: () => {
      return {
        taskData: {},
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
      }
    },
    computed: {
      ...mapState(['taskTodos','onEvent']),
      taskById() {
        return this.taskTodos.filter(task => task.id === this.$route.query.id)
      },
      computedDateFormatted () {
        return this.formatDate(this.taskData.deadline)
      },
    },
    created() {
      this.getTasks()
    },
    mounted() {
      this.taskDataHandel()
    },
    methods: {
      ...mapActions(['getTasks','updateTask','handleClickEditTask']),
      onEditTask() {
        return this.handleClickEditTask(!this.onEvent);
      },
      taskDataHandel() {
        this.taskData = this.taskById[0]
        return this.taskData
      },
      onUpdateTask() {
        this.updateTask({
          id: this.taskData.id,
          name: this.taskData.name,
          content: this.taskData.content,
          deadline: this.taskData.deadline,
        })
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
.task-form {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 722px; 
  transition: 2s ease-in-out all;

}
.text-file-wrap {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;
  display: flex; 
  flex-direction: column;
  align-items: center;
  background-color: #F79E89;
  width: 100%;
  padding: 0 24px;
  height: 100%;

  *:focus {
    outline: none;
  } 
}
.hr-line {
  margin: 16px 0 20px 0;
  width: 80px;
  height: 4px;
  border: none;
  border-radius: 12px;
  background-color: white;
}

.add-task-btn {
  border-radius: 12px;
  height: 48px !important;
  margin-bottom: 24px;
  background-color: white;
}

.v-text-field {
  width: 100%;
  color: white ;
  border-radius: 12px;
  border-width: 2px !important;
}

.v-application .transparent {  
  border-color: black !important;
}
</style>