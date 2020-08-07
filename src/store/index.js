import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";
import keto from './keto.json'
import paleo from './paleo.json'
import vegan from './vegan.json'

import firebase from '@/firebase'
import router from '@/router'
import { find, pick, filter, map } from 'lodash'

Vue.use(Vuex)

// TODO: use the real API one day
// Reason why I haven't done it yet is because I would need a pagination or infinite load more
// otherwise, the stored data is the same
// const API_URL = "https://api.edamam.com/search";
// const API_ID = "";
// const API_KEY = "";

export default new Vuex.Store({
  state: {
    meals: [],
    user: null,
    isAuthenticated: false,
    orderedMeals: [],
  },
  mutations: {
    setMeals(state, payload) {
      state.meals = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setOrderedMeals(state, payload) {
      state.orderedMeals = payload
    },
    addMealToOrder(state, payload) {
      state.orderedMeals.push(payload)
    },
    removeOrderedMeal(state, meal) {
      state.orderedMeals = filter(state.orderedMeals, (x) => x.uri !== meal.uri)
    },
  },
  actions: {
    getMeals({ commit }, plan) {
      let planData
      switch (plan) {
        case 'Keto':
          planData = keto
          break
        case 'Paleo':
          planData = paleo
          break
        case 'Vegan':
          planData = vegan
          break
        default:
          planData = keto
          break
      }

      commit('setMeals', planData.hits)
    },
    userLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          commit('setUser', user)
          router.push('/menu')
        })
        .catch(() => {
          commit('setUser', null)
          router.push('/')
        })
    },
    userJoin({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          commit('setUser', user)
          router.push('/menu')
        })
        .catch(() => {
          commit('setUser', null)
          router.push('/')
        })
    },
    userSignOut({ commit }) {
      commit('setOrderedMeals', null)

      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
          router.push('/')
        })
        .catch(() => {
          commit('setUser', null)
          router.push('/')
        })
    },
    orderMeal({ commit, state }, payload) {
      commit('addMealToOrder', payload)

      firebase
        .database()
        .ref('users')
        .child(state.user.user.uid)
        .push(pick(payload, ['uri', 'label', 'image', 'ingredientLines']))
    },
    getOrderedMeals({ state, commit, getters }) {
      if (getters.isAuthenticated)
        return firebase
          .database()
          .ref('users/' + state.user.user.uid)
          .once('value', (snapshot) => {
            commit(
              'setOrderedMeals',
              map(snapshot.val(), (x, y) => ({
                ...x,
                id: y,
              })),
            )
          })
    },
    removeMeal({ commit, state }, meal) {
      commit('removeOrderedMeal', meal)
      return firebase
        .database()
        .ref('users/' + state.user.user.uid)
        .child(meal.id)
        .remove()
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    },
    getOrderedMeal(state) {
      return (mealId) => find(state.orderedMeals, ['uri', mealId])
    },
  },
})
