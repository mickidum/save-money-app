<template>
  <div class="all cont">
    <Header/>
    <!-- <nuxt/> -->
    <Footer/>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components: {
    Header, Footer
  }
}
</script>