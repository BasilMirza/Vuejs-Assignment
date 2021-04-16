<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        name="phoneNumber"
        :rules="{
          required: true,
          digits: 7,
          regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$'
        }"
      >
        <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Phone Number"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>

      <!-- <v-row justify="center">
    <v-date-picker v-model="picker"></v-date-picker>
  </v-row> -->

      <v-btn @click="submitForm" class="mr-4" type="submit" :disabled="invalid">
        Register
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import axios from 'axios';
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})"
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}"
});

extend("email", {
  ...email,
  message: "Email must be valid"
});
export default {
  name: "register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: "",
    phoneNumber: "",
    email: ""
    // picker: new Date().toISOString().substr(0, 10),
  }),

  methods: {
    async submitForm(e) {
      e.preventDefault();
      if (this.$refs.observer.validate()) {
        const tempObj = {
          name: this.name,
          phone: this.phoneNumber,
          email: this.email,
          
        };
        const headers = {
          "Content-type": "application/json",
          charset: "UTF-8"
        };
        const myResponse = await axios.post("https://jsonplaceholder.typicode.com/users", tempObj, {
          headers
        });
        // eslint-disable-next-line no-console
        console.log(myResponse);
        this.$store.dispatch("formUser", myResponse.data);
        this.$router.push({ name: "UserDetails" });
      }
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.$refs.observer.reset();
    }
  }
};
</script>
