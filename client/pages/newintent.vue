 <template>
   <section class="new-intent-create">
      
      <h1 class="text-center">New Aim</h1>
      <nuxt-link tag="span" class="close-button" to="/" exact></nuxt-link>
   
    <div class="forms-intent-edit forms">
        <span v-if="error" class="pure-form-message">Error message: {{error}}</span>
        <span v-if="message" class="success-message">{{message}}</span>
      <form @submit.stop.prevent="createIntent" class="pure-form pure-form-stacked">
        <p>
          <label for="intent-name">Aim Name</label>
          <input ref="createintent" v-model="name" id="intent-name" type="text" placeholder="Enter Aim Name" autofocus>
        </p>
        <p>
          <label for="intent-cost">Cost</label>
          <input @keyup="changeIntent" v-model="cost" id="intent-cost" type="number" placeholder="Enter Aim Cost">
        </p>
    
        <div class="intent-edit-buttons">
          <button :disabled="loading" type="submit" class="eb submit-button pure-button pure-button-primary button-primary">Create Aim</button>
          <nuxt-link to="/" tag="button" class="eb submit-button pure-button pure-button-danger button-error">Cancel</nuxt-link>
        </div>
      </form>
    </div>
   </section>
 </template>

<script>
export default {
  layout: 'forms',
  data() {
    return {
      loading: false,
      error: null,
      message: null,
      name: null,
      cost: null
    }
  },
  computed: {
    
  },
  mounted() {
    this.$refs.createintent.focus();
  },
  methods: {
    changeIntent() {
      if (this.cost >= 10000) {
        this.cost = 10000;
      }
    },
    async createIntent() {
      let obj = {
        name: this.name,
        cost: this.cost,
        done: false
      }
      try {
        this.loading = true;
        const {data} = await this.$axios.post('/intents', obj);

        if (!data.success) {
          this.loading = false;
          this.error = data.error;
        }else {
          
          this.error = null;
          this.$router.push('/');
        }
        
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    }
  } 
}
</script>