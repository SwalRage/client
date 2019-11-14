<template>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return{
      
    }
  },
  computed: 
    mapState([
      'room',
      'finish'
    ]),
  created(){
    this.$store.dispatch('getRoomDetail')
  },
  methods: {
    
  },
  
}
</script>

<style scoped>
  .pemain{
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Noto Sans KR', sans-serif;
  }
  .cardList{
    height: 90vh;
  }
</style>
