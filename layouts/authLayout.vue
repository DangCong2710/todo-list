<template>
  <v-app>
    <v-main class="px-6">
      <div class="d-flex justify-center">
        <img :src="require(`~/assets/images/logo.png`)" width="187" height="180" alt="Logo picture" />
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
img {
  margin-top: 160px;
}
</style>