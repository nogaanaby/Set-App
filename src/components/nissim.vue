<template>
  <div>
    <h1>Welcome</h1>
    <input placeholder="choose nickname" v-model="nickname"/>
    <p>Click here to make a POST /pvp/register request:</p>
    <button @click="pvpRegister">Register with nickname {{nickname}}</button>
    <p>Click here to get all online users:</p>
    <button @click="pvpGetOnlinePlayers">Get onlineUsers</button>
    <ul>
      <li v-for="user in onlineUsers">
        <span>{{user}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nissim',
  components: {
  },
  data () {
    return {
      nickname: '',
      onlineUsers: []
    }
  },
  mounted () {
  },
  methods: {
    pvpRegister () {
      this.$axios.post('pvp/register', {
        nickname: this.nickname,
        socketId: this.$socket.id
      })
    },
    async pvpGetOnlinePlayers () {
      const response = await this.$axios.get('pvp/onlineUsers')
      console.log(response)
      this.onlineUsers = response.data
    }
  }
}
</script>

