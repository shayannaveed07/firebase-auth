import { createStore } from "vuex";
import router from "../router";
import  auth  from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";


export default createStore({
  state: {
    user: null,
    errorMessageRegister: [
      "Email already in use",
      "Invalid email",
      "Operation not allowed",
      "Weak password",
      "Something went wrong",

    ],
    errorMessageLogin: [
      "user not found",
      "wrong password",
      "Something went wrong",
    ],
  
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        toast.error("An unexpected error occur")
      }
      commit("setUser", auth.currentUser);
      router.push("/");
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            console.log("user");
            toast.error("Email already in use plz login"),
              {
                autoClose: 1000,
                type: "error",
              };
            break;
          case "auth/invalid-email":
            toast.error("Invalid email"),
              {
                autoClose: 1000,
                type: "error",
              };
            break;
          case "auth/operation-not-allowed":
            toast.error("Operation not allowed"),
              {
                autoClose: 1000,
                type: "error",
              };
            break;
          case "auth/weak-password":
            toast.error("Weak password"),
              {
                autoClose: 1000,
                type: "error",
              };
            break;
          case "auth/filled-in-password":
            toast.error("Plz fill in the password"),
              {
                autoClose: 1000,
                type: "success",
              };
            break;
          // default:
          //   toast.error("Something went wrong"),
          //     {
          //       autoClose: 1000,
          //       type: "error",
          //     };
        }
        return;
      }
      commit("setUser", auth.currentUser);
      router.push("/");
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("clearUser");
      router.push("/login");
     
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async (user) => {
        if (user === null) {
          commit("clearUser");
        } else {
          commit("setUser", user);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/todos");
          }
        }
      });
    },
    // googleLogin({commit}){
    //   const provider = new GoogleAuthProvider();
    //   auth.signInWithPopup(provider)
    //  .then((result) => {
    //     const user = result.user;
    //     commit("setUser", user);
    //     router.push("/");
    //   })
    //  .catch((error) => {
    //     console.log(error);
    //  });
    // }
    async googleLogin({ commit }) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        commit("setUser", user);
        router.push("/todos");
      } catch (error) {
        console.log(error);
      }
    },
  },
});
