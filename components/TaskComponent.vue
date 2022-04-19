<template>
  <div v-show="toggle" class="task-form">
    <div class="text-file-wrap">
      <hr class="hr-line" @click="$emit('toggle', false)">
      <v-text-field
        v-model="taskName"
        autofocus
        dark
        label="Title"
        class="white--text"
        outlined
        :rules="[() => !!taskName || 'This field is required']"
      />
      <v-textarea
        v-model="content"
        autofocus
        dark
        outlined
        name="input-20"
        label="Description"
        hide-details
        clearable
        no-resize
        height="424px"
      ></v-textarea>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            slot="append"
            v-model="dateFormatted"
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
        :disabled="(taskName) ? false : true"
        width="100%"
        outlined
        color="primary"
        class="add-task-btn"
        @click="onSetTask"
      >
        Add todo
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: {
      toggle: Boolean,
    },
    data: vm => {
      return {
        taskName: null,
        content: null,
        deadline: null,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
        menu: false,
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      ...mapActions(['setTask']),
      onSetTask() {
        this.setTask({name: this.taskName, content: this.content, deadline: this.date})
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

  &focus{
    position: fixed !important;
    top:50px !important;
  }
}



.v-application .transparent {  
  border-color: black !important;
}

@media (max-width:550px) { 
    body.when-keyboard-showing .header { height:0; padding:0; }
}
</style>