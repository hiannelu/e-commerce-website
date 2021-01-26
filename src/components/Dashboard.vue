<template>
  <div>
    <Navbar />
    <!-- <div class="container-fluid"> -->

        <!-- <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4"> -->
        
          <Admin v-if='this.$route.path == "/admin/products"' />
          <User v-else />
          
        <!-- </main> -->

    <!-- </div>  -->
  </div>
</template>

<script>
//import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Admin from './pages/Admin';
import User from './pages/User';

//const api = 'http://localhost:3036';

export default {
  components: {
    Navbar,
    Admin,
    User
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;

    
    //console.log(this.$route.path)
  }
}
</script>