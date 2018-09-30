<template>
  <section>
    <h2>Aims</h2>
    <div v-if="intents" class="intents-container">
    	<div v-for="intent in intents" :key="intent.id" class="intent">
    		<div class="intent-inner">
    			<span>{{intent.name}}</span>
    			<span>{{intent.cost}}</span>
    			<span>{{intent.done}}</span>
    		</div>
    	</div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'homepage',
  data() {
  	return {
  		error: null
  	}
  },
  computed: {
    filteredList() {
      return this.intents.filter(intents => {
        return intent.name.toLowerCase().includes(this.query.toLowerCase())
      })
    },
    intents() {
      return this.$store.getters['intents/list']
    }
  },
  async fetch({ store, $axios }) {
    store.commit('intents/emptyList')
    const response = await $axios.get('/intents')
    response.data.intents.forEach(intent => {
    
      console.log(response.data.intents)
      store.commit('intents/add', {
        id: intent.id || intent._id,
        ...intent
      })
    })
  },
  methods: {
	  
  }
}
</script>