import Vue from "vue";
import Vuex from "vuex";
import db from "../config/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    room_list: [],
    room: {},
    finish: false
  },
  mutations: {
    SET_ROOM_LIST(state, payload) {
      state.room_list = [];
      state.room_list = payload;
    },
    EMPTY_ROOM_LIST(state, payload) {
      state.room_list = [];
    },
    SET_MY_ROOM(state, payload) {
      state.room = payload;
    },
    SET_FINISH(state, payload) {
      state.finish = payload;
    }
  },
  actions: {
    getAllRooms(context, payload) {
      let rooms = [];
      db.collection("rooms")
        .where("count", "<", 4)
        .onSnapshot(doc => {
          rooms = [];
          let a = 0;
          doc.forEach(el => {
            rooms.push({
              id: a + 1,
              room_name: el.id
            });
            a++;
          });
          context.commit("SET_ROOM_LIST", rooms);
        });
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        let obj = {};
        for (let i = 1; i <= 4; i++) {
          let temp = `player${i}`;
          obj[temp] = {
            name: "",
            score: ""
          };
        }
        obj.finish = false;
        obj.count = 1;
        obj.player1 = {
          name: payload.username,
          score: 0
        };
        db.collection("rooms")
          .doc(`${payload.room_name}`)
          .set(obj)
          .then(docRef => {
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    checkRoom(context, payload) {
      return new Promise((resolve, reject) => {
        console.log("masuk checkroom");
        db.collection("rooms")
          .doc(`${payload.room_name}`)
          .get()
          .then(doc => {
            if (!doc.exists) {
              context
                .dispatch("createRoom", payload)
                .then(() => {
                  resolve();
                })
                .catch(err => {
                  reject(err);
                });
            } else {
              reject("Room already built");
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    joinRoom(context, payload) {
      return new Promise((resolve, reject) => {
        db.collection("rooms")
          .doc(`${payload.room_name}`)
          .get()
          .then(data => {
            let room = data.data();
            let payloadUpdate = {
              count: room.count + 1,
              name: payload.user_name,
              roomName: payload.room_name
            };
            context
              .dispatch("updateRoom", payloadUpdate)
              .then(() => {
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          });
      });
    },
    updateRoom(context, payload) {
      return new Promise((resolve, reject) => {
        let updateVal = {
          [`player${payload.count}`]: {
            name: payload.name,
            score: 0
          },
          count: payload.count
        };
        localStorage.setItem("player", `player${payload.count}`);

        db.collection("rooms")
          .doc(`${payload.roomName}`)
          .update(updateVal)
          .then(() => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getRoomDetail(context, payload) {
      return new Promise((resolve, reject) => {
        db.collection("rooms")
          .doc(`${payload.room_name}`)
          .onSnapshot(room => {
            console.log(room.data());
            console.log(payload.room_name);
            context.commit("SET_MY_ROOM", room.data());
          });
      });
    },
    updatedFinish(context, payload) {
      console.log(payload, "updateddd action");
      db.collection("rooms")
        .doc(`${payload.room_name}`)
        .update({
          finish: payload
        });
      context.commit("SET_FINISH", payload);
    },
    addScore(context, payload) {
      return db.runTransaction(transaction => {
        const roomRef = db.collection("rooms").doc(payload.roomName);

        return transaction.get(roomRef).then(roomDoc => {
          roomDoc = roomDoc.data();
          console.log(payload.player);
          console.log(roomDoc);
          roomDoc[payload.player].score += payload.score;
          console.log(roomDoc);
          transaction.set(roomRef, roomDoc);
          if (roomDoc[payload.player].score >= 10) {
            transaction.update(roomRef, { finish: true });
          }
          console.log("sukses?");
          return Promise.resolve();
        });
      });
    }
  }
});
