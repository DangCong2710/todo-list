<template>
  <div class="pb-2">
    <div class="d-flex justify-space-between flex-row align-center mt-n1 mx-n3">
      <div class="">
        <v-btn text rounded>
          <img :src="require(`~/assets/fonts/arrow-left.png`)" @click="onRedirect">
        </v-btn>
      </div>
      <div class="">
        <v-menu
          bottom
          offset-y
          origin="center center"
          transition="scale-transition"
          class="deadline-check"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              text
              rounded
              v-bind="attrs"
              v-on="on"
            >
              <img :src="require(`~/assets/fonts/clock.png`)">
            </v-btn>
          </template>

          <v-list class="deadline-check pa-0">
            <div class="deadline-check py-1 px-2 font-weight-medium">
              Deadline of this task is <p class="ma-0 text-center font-weight-bold"> {{ deadline }} </p>
            </div>
          </v-list>
        </v-menu>

        <v-btn text rounded @click="onEditTask">
          <img :src="require(`~/assets/fonts/edit.png`)">
        </v-btn>
        <v-btn text rounded @click="overlay = !overlay">
          <img :src="require(`~/assets/fonts/trash.png`)">
        </v-btn>
      </div>
    </div>
    <v-row justify="end">
      <v-overlay
        :z-index="zIndex"
        :value="overlay"
      >
       <div class="d-flex flex-column">
         <v-btn
          class="primary--text mb-4"
          color="white"
          full-width
          @click="onDeleteTask"
        >
          Delete TODO
        </v-btn>
        <v-btn
          class="green--text"
          color="white"
          @click="overlay = false"
        >
          Cancel
        </v-btn>
       </div>
      </v-overlay>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: {
      // eslint-disable-next-line vue/require-default-prop
      deadline: String,
    },
    data: () => ({
      overlay: false,
      zIndex: 1,
      onEdit: true,
    }),
    methods: {
      ...mapActions(['deleteTask','handleClickEditTask']),
      onRedirect() {
        this.$router.back()
      },
      onDeleteTask() {
        this.deleteTask({id: this.$route.query.id})
        this.$router.back()
      },
      onEditTask() {
        return this.handleClickEditTask({onEdit: this.onEdit})
      }
    },
  }
</script>

<style lang="scss" scoped>
.v-btn {
  padding: 8px !important;
  width: auto !important;
  min-width: 24px !important;
  height: auto !important;
}

.deadline-check {
  background-color: #F76C6A;
  color: white;
  border-radius: 12px !important; 
}

.v-menu__content {
  border-radius: 12px !important; 
}

</style>