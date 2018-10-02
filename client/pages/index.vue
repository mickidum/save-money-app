<template>
  <section>
    <div class="subheader">
      <h1>Aims</h1>
      <div class="right-filters">
      	<span style="border-bottom: solid 2px #2196f3;" ref="all" @click="filterDone('all')">All</span>
      	<span ref="reached" @click="filterDone('reached')">Reached</span>
      	<span ref="notreached" @click="filterDone('notreached')">Not reached</span>
      </div>
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
      filteredAction: 'all',
  	}
  },
  computed: {
    filteredList() {
      if(this.filteredAction === 'all') {
        return this.intents;
      }else if (this.filteredAction === 'reached') {
        return this.intentsDone;
      }else {
      	return this.intentsNotDone;
      }
    },
    intents() {
      return this.$store.getters['intents/list']
    },
    intentsDone() {
    	return this.$store.getters['intents/listDone']
    },
    intentsNotDone() {
    	return this.$store.getters['intents/listNotDone']
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
	  filterDone(action) {
      this.filteredAction = action;
      for(let item in this.$refs) {
      	this.$refs[item].style.borderBottom = 'none';
      }
      this.$refs[action].style.borderBottom = 'solid 2px #2196f3';
    }
  }
}
</script>