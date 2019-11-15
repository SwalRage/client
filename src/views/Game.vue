<template>
  <div>
    <b-container fluid>
    <b-col class="pemain" style="border:1px solid black;">
      <div>
      <img src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/cup-512.png" style="width:30px; height:30px">
      Score Anda : 10 point
      </div>
      <b-row style="border:1px solid black">
        <b-col >
          <img src="https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png" style="width:30px; height:30px"> {{room.player1.name}}: {{room.player1.score}} point
        </b-col>
        <b-col >
          <img src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/4-512.png" style="width:30px; height:30px"> {{room.player2.name}}: {{room.player2.score}} point
        </b-col>
        <b-col >
          <img src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar20-512.png" style="width:30px; height:30px"> {{room.player3.name}}: {{room.player3.score}} point
        </b-col>
        <b-col >
          <img src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar17-512.png" style="width:30px; height:30px"> {{room.player4.name}}: {{room.player4.score}} point
        </b-col>
      </b-row>
    </b-col>
    <b-col class="cardList">
      {{finish}} 
      <b-button @click="winner(true)"> cek pemenang</b-button>
      Selamat datang  di page game
    <b-btn v-if="isAdmin && room.count == 4 && showButton" @click="fetchCards">Start Game</b-btn>
    {{ room }}
    </b-col>
</b-container>
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
    },
    winner(payload){
      this.$store.dispatch('updatedFinish', payload)
    },
  },
  created(){
    this.$store.dispatch('getRoomDetail',this.$route.params)
    this.setAdmin()
  },
  computed : mapState([
      'room',
      'finish'
  ]),
  watch: {
    finish(baru, old){
      console.log(baru, old)
      if(baru === true){
        swal({
          title: "FINISHED",
          text: "Game has finnished, wanna play again?",
          icon: "info",
          buttons: true,
          dangerMode: true,
        })
        .then((finish) => {
          if (finish) {
            localStorage.clear('')
            this.$router.push('/')
          } else {
            localStorage.clear('')
            this.$router.push('/')
          }
        });
      }
    }
  }
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