<template>
  <nav class="navbar navbar-dark sticky-top bg-dark shadow">
    <!-- <img src="../assets/logo.png" /> -->
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
      Anne's Supermarket
    </a>
    <div class="title">
      <div>
        <i class="fas fa-phone-alt"> 0800-000-000</i>
        <i class="fas fa-gift"> Offers</i>
        <i class="far fa-question-circle"> Help</i>
      </div>
   
      <div>
        <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">-->
        <img :src="this.picture" height="50" width="50" style="border-radius: 50%"/>
          {{ account }} {{ role }}
        <div class="btn-group">
          <button class="btn btn-info" @click="signout">
            ( Sign Out )
          </button>
          <button class="btn btn-warning"><span class="col-3" style="color:red">{{ cart }}</span> Cart</button>
        </div>
      </div>
    <!-- <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Cart
      </button>
      <div class="dropdown-menu dropdown-menu-right">
        <a class="dropdown-item" href="#">Profile</a>
        <a v-if="this.account == 'Gaspard'" class="dropdown-item" href="#">My orders</a>
        <a class="dropdown-item" href="#" @click="signout">Sign out</a>
      </div>
    </div> -->
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      account: '',
      picture: '',
      role: '',
      cart: 0
    }
  },
  mounted() {
    if (this.$route.path == '/user/products') {
      this.account = 'Gaspard';
      this.role = 'User';
      this.picture = '/./pictures/user.jpg';
    }
    else {
      this.account = 'Lisa';
      this.role = 'Administrator';
      this.picture = '/./pictures/admin.jpg';
    }
  },
  methods: {
    signout() {
      const api = 'https://vue-course-api.hexschool.io/logout';

      this.axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        this.$router.push('/signin');
      }
    })
    }
  }
}
</script>

<style scoped>
  .title {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    color: white;
  }
</style>
