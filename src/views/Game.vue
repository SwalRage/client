<template>
  <div>
    Selamat datang  di page game
    <b-btn v-if="isAdmin && room.count == 4 && showButton" @click="fetchCards">Start Game</b-btn>
    {{ room }}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data(){
    return {
      isAdmin : false,
      showButton : true
    }
  },
  methods : {
    setAdmin(){
      if(localStorage.getItem('admin')){
        this.isAdmin = true
      }
    },
    fetchCards(){
      this.showButton = false
      console.log('ketriger show cards');
    }
  },
  created(){
    this.$store.dispatch('getRoomDetail',this.$route.params)
    this.setAdmin()
  },
  computed : mapState([
      'room'
    ])
}
</script>

<style>

</style>