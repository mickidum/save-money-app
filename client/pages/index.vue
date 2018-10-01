<template>
  <section>
    <div class="subheader">
      <h1>Aims</h1>
      <span @click="filterDone">{{chname}} reached aims</span>
    </div>
    <div v-if="filteredList" class="intents-container">
    	<div v-for="intent in filteredList" :key="intent.id" class="intent">
    		<nuxt-link :class="{ homedone: intent.done }" class="intent-inner" tag="div" :to="{ name: 'intents-id', params: { id: intent.id }}">
          <div class="progress"></div>
          <table>
            <tbody>
              <tr>
                <td><strong>{{intent.name | truncate(25)}}</strong></td>
                <td><strong>{{intent.cost}}</strong></td>
              </tr>
            </tbody>
          </table>
    		</nuxt-link>
    	</div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'homepage',
  data() {
  	return {
      error: null,
      hide: true
  	}
  },
  computed: {
    chname() {
      if (this.hide) {
        return 'Hide';
      }else {
        return 'Show';
      }
    },
    filteredList() {
      return this.intents.filter(intent => {
        if(this.hide) {
          return intent;
        }else {
          return intent.done == false
        }
      })
    },
    intents() {
      return this.$store.getters['intents/list']
    }
  },
  async fetch({ store, $axios }) {
    store.commit('intents/emptyList');
    const {data} = await $axios.get('/intents');
    data.intents.forEach(intent => {
      store.commit('intents/add', intent);
    })
  },
  methods: {
	  filterDone() {
      this.hide = !this.hide;
    }
  }
}
</script>