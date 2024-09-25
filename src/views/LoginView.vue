<template>
  <main class="login">
    <section class="forms">
      <form class="register" @submit.prevent="register">
        <h2>Register:</h2>
        <input
        required
          type="email"
          placeholder="Enter Email"
          v-model="register_form.email"
        />
        <input
        required
          type="password"
          placeholder="Enter Password"
          v-model="register_form.password"
        />
        <input type="submit" value="Register" />
        <button class="g-btn" v-on:click="signupgoogle">
          <img src="../assets/google1.png" alt="" class="google-logo">
         
          <h4 class="mt-4">Sign up with Google</h4>
        </button>
        
      </form>
      <form class="login" @submit.prevent="login">
        <h2>Login:</h2>
        <input
        required
          type="email"
          placeholder="Enter Email"
          v-model="login_form.email"
        />
        <input
        required
          type="password"
          placeholder="Enter Password"
          v-model="login_form.password"
        />
        <input type="submit" value="Login" />
        <button class="g-btn" type="submit" v-on:click="signingoogle">
          <img src="../assets/google1.png" alt="" class="google-logo1">
          <h4 class = "mt-4">Sign in with Google</h4>
        </button>
      </form>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { GoogleAuthProvider } from "firebase/auth";

export default {
  name: "LoginView",

  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();

    const login = () => {
      store.dispatch("login", login_form.value);
    };
    const register = () => {
      store.dispatch("register", register_form.value);
    };
    const signupgoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await store.dispatch("googleLogin", provider);
      console.log(result);
    };
    const signingoogle = async () => {
      const provider = new GoogleAuthProvider();
      const result = await store.dispatch("googleLogin", provider);
      console.log(result);
    };

    return {
      login_form,
      register_form,
      login,
      register,
      signupgoogle,
      signingoogle
    };
  },
};
</script>

<style scoped>
.g-btn{
  display: flex;
  margin:0 auto
}
.google-logo{
  width:13%;
  display:flex
}
.google-logo1{
  width:13%;
  color:black;
  display:flex

}
.forms {
  display: flex;
  min-height: 100vh;
}
form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;
}
form.register {
  color: #fff;
  background-color: #000;
  background-image: to bottom right, #000000 0% rgb(27, 26, 26) 100%;
}
form.login {
  color: #000000 ;
  background-color: #ffffff !important;
  /* background-image: to bottom right, #000000 0% rgb(255, 255, 255) 100%; */
}
.register input:not([type="submit"]) {
  color: #fff;
  border-bottom: 1px solid #fff;
}
.login input:not([type="submit"]) {
  border-bottom: 1px solid #000 ;
}
form.register input[type="submit"] {
  background-color: #fff;
  color: #000;
}
.login input[type="submit"] {
  background-color: #000 ;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
}
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}
input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}
input:focus:not([type="submit"]) {
  opacity: 1;
}
input::placeholder {
  color: inherit;
}
</style>
