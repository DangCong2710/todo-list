<template>
  <div height="100%" class="d-flex flex-column justify-end">
    <v-form class="sign-up-form">
      <v-text-field
        v-model="email"
        hide-details
        label="Email"
        outlined
        type="email"
        color="primary"
      />
      <v-text-field
        v-model="fullName"
        hide-details
        label="Full Name"
        outlined
        color="primary"
      />
      <v-text-field
        v-model="password"
        label="Password"
        outlined
        :append-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="isShowPassword ? 'text' : 'password'"
        hide-details
        current-password
        @click:append="isShowPassword = !isShowPassword"
      />
      <v-btn
        height="48"
        block
        color="primary"
        class="font-weight-medium py-4 my-4"
        exact-active-class
        depressed
        large
        :class="`rounded-lg`"
        @click="onSubmit"
      >
        SIGN UP
      </v-btn>
      <div class="redirec-link justify-center mb-12">
        Already have account?
        <nuxt-link class="pl-1 primary--text" to="/sign-in">Sign in</nuxt-link>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
  export default {
    layout: 'authLayout',
    data: () => {
      return {
        isShowPassword: false,
        email: null,
        password: null,
        fullName: null,
      }
    },
    computed: {
       ...mapState(['userProfile'])
    },
    methods: {
     
      ...mapActions(['signUp']),
      onSubmit() {
        this.signUp({email: this.email, password: this.password, fullName: this.fullName})
        if(this.userProfile) this.$router.push({path: "/sign-in"});
      }
    },
  }
</script>

<style lang="scss" scoped>
.v-text-field {
  padding-bottom: 16px !important;
  border-radius: 12px;
}

.forgot-password {
  font-size: 12px;
  text-align: right;
  padding-bottom: 16px;
}

.sign-up-form {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.redirec-link {
  display: flex;
  flex-direction: row !important;
  font-size: 12px;
  a {
    text-decoration: none;
  }
}

</style>