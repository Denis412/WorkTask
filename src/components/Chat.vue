<template>
  <div>
    <h1>Chat Room</h1>
    <div v-if="!connected">Connecting...</div>
    <div v-else>
      <div>
        <label>Username:</label>
        <input v-model="username" />
      </div>
      <div>
        <label>Room Name:</label>
        <input v-model="roomName" />
      </div>
      <div>
        <button @click="joinRoom">Join Room</button>
      </div>
      <div>
        <label>Message:</label>
        <input v-model="message" />
        <button @click="sendMessage">Send</button>
      </div>
      <div>
        <ul>
          <li v-for="message in messages" :key="message.id">
            {{ message.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ChatEngine } from "chat-engine";
import VueChatEngine from "vue-chat-engine";

export default defineComponent({
  name: "ChatRoom",
  components: {
    VueChatEngine,
  },
  data() {
    return {
      username: "",
      roomName: "",
      message: "",
      messages: [],
      connected: false,
    };
  },
  methods: {
    joinRoom() {
      const chatEngine = ChatEngine.create(
        {
          publishKey: "pub-c-c8445bc4-b284-4c7f-a8e3-0413f748fc7f",
          subscribeKey: "sub-c-c478516a-8176-4d5e-a0ab-d4e9f21de87a",
          secretKey: "sec-c-ZjEzODAzN2YtMTNhNi00MTBhLWFjZGEtYTZkYTEzYjBkZjE2",
        },
        {
          globalChannel: "chat-engine-demo-js",
        }
      );

      chatEngine.connect(
        this.username,
        {
          signedOnTime: Date.now(),
        },
        "auth-key"
      );

      chatEngine.once("$.ready", () => {
        this.connected = true;

        this.$chatEngine.setUser(
          {
            id: this.username,
            name: this.username,
          },
          "auth-key"
        );

        const chat = new this.$chatEngine.Chat(this.roomName);
        chat.on("$.connected", () => {
          chat
            .search({
              event: "message",
              limit: 50,
            })
            .on("message", (data) => {
              this.messages.push(data.data);
            });
        });
      });
    },
    sendMessage() {
      const chat = new this.$chatEngine.Chat(this.roomName);
      chat.emit("message", {
        text: this.message,
      });
      this.message = "";
    },
  },
});
</script>
