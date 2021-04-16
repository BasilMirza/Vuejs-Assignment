<template>
  <div class="home">
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Email
            </th>
            <th class="text-left">
              Phone
            </th><th class="text-left">
              Actions
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in posts" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <v-btn v-on:click= 'updateUsers(user.id)' text color='primary'>
              Update
            </v-btn>
            <v-btn v-on:click= 'deleteUsers(user.id)' text color="error">
              Delete
            </v-btn>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      const result = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.posts = result.data;
      this.$store.dispatch('abc', this.posts);
      console.log(this.posts);
    },
    async created() {
      const article = {
        id: 800,
        title: "Post method using Axios"
      };
      const headers = {
        "content-type": "application/json",
        charset: "UTF-8"
      };
      const myResult = await axios.post("https://jsonplaceholder.typicode.com/users", article, {
        headers
      });
      console.log(myResult);
    },
    async updateUsers(id) {
      console.log(id);
      const updatedUser = {
        id: 100,
        title: "Updated User"
      };
      const headers = {
        "content-type": "application/json",
        charset: "UTF-8"
      };
      const url = "https://jsonplaceholder.typicode.com/users";
      const myRes = await axios.put(`${url}/${id}`, updatedUser, { headers });
      this.$store.dispatch('abc', this.posts);
      console.log(myRes);
    },
    async deleteUsers(id) {
      const url = "https://jsonplaceholder.typicode.com/users";
      const newResult = await axios.delete(`${url}/${id}`);
      console.log(newResult);
    }
  }
};
</script>
