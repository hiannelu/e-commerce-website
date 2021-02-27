<template>
  <div>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <Signin v-if="this.$route.path == '/signin'"/>
    <Dashboard v-else />
  </div>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Signin from './components/Signin.vue'

export default {
  components: { 
    Dashboard,
    Signin
  },
  watch: {
    $route() {
      console.log('watch: ' + this.$route.path)

      if (this.$route.path == '/user/cart' || this.$route.path == '/admin/products') {
        document.querySelector('body').setAttribute('style', `
          background: #C6FFDD;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        `)
      } else if (this.$route.path == '/user/products') {
        document.querySelector('body').setAttribute('style', `
          background: white;
        `)
      } else if (this.$route.path == '/signin') {
        document.querySelector('body').setAttribute('style', `
          background: #CC95C0;  /* fallback for old browsers */
          background: -webkit-linear-gradient(to right, #7AA1D2, #DBD4B4, #CC95C0);  /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to right, #7AA1D2, #DBD4B4, #CC95C0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        `)
      }
    }
  },
  name: 'App'
}
</script>

<style>
  body {
    background: #CC95C0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7AA1D2, #DBD4B4, #CC95C0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #7AA1D2, #DBD4B4, #CC95C0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        
  }
</style>



