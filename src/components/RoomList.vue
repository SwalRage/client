<template>
  <b-table
    show-empty
    :striped="true"
    :bordered="true"
    :borderless="true"
    :small="true"
    :hover="true"
    :fixed="true"
    :fields="fields"
    :items="roomList"
    head-variant="dark"
  >
    <template v-slot:cell(no)="row">{{ row.value }} {{ row.value }}</template>

    <template v-slot:cell(join)="row">
      <b-button size="sm" @click="join(row.item, row.index, $event.target)" class="mr-1" v-if="name">Join Room</b-button>
      <div v-if="!name"> please type in your name first </div>
    </template>
  </b-table>
</template>

<script>
export default {
  props : ['name'],
  data() {
    return {
      fields: [{ key: "id", label: "No." }, "room_name", "join"],
    };
  },
  methods: {
    join(item, index, button) {
    Swal.showLoading()
      let payload = {
        user_name : this.name,
        room_name : item.room_name
      }
      this.$store.dispatch('joinRoom',payload)
        .then(()=>{
          Swal.close()
        this.$router.push({path : `/game/${item.room_name}`})
        })
        .catch((err)=>{
          Swal.close()
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err}`,
          })
          console.log(err);
        })
    }
  },
  computed: {
    roomList() {
      return this.$store.state.room_list;
    }
  }
};
</script>

<style>
</style>