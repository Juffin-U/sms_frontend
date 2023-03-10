<template>
  <div class="hello">
    <ul v-for="sms in this.smses" :key ="sms">
      <li>
        <span style="margin-right: 5px">{{sms.content}}</span>
        <span>{{sms.message}} </span>
      </li>
    </ul>
    <p>{{message}}</p>
    <input v-model="message" placeholder="edit me" />
    <p>{{phonesNumbers}}</p>
    <textarea v-model="phonesNumbers" placeholder="add multiple lines"></textarea>
    <button v-on:click="sendPostRequest()">отправить</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {
    msg: String

  },
  data () {
    return {
      smses: null,
      phonesNumbers: '',
      message: '',
    };
  },
  methods:{
    sendPostRequest() {
      console.log(this.message, this.phonesNumbers)
      axios.post(
          'http://127.0.0.1:8000',
          {content: this.phonesNumbers, message: this.message},
          {headers: {
              'Content-Type': "application/json"
            }}
      ).then(this.fetchSmses() )
    },

    fetchSmses() {
      axios
          .get('http://127.0.0.1:8000/api/sms/list?id=1')
          .then(response => {
            console.log(response.data)
            this.smses = response.data
          })
    }
  },
  mounted () {
    this.fetchSmses()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
