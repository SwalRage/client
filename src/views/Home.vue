<template>
  <div id="content">
    <b-jumbotron bg-variant="primary" text-variant="white" fluid>
      <template slot="header">SWAL RAGE</template>
      <template slot="lead">Pick a room or create new one!</template>
    </b-jumbotron>
    <b-container>
      <b-form inline class="mb-3">
        <b-form-group label="Your Name:" label-for="username">
          <b-input-group class="mx-3" prepend="@">
            <b-form-input
              prepend="@"
              id="username"
              v-model="username"
              required
              placeholder="abcdefg"
            ></b-form-input>
            <!-- Required diatas ngga jalan ? -->
          </b-input-group>
        </b-form-group>
      </b-form>
      <RoomList :name="username"></RoomList>
      <b-form inline @submit.prevent="onSubmitRoom">
        <b-form-group label="Create New Room:" label-for="room_name">
          <b-input-group class="mx-3">
            <b-form-input id="room_name" v-model="room_name" required placeholder="swalisdangerous"></b-form-input>
          </b-input-group>
        </b-form-group>

        <b-button type="submit" variant="primary" v-if="username">Submit</b-button>
        <div v-if="!username">Please type in your name first</div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomList from "@/components/RoomList";

export default {
  name: "home",
  components: {
    RoomList
  },
  data() {
    return {
      room_name: "",
      username: ''
    };
  },
  methods: {
    onSubmitRoom() {
      Swal.showLoading()
      let payload = {
        room_name : this.room_name,
        username : this.username
      }
      this.$store.dispatch('checkRoom',payload)
        .then(()=>{
          Swal.close()
          this.$router.push({path : `/game/${this.room_name}`})
          this.room_name=''
          this.username=''
        })
        .catch((err)=>{
          Swal.close()
          this.room_name=''
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err}`,
          })
          console.log(err)
        })
    }
  },
  created(){
    this.$store.dispatch('getAllRooms')
  }
};
</script>

<style scoped>
#content{
  margin-bottom: 30px
}
</style>