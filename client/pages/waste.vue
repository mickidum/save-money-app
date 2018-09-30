<template>
  <div class="waste-page">
    <h1 class="text-center">Waste Page</h1>
    <nuxt-link tag="span" class="close-button" to="/" exact></nuxt-link>
    <div class="forms-wasted">
      <form autocomplete="off" @submit.stop.prevent="updateWaste" class="pure-form1 pure-form-stacked1">
        <span v-if="error" class="pure-form-message waste-error">Error message: {{error}}</span>
          <button v-show="wasted" :disabled="loading" type="submit" class="waste-button">OK</button>
          <!-- <button :disabled="loading" type="submit" class="waste-button">OK</button> -->
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
    })
  },
  mounted() {
    this.$refs.wasteid.focus();
  },
  methods: {
    lastMonth(){
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
    changeWaste() {
      if (this.wasted >= 1000) {
        this.wasted = 1000;
      }
    },
    async updateWaste() {
      if (!this.wasted) {
        this.wasted = 0;
      }
      
        let obj = {
          lastWasted: this.wasted - 0,
          totalWasted: parseInt(this.user.totalWasted) + parseInt(this.wasted),
          lastMonthWasted: this.lastMonth()
        }
        try {
          this.loading = true;
          await this.$axios.put('/users', 
            {
              settings: obj
            }
            ).then((res) => {
            if (!res.data.success) {
              this.error = res.data.error;
            }else {
              this.error = null;
              // this.$auth.fetchUser();
              this.$store.commit('add', obj)
            }
          })
          this.loading = false;
          this.$router.push('/');
        } catch (e) {
          this.loading = false;
          this.error = e.response.data.error;
        }
      }
    } 
}
</script>
