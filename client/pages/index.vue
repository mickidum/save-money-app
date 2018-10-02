<template>
  <section>
    <div class="subheader">
      <h1>Aims</h1>
      <div class="right-filters">
      	<span style="border-bottom: solid 2px #2196f3;" ref="all" @click="filterDone('all')">All</span>
      	<span ref="reached" @click="filterDone('reached')">Reached</span>
      	<span ref="ready" @click="filterDone('notreached')">Not reached</span>
      </div>
    </div>
    <div v-if="filteredList" class="intents-container">
    	<div v-for="intent in filteredList" :key="intent.id" class="intent">
    		<nuxt-link :class="{ homedone: intent.done }" class="intent-inner" tag="div" :to="{ name: 'intents-id', params: { id: intent.id }}">
          <span v-if="intent.ready && !intent.done" class="ready-aim">READY</span>
          <table>
            <tbody>
              <tr>
                <td><strong>{{msg | truncate(25)}}</strong></td>
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
import totalSavedValue from '~/helpers/totalSavedValue';
export default {
  layout: 'homepage',
  data() {
  	return {
      error: null,
      filteredAction: 'all',
      msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, nulla?'
  	}
  },
  computed: {
  	totalSaved() {
  		return totalSavedValue(this.$store.getters['loggedInUser']);
  	},
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
    	let red = (this.$store.getters['intents/list']).map((intent) => {
    		let r = this.totalSaved - this.aimsReached - intent.cost;
    		if (r >= 0) {
    			return {
    			...intent,
    			ready: true
	    		}
    		} else {
    			return {
    			...intent,
    			ready: false
	    		}
    		}
	    });
	    return red;
     // return this.$store.getters['intents/list']
    },
    intentsDone() {
    	return this.$store.getters['intents/listDone']
    },
    intentsNotDone() {
    	return this.$store.getters['intents/listNotDone']
    },
    aimsReached() {
    	return this.$store.getters['intents/aimsReached']
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