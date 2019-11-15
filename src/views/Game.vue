<template>
  <div>
    <!-- <button @click="randomize()">Start</button>
    Score: {{score}}
    <div class="gameboard">
      <div v-for="(func, index) in arrPos" :key="index">
        <button @click="func(index)" :style="{opacity: isDisabled[index]}"><img class="cardback"alt="Cardback" src="../assets/cardback.jpeg"></button>
      </div>
    </div> -->

    <button @click="randomize()">Start</button>
    Score: {{score}}
    <div class="gameboard">
      <div v-for="(func, index) in arrPos" :key="index">
        <template>
          <div @click="func(index)" :style="{opacity: isDisabled[index]}"><img class="cardback"alt="Cardback" src="../assets/cardback.jpeg"></div>
        </template>
      </div>
    </div>

<!--         <vue-flip :active-click="activeOnClick" class="simple-test" width="20%" height="50px">
          <template slot="front">
            <div style="display:flex; align-items: center; justify-content: center; height:100%; width:100%">disable me!</div>
          </template>
          <template slot="back">
            <div style="display:flex; align-items: center; justify-content: center; height:100%; width:100%" @click="handleClick">back!</div>
          </template>
        </vue-flip> -->

  </div>
</template>

<script>
import Swal from 'sweetalert2'
import VueFlip from 'vue-flip'
export default({
  components: {
    'vue-flip': VueFlip
  },
  data(){
    return {
      score: 0,
      arrNew: [this.plus2, this.plus2, this.plus2, this.plus1, this.plus1, this.plus1, this.plus1, this.plus0,this.plus0,this.plus0, this.swalError, this.swalError, this.swalSuccess, this.swalSuccess, this.swalConfirm, this.swalLoading, this.swalLoading, this.swalLoading, this.swalLoading, this.swalLoading, this.swalLoading, this.swalLoading, this.swalSuccess],
      arrPos: [],
      isDisabled: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      activeOnClick: true
    }
  },
  methods: {
    randomize(){
      while(this.arrPos.length < 20){
        let index = Math.floor(Math.random() * this.arrNew.length)
        this.arrPos.push(this.arrNew[index])
        this.arrNew.splice(index, 1)
      }
    },
    handleClick(){
      this.activeOnClick = false
    },
    plus2(index){
      this.score += 2
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
    },
    plus1(index){
      this.score += 1
      this.isDisabled[index] = 0.2
      this.arrPos[index] = this.alreadyClick
    },
    plus0(index){
      this.score += 1
      this.score --
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
    },
    swalError(index){
      this.score += 1
      this.score --
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You clicked the wrong card'
      })
    },
    swalSuccess(index){
      this.score += 1
      this.score --
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
      Swal.fire(
        'Good job!',
        'You clicked the wrong card!',
        'success'
      )
    },
    swalConfirm(index){
      this.score += 1
      this.score --
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
      Swal.fire(
        'Why You Click Me?',
        'LOL',
        'question'
      )
    },
    swalLoading(index){
      this.score += 1
      this.score --
      this.arrPos[index] = this.alreadyClick
      this.isDisabled[index] = 0.2
      let timerInterval
      Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timer: 3500,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector('b')
              .textContent = Swal.getTimerLeft()
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.timer
        ) {
          console.log('I was closed by the timer') // eslint-disable-line
        }
      })
    },
    alreadyClick(index){
      console.log('sudah di klik')
    }
  }
})
</script>

<style>
  .cardback{
    height: 180px;
    width: 120px;
  }
  .gameboard{
    display: flex;
    flex-direction: row;
    align-items:flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
  }
    .front {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #673AB7;
      color: white;
    }

    .back {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFC107;
      color: white
    }
  .simple-test {
     padding: 10px;
  }

</style>
