<template>
  <div height="100%" class="d-flex flex-column justify-end">
    <v-form class="sign-in-form">
      <v-text-field v-model="email" hide-details label="Email" outlined type="email" color="primary"/>
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
      <div class="forgot-password">Forgot Password?</div>
      <v-btn
        block
        height="48"
        color="primary"
        class="font-weight-medium py-4 mb-4"
        exact-active-class
        depressed
        large
        :class="`rounded-lg`"
        @click="onLogin"
      >
        SIGN IN
      </v-btn>
      <div class="redirec-link justify-center mb-12">
        Don't have an account?
        <nuxt-link class="pl-1 primary--text" to="/sign-up">Sign up</nuxt-link>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    layout: 'authLayout',
    data: () => {
      return {
        isShowPassword: false,
        email: null,
        password: null,
      }
    },

  }
</script>

<style lang="scss" scoped>
.v-text-field {
  padding-bottom: 16px !important;
  border-radius: 12px;
}

.v-text-field input {
  padding: 4px 0 4px 0 !important;
}

.forgot-password {
  font-size: 12px;
  text-align: right;
  padding-bottom: 16px;
}

.sign-in-form {
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