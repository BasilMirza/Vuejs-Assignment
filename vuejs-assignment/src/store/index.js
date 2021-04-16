import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: {}
  },
  mutations: {
    abc(state, users) {
      state.users = users;
    },
    formUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    abc(context, payload) {
      // eslint-disable-next-line no-console
      console.log(context, "Payload");
      context.commit("abc", payload);
    },
    formUser({ commit }, payload) {
      commit("formUser", payload);
    }
  },
  modules: {},
  getters: {
    allUsers: state => state.users,
    registeredUser: state => state.currentUser
  }
});
