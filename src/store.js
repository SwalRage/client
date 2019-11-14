import Vue from 'vue'
import Vuex from 'vuex'
import db from '../config/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: {},
    finish: false
  },
  mutations: {
    SET_ROOM(state, payload){
      state.room = payload
      console.log(payload)
    },
    SET_FINISH(state, payload){
      console.log(payload)
      state.finish = payload.finish
    }
  },
  actions: {
    getRoomDetail(context, payload){
      db.collection('rooms')
        .doc(`lagi`)
        .onSnapshot((doc) => {
          console.log(doc.data())
          context.commit('SET_ROOM', doc.data())
          context.commit('SET_FINISH', doc.data())
        })
    },
    updatedFinish(context, payload){
      console.log(payload, 'updateddd action')
      db.collection('rooms')
        .doc('lagi')
        .update({
          finish: payload
        })
        context.commit('SET_FINISH',payload)
    }
  }
})
