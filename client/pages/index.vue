<template>
  <section>
    <div>
      <h1>Home page</h1>
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
  methods: {
	  async fetch({ store }) {
	    store.commit('intents/emptyList')
	    const response = await axios('get', '/intents', {
	      
	    })
	    response.data.intents.forEach(intent => {
	      if (intent.image) {
	      intent.image.url = `${apiUrl}${intent.image.url}`
	    }
	    else {
	      intent.image = {
	        url: `${apiUrl}/static/placeholder.jpg`
	      }
	    }
	      // console.log(intent)
	      store.commit('intents/add', {
	        id: intent.id || intent._id,
	        ...intent
	      })
	    })
	  }
  }
}
</script>