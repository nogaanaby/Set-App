<template>
  <div class="template-div">
        <h1>Welcome</h1>
        <empty
        v-bind:cardsData = "cardsData.cardsDeckArray"
        v-bind:length = "length"></empty>
        <input placeholder="choose nickname" v-model="nickname"/>
        <p>Click here to make a POST /pvp/register request:</p>
        <button @click="pvpRegister">Register with nickname {{nickname}}</button>
        <p>Click here to get all online users:</p>
        <button @click="pvpGetOnlinePlayers">Get onlineUsers</button>
        <ul>
          <li v-for="user in onlineUsers" v-bind:key="user.index">
            <span>{{user}}</span>
          </li>
        </ul>
  </div>
</template>

<script>
import gameMenu from '@/components/nav.vue'
import empty from '@/components/empty.vue'
import { CardsDeck } from '../js/backGame'
export default {
  name: 'nissim',
  components: {
    gameMenu,
    empty
  },
  data () {
    return {
      nickname: '',
      onlineUsers: [],
      length: 9,
      cardsData: new CardsDeck()
    }
  },
  mounted () {

  },
  methods: {
    async pvpRegister () {
      await this.$axios.post('pvp/register', {
        nickname: this.nickname,
        socketId: this.$socket.id
      })
    },
    async pvpGetOnlinePlayers () {
      const response = await this.$axios.get('pvp/onlineUsers')
      this.onlineUsers = response.data
    }
  }
}
</script>
