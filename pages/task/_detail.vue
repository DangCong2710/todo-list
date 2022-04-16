<template>
  <div>
  <edit-task-component />
  </div>
</template>

<script>
import EditTaskComponent from '~/components/EditTaskComponent.vue'
  export default {
  components: { EditTaskComponent },
    layout: 'taskDetailLayout',
  }
</script>

<style lang="scss" scoped>

</style>