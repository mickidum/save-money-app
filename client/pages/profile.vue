<template>
  <section class="container">
    <div class="mt-3 mb-3"><h1>Profile Page</h1></div>
  <div>
    <b-card no-body
            style="max-width: 30rem;"
            img-src="https://placekitten.com/380/200"
            img-alt="Image"
            img-top>
        <h4 class="" slot="header">{{loggedInUser.name }}</h4>
        <b-list-group flush>
            <b-list-group-item><strong>Email</strong> <span class="float-right">{{ loggedInUser.email }}</span></b-list-group-item>
            <!-- <b-list-group-item><strong>Phone</strong> <span class="float-right">{{ loggedInUser.phone }}</span></b-list-group-item> -->
            <b-list-group-item><strong>Month Cost</strong> <span class="float-right">{{ loggedInUser.settings.monthCost }}</span></b-list-group-item>
            <b-list-group-item><strong>Last Wasted</strong> <span class="float-right">{{ loggedInUser.settings.lastWasted }}</span></b-list-group-item>
            <b-list-group-item><strong>Account created at</strong> <span class="float-right">{{ prettyDate }}</span></b-list-group-item>
        </b-list-group>
        <b-card-body>
            <button type="button" class="btn btn-primary mr-2">Logout</button>
            <button type="button" class="btn btn-success">Update</button>
        </b-card-body>
    </b-card>
  </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    prettyDate() {
      var a = moment(this.loggedInUser.createdAt);
      return a.format('DD-MM-YYYY');
    }
  }
}
</script>