<template>
  <v-app style="position: relative;">
    <v-main class="mx-6 mt-12">
      <div class="d-flex justify-center flex-row align-center">
        <img :src="require(`~/assets/images/todolist-header.png`)">
      </div>
        <Nuxt />
      <div>
        <div class="plus-circle" @click="onToggle = !onToggle">
          <img :src="require(`~/assets/images/plus-circle.png`)" />
        </div>
        <div class="">
          <task-component :toggle="onToggle" @toggle="toggle"/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import TaskComponent from '@/components/TaskComponent.vue';
  export default {
    name: 'DefaultLayout',
    components: { TaskComponent },
    data: () => {
      return {
        onToggle: false,
      }
    },
    methods: {
      toggle(e) {
        this.onToggle = e;
      },
    }
  }
</script>

<style lang="scss" scoped>
.plus-circle {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 72px;
  height: 72px;
  object-fit: cover;
  margin: 0 18px 18px 0;
}
</style>