<template>
  <section v-if="intent" class="intent-single">
    <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
    <span v-if="message" class="success-message">{{message}}</span>

<!-- EDIT BLOCK -->
    <div v-if="edit" class="forms-intent-edit forms">
      <h1 class="text-center">Edit Aim</h1>
      <form @submit.stop.prevent="editIntent" class="pure-form pure-form-stacked">
        <p>
          <label for="intent-name">Aim Name</label>
          <input v-model="intent.name" id="intent-name" type="text" placeholder="Enter Name" autofocus>
        </p>
        <p>
          <label for="intent-cost">Cost</label>
          <input v-model="intent.cost" id="intent-cost" type="number" placeholder="Enter Cost">
        </p>
    
        <div class="intent-edit-buttons">
          <button :disabled="loading" type="submit" class="eb submit-button pure-button pure-button-primary button-primary">Edit</button>
          <span @click="cancel" class="eb submit-button pure-button pure-button-danger button-error">Cancel</span>
        </div>
      </form>
    </div>

    <div v-if="!edit" class="intent-block">
      <div :class="{ done: intent.done }" class="intent-done">
        <span v-if="!intent.done"><span v-if="intent.ready" class="ready-aim-single"><span>READY</span></span></span>
        <h3><span>Aim: </span>{{intent.name | truncate(15)}}</h3>
        <div class="cost">{{intent.cost}}</div>
      </div>
      
      <div class="btns">
        <div class="pure-g">
          <div class="pure-u-1-3">
            <button @click="deleteIntent" class="button-error pure-button">Delete</button>
          </div>
          <div v-if="!intent.done" class="pure-u-1-3">
            <button @click="editIn" class="button-secondary pure-button">Edit</button>
          </div>
          <div v-if="!intent.done" class="pure-u-1-3">
            <button v-if="intent.ready" @click="getDone" class="button-success pure-button">Done</button>
          </div>
        </div>
      </div>
      <p class="text-center">
        <nuxt-link tag="a" class="text-center" to="/" exact>Return to Home Screen</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import totalSavedValue from '~/helpers/totalSavedValue';
export default {
  data(){
    return {
      error: null,
      loading: false,
      message: null,
      edit: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    initIntent() {
      return this.$store.getters['intent/item']
    },
    intent() {
      if (!this.initIntent) {return false}
      let r = this.totalSaved - this.aimsReached - this.initIntent.cost;
      if (r < 0) {
        return {
        ...this.initIntent,
        ready: false
        }
      } else {
        return {
        ...this.initIntent,
        ready: true
        }
      }
    },
    totalSaved() {
      return totalSavedValue(this.$store.getters['loggedInUser']);
    },
    aimsReached() {
      return this.$store.getters['intents/aimsReached'];
    }
  },
  async fetch({ store, $axios, params }) {
    store.commit('intent/emptyIntent');
    const {data} = await $axios.get(`/intents/${params.id}`);
    store.commit('intent/add', data.intent);
  },
  methods: {
    cancel() {
      this.edit = false;
    },
    editIn() {
      this.edit = true;
      this.error = null;
      this.message = null;
      this.loading = false;
    },
	  async getDone() {
      this.loading = true;
      try {
        const {data} = await this.$axios.put(`/intents/${this.id}`, {
          done: true
        })
        this.loading = false;
        if (!data.success) {
          this.message = null;
          this.error = data.error;

        }else {
          this.error = null;
          this.message = data.message;
          this.$store.commit('intent/done', data.success);
        }
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    },
    async deleteIntent() {
      let conf = confirm('Delete Aim?');
      this.loading = true;
      if (!conf) {return}
      try {
        const {data} = await this.$axios.delete(`/intents/${this.id}`)
        this.loading = false;
        if (!data.success) {
          this.message = null;
          this.error = data.error;
        }else {
          this.$store.commit('intent/emptyIntent');
          this.$router.push('/');
        }
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    },
    async editIntent() {
      this.loading = true;
      try {
        let obj = {
          name: this.intent.name,
          cost: this.intent.cost,
          done: false
        }
        const {data} = await this.$axios.put(`/intents/${this.id}`, obj)
        this.loading = false;
        if (!data.success) {
          this.message = null;
          this.error = data.error;
        }else {
          this.error = null;
          this.message = data.message;
          this.edit = false;
          this.$store.commit('intent/emptyIntent');
          this.$store.commit('intent/add', obj);
        }
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    }
  }
}
</script>

