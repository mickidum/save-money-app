<template>
	<footer v-if="logged" class="bottom-bar">
		<div class="footer-wrapper">
			<nuxt-link tag="a" class="icon home" to="/settings" exact>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416.3 256c0-21 13.1-38.9 31.7-46.1-4.9-20.5-13-39.7-23.7-57.1-6.4 2.8-13.2 4.3-20.1 4.3-12.6 0-25.2-4.8-34.9-14.4-14.9-14.9-18.2-36.8-10.2-55-17.3-10.7-36.6-18.8-57-23.7C295 82.5 277 95.7 256 95.7S217 82.5 209.9 64c-20.5 4.9-39.7 13-57.1 23.7 8.1 18.1 4.7 40.1-10.2 55-9.6 9.6-22.3 14.4-34.9 14.4-6.9 0-13.7-1.4-20.1-4.3C77 170.3 68.9 189.5 64 210c18.5 7.1 31.7 25 31.7 46.1 0 21-13.1 38.9-31.6 46.1 4.9 20.5 13 39.7 23.7 57.1 6.4-2.8 13.2-4.2 20-4.2 12.6 0 25.2 4.8 34.9 14.4 14.8 14.8 18.2 36.8 10.2 54.9 17.4 10.7 36.7 18.8 57.1 23.7 7.1-18.5 25-31.6 46-31.6s38.9 13.1 46 31.6c20.5-4.9 39.7-13 57.1-23.7-8-18.1-4.6-40 10.2-54.9 9.6-9.6 22.2-14.4 34.9-14.4 6.8 0 13.7 1.4 20 4.2 10.7-17.4 18.8-36.7 23.7-57.1-18.4-7.2-31.6-25.1-31.6-46.2zm-159.4 79.9c-44.3 0-80-35.9-80-80s35.7-80 80-80 80 35.9 80 80-35.7 80-80 80z"/></svg>
      </nuxt-link>
			<div class="month-wasted cost">
	      <span class="ttl">Total Wasted</span>
	      <div class="content">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404 188.9C404 111 333.9 48 256 48s-148 63.1-148 140.9c0 31 13.2 56.1 30.2 80.1h-.3c10.9 15 21.4 17.7 31.5 35 14.7 25.2 18.1 40.7 18.7 55.7.4 8.6 7.5 15.3 16 15.3h8.9c2.2 0 4-1.8 4-4v-94.5c0-5-1.2-9.8-3.4-14.3l-21-42c-3.5-7 1.6-15.2 9.4-15.2 4 0 7.7 2.3 9.4 5.9l25.3 51.4c2.2 4.4 3.3 9.2 3.3 14.1V371c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-94.6c0-4.9 1.1-9.7 3.3-14.1l25.4-51.6c1.7-3.4 5.2-5.6 9-5.6 7.5 0 12.4 7.9 9 14.6l-21.3 42.6c-2.2 4.5-3.4 9.4-3.4 14.3V371c0 2.2 1.8 4 4 4h10c8.5 0 15.5-6.6 16-15 .9-15.4 4.7-32.3 18.4-56 10.1-17.3 20.6-20 31.5-35h-.1c17-24 30.2-49.1 30.2-80.1zM238 464h36c7.7 0 14-6.3 14-14s-6.3-14-14-14h-36c-7.7 0-14 6.3-14 14s6.3 14 14 14zM218 420h76c7.7 0 14-6.3 14-14s-6.3-14-14-14h-76c-7.7 0-14 6.3-14 14s6.3 14 14 14z"/></svg>
	        <span>{{ user.totalWasted }}</span>
	      </div>
	    </div>
	    <div class="month-saved cost">
	      <span class="ttl">Total Saved</span>
	      <div class="content">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404 188.9C404 111 333.9 48 256 48s-148 63.1-148 140.9c0 31 13.2 56.1 30.2 80.1h-.3c10.9 15 21.4 17.7 31.5 35 14.7 25.2 18.1 40.7 18.7 55.7.4 8.6 7.5 15.3 16 15.3h8.9c2.2 0 4-1.8 4-4v-94.5c0-5-1.2-9.8-3.4-14.3l-21-42c-3.5-7 1.6-15.2 9.4-15.2 4 0 7.7 2.3 9.4 5.9l25.3 51.4c2.2 4.4 3.3 9.2 3.3 14.1V371c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-94.6c0-4.9 1.1-9.7 3.3-14.1l25.4-51.6c1.7-3.4 5.2-5.6 9-5.6 7.5 0 12.4 7.9 9 14.6l-21.3 42.6c-2.2 4.5-3.4 9.4-3.4 14.3V371c0 2.2 1.8 4 4 4h10c8.5 0 15.5-6.6 16-15 .9-15.4 4.7-32.3 18.4-56 10.1-17.3 20.6-20 31.5-35h-.1c17-24 30.2-49.1 30.2-80.1zM238 464h36c7.7 0 14-6.3 14-14s-6.3-14-14-14h-36c-7.7 0-14 6.3-14 14s6.3 14 14 14zM218 420h76c7.7 0 14-6.3 14-14s-6.3-14-14-14h-76c-7.7 0-14 6.3-14 14s6.3 14 14 14z"/></svg>
	        <span>{{ totalSaved }}</span>
	      </div>
	    </div>
	    <div class="aims-reached cost">
	      <span class="ttl">Aims Reached</span>
	      <div class="content">
	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M404 188.9C404 111 333.9 48 256 48s-148 63.1-148 140.9c0 31 13.2 56.1 30.2 80.1h-.3c10.9 15 21.4 17.7 31.5 35 14.7 25.2 18.1 40.7 18.7 55.7.4 8.6 7.5 15.3 16 15.3h8.9c2.2 0 4-1.8 4-4v-94.5c0-5-1.2-9.8-3.4-14.3l-21-42c-3.5-7 1.6-15.2 9.4-15.2 4 0 7.7 2.3 9.4 5.9l25.3 51.4c2.2 4.4 3.3 9.2 3.3 14.1V371c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-94.6c0-4.9 1.1-9.7 3.3-14.1l25.4-51.6c1.7-3.4 5.2-5.6 9-5.6 7.5 0 12.4 7.9 9 14.6l-21.3 42.6c-2.2 4.5-3.4 9.4-3.4 14.3V371c0 2.2 1.8 4 4 4h10c8.5 0 15.5-6.6 16-15 .9-15.4 4.7-32.3 18.4-56 10.1-17.3 20.6-20 31.5-35h-.1c17-24 30.2-49.1 30.2-80.1zM238 464h36c7.7 0 14-6.3 14-14s-6.3-14-14-14h-36c-7.7 0-14 6.3-14 14s6.3 14 14 14zM218 420h76c7.7 0 14-6.3 14-14s-6.3-14-14-14h-76c-7.7 0-14 6.3-14 14s6.3 14 14 14z"/></svg>
	        <span>{{ reached }}</span>
	      </div>
	    </div>
			<div class="fl-wrap">
     	 	<div v-if="showbutton" @click="cancelLast" v-show="user.lastWasted > 0" class="waste-button last-wasted-button"><strong>Cancel Last Wasted</strong><span>{{user.lastWasted}}</span></div>
				<nuxt-link tag="a" v-if="showbutton" class="waste-button create-intent" to="/newintent" exact>AIM</nuxt-link>
				<nuxt-link tag="a" v-if="showbutton" class="waste-button" to="waste" exact>WASTE</nuxt-link>
			</div>
		</div>
	</footer>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import totalSavedValue from '~/helpers/totalSavedValue';
export default {
	data(){
		return {
			error: null,
      todayDate: moment(moment().format()) 
		}
	},
	props: {
		showbutton: false,
	},
  computed: {
    ...mapGetters({
      logged: 'isAuthenticated', 
			user: 'userSettings',
			userAll: 'loggedInUser',
      reached: 'intents/aimsReached'
      }),
    totalSaved() {
    	return totalSavedValue(this.userAll, this.todayDate);
    }
  },
  mounted() {
    setInterval(() => {
      this.todayDate = moment(moment().format());
    }, 18000000);
  },
  methods: {
  	async cancelLast() {
  		let conf = confirm('Delete Last Waste?');
  		if (!conf) {return}
      this.loading = true;
  		let month;
  		if (this.user.lastMonthWasted.how <= 0) {
        month = 0;
      }
      else{
      	month = parseInt(this.user.lastMonthWasted.how) - parseInt(this.user.lastWasted);
      }
      let obj = {
        lastWasted: 0,
        totalWasted: parseInt(this.user.totalWasted) - parseInt(this.user.lastWasted),
        lastMonthWasted: {
        	how: month,
        	date: moment().format()
        }
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
        
      } catch (e) {
        this.loading = false;
        this.error = e.response.data.error;
      }
  	}
  }
}
</script>