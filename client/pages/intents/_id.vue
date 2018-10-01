<template>
  <section v-if="intent" class="intent-single">
    <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
    <span v-if="message" class="success-message">{{message}}</span>
    <div :class="{ done: intent.done }" class="intent-done">
      <h3><span>Aim: </span>{{intent.name | truncate(15)}}</h3>
      <div class="cost">{{intent.cost}}</div>
    </div>
    
    <div class="btns">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <button class="button-error pure-button">Delete</button>
        </div>
        <div v-if="!intent.done" class="pure-u-1-3">
          <button class="button-secondary pure-button">Edit</button>
        </div>
        <div v-if="!intent.done" class="pure-u-1-3">
          <button @click="getDone" class="button-success pure-button">Done</button>
        </div>
      </div>
    </div>
    <p class="text-center">
      <nuxt-link tag="a" class="text-center" to="/" exact>Return to Home Screen</nuxt-link>
    </p>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data(){
    return {
      error: null,
      loading: false,
      message: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    intent() {
      return this.$store.getters['intent/item']
    }
  },
  async fetch({ store, $axios, params }) {
    store.commit('intent/emptyIntent');
    const {data} = await $axios.get(`/intents/${params.id}`)
    // console.log(data.intent)
    store.commit('intent/add', data.intent);
  },
  methods: {
	  async getDone() {
      try {
        // this.$store.commit('intents/doneIntent', this.intent)
        this.loading = true;
        const {data} = await this.$axios.put(`/intents/${this.id}`, {
          done: true
        })
        if (!data.success) {
          this.message = null;
          this.error = data.error;
        }else {
          this.error = null;
          this.message = data.message;
          this.$store.commit('intent/done', data.success);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    }
  }
}
</script>

