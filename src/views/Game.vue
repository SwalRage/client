<template>
  <div class="backs">
    <b-container fluid>
      <b-col class="contain">
        <b-row class="pemain">
          <b-col style="font-size:23px;">
            <img
              src="https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"
              style="width:40px; height:40px"
            />
            {{room.player1.name}}: {{room.player1.score}} point
          </b-col>
          <b-col style="font-size:23px;">
            <img
              src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/4-512.png"
              style="width:40px; height:40px"
            />
            {{room.player2.name}}: {{room.player2.score}} point
          </b-col>
          <b-col style="border solid 1px black; font-size:25px; color:gold;">
            <img
              src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/cup-512.png"
              style="width:40px; height:40px"
            />
            Your Score: {{room.player1.score}} point
          </b-col>
          <b-col style="font-size:23px;">
            <img
              src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar20-512.png"
              style="width:40px; height:40px"
            />
            {{room.player3.name}}: {{room.player3.score}} point
          </b-col>
          <b-col style="font-size:23px;">
            <img
              src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar17-512.png"
              style="width:40px; height:40px"
            />
            {{room.player4.name}}: {{room.player4.score}} point
          </b-col>
        </b-row>
      </b-col>
      <b-col class="cardList">
        {{finish}}
        <b-button @click="winner(true)">cek pemenang</b-button>Selamat datang di page game
        <b-btn v-if="isAdmin && room.count == 4 && showButton" @click="fetchCards">Start Game</b-btn>
        {{ room }}
        <button @click="randomize()">Start</button>
        Score: {{score}}
        <div class="gameboard">
          <div v-for="(func, index) in arrPos" :key="index">
            <template>
              <div @click="func(index)" :style="{opacity: isDisabled[index]}">
                <img class="cardback" alt="Cardback" src="../assets/cardback.jpeg" />
              </div>
            </template>
          </div>
          <b-row style="border:1px solid black">
            <b-col>
              <img
                src="https://cdn0.iconfinder.com/data/icons/avatars-6/500/Avatar_boy_man_people_account_player-512.png"
                style="width:30px; height:30px"
              />
              {{ room.player1.name }}: {{ room.player1.score }} point
            </b-col>
            <b-col>
              <img
                src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/4-512.png"
                style="width:30px; height:30px"
              />
              {{ room.player2.name }}: {{ room.player2.score }} point
            </b-col>
            <b-col>
              <img
                src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar20-512.png"
                style="width:30px; height:30px"
              />
              {{ room.player3.name }}: {{ room.player3.score }} point
            </b-col>
            <b-col>
              <img
                src="https://cdn2.iconfinder.com/data/icons/male-users-2/512/male_avatar17-512.png"
                style="width:30px; height:30px"
              />
              {{ room.player4.name }}: {{ room.player4.score }} point
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-container>
    <!-- <button @click="randomize()">Start</button>
    Score: {{score}}
    <div class="gameboard">
      <div v-for="(func, index) in arrPos" :key="index">
        <button @click="func(index)" :style="{opacity: isDisabled[index]}"><img class="cardback"alt="Cardback" src="../assets/cardback.jpeg"></button>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import VueFlip from "vue-flip";

export default {
  data() {
    return {
      isAdmin: false,
      showButton: true,
      score: 0,
      arrNew: [
        this.plus2,
        this.plus2,
        this.plus2,
        this.plus1,
        this.plus1,
        this.plus1,
        this.plus1,
        this.plus0,
        this.plus0,
        this.plus0,
        this.swalError,
        this.swalError,
        this.swalSuccess,
        this.swalSuccess,
        this.swalConfirm,
        this.swalLoading,
        this.swalLoading,
        this.swalLoading,
        this.swalLoading,
        this.swalLoading,
        this.swalLoading,
        this.swalLoading,
        this.swalSuccess
      ],
      arrPos: [],
      isDisabled: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      activeOnClick: true
    };
  },
  components: {
    "vue-flip": VueFlip
  },
  methods: {
    setAdmin() {
      if (localStorage.getItem("admin")) {
        this.isAdmin = true;
      }
    },
    fetchCards() {
      this.showButton = false;
      console.log("ketriger show cards");
    },
    winner(payload) {
      this.$store.dispatch("updatedFinish", payload);
    },
    randomize() {
      while (this.arrPos.length < 20) {
        let index = Math.floor(Math.random() * this.arrNew.length);
        this.arrPos.push(this.arrNew[index]);
        this.arrNew.splice(index, 1);
      }
    },
    handleClick() {
      this.activeOnClick = false;
    },
    plus2(index) {
      this.score += 2;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
      this.addScore(2);
    },
    plus1(index) {
      this.score += 1;
      this.isDisabled[index] = 0.2;
      this.arrPos[index] = this.alreadyClick;
      this.addScore(1);
    },
    plus0(index) {
      this.score += 1;
      this.score--;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
    },
    swalError(index) {
      this.score += 1;
      this.score--;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You clicked the wrong card"
      });
    },
    swalSuccess(index) {
      this.score += 1;
      this.score--;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
      Swal.fire("Good job!", "You clicked the wrong card!", "success");
    },
    swalConfirm(index) {
      this.score += 1;
      this.score--;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
      Swal.fire("Why You Click Me?", "LOL", "question");
    },
    swalLoading(index) {
      this.score += 1;
      this.score--;
      this.arrPos[index] = this.alreadyClick;
      this.isDisabled[index] = 0.2;
      let timerInterval;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 3500,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getContent().querySelector(
              "b"
            ).textContent = Swal.getTimerLeft();
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        }
      }).then(result => {
        if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.timer
        ) {
          console.log("I was closed by the timer"); // eslint-disable-line
        }
      });
    },
    alreadyClick(index) {
      console.log("sudah di klik");
    },
    addScore(score) {
      this.$store.dispatch("addScore", {
        roomName: this.$route.params.room_name,
        player: localStorage.getItem("player"),
        score
      });
    }
  },
  created() {
    this.$store.dispatch("getRoomDetail", this.$route.params);
    this.setAdmin();
  },
  computed: mapState(["room", "finish"]),
  watch: {
    finish(baru, old) {
      if (baru === true) {
        swal({
          title: "FINISHED",
          text: "Game has finnished, wanna play again?",
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(finish => {
          if (finish) {
            localStorage.clear("");
            this.$router.push("/");
          } else {
            localStorage.clear("");
            this.$router.push("/");
          }
        });
      }
    },
    checkFinish(baru, old) {
      if (this.$store.state.room && this.$store.state.room.finish) {
        console.log("ngecek");
        swal({
          title: "FINISHED",
          text: "Game has finnished, wanna play again?",
          icon: "info",
          buttons: true,
          dangerMode: true
        }).then(finish => {
          if (finish) {
            localStorage.clear("");
            this.$router.push("/");
          } else {
            localStorage.clear("");
            this.$router.push("/");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.contain {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #5b9aa0;
  font-family: "Eczar", serif;
}
.pemain {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #5b9aa0;
  font-family: "Eczar", serif;
}
.cardList {
  height: 90vh;
}
.cardback {
  height: 180px;
  width: 120px;
}
.gameboard {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
}
.front {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #673ab7;
  color: white;
}

.back {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc107;
  color: white;
}
.simple-test {
  padding: 10px;
}
</style>
