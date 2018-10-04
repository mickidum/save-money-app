<template>
  <div class="waste-page">
    <h1 class="text-center">Waste Page</h1>
    <nuxt-link tag="span" class="close-button" :to="{ path: '/' }" exact></nuxt-link>
    <div class="forms-wasted">
      <form autocomplete="off" @submit.stop.prevent="updateWaste" class="pure-form1 pure-form-stacked1">
        <span v-if="error" class="pure-form-message waste-error">Error message: {{error}}</span>
          <button v-show="wasted" :disabled="loading" type="submit" class="waste-button">OK</button>
        <div>
          <input @keyup="changeWaste" min="1" max="1000" v-model="wasted" ref="wasteid" class="waste-input" type="number" autofocus>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
  layout: 'forms',
  data() {
    return {
      wasted: null,
      loading: false,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      logged: 'isAuthenticated', 
      user: 'userSettings'
    }),
    lastMonth() {
      let currentDate = moment().format();
      let lastMonthWastedDate = this.user.lastMonthWasted.date;
      let lastMonthWaste = parseInt(this.user.lastMonthWasted.how) + parseInt(this.wasted);
      if (moment(currentDate).isSame(lastMonthWastedDate, 'month')) {
        return {
          date: currentDate,
          how: lastMonthWaste
        }
      }else {
        return {
          date: currentDate,
          how: this.wasted
        }
      }
    },
  },
  mounted() {
    this.$refs.wasteid.focus();
  },
  methods: {
    changeWaste() {
      if (this.wasted >= 1000) {
        this.wasted = 1000;
      }
    },
    async updateWaste() {
      this.loading = true;
      if (!this.wasted) {
        this.wasted = 0;
      }
      let obj = {
        lastWasted: parseInt(this.wasted),
        totalWasted: parseInt(this.user.totalWasted) + parseInt(this.wasted),
        lastMonthWasted: this.lastMonth
      }
      try {
        const { data } = await this.$axios.put('/users', { settings: obj });
        this.loading = false;
        if (!data.success) {
          this.error = data.error;
        }else {
          this.error = null;
          this.$store.commit('add', obj)
        }
        this.$router.push('/');
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
    }
  } 
}
</script>
