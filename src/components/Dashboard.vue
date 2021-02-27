<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark shadow">
      <div class="navbar-brand col-md-4 col-lg-2 pl-4 btn" @click="home">
        Anne's Supermarket
      </div>
      <div class="title">
        <div class="mt-2">
          <i class="fas fa-phone-alt pr-3"> 0800-000-000</i>
          <i class="fas fa-gift pr-3"> Offers</i>
          <i class="far fa-question-circle"> Help</i>
        </div>
        <div>
          <img :src="this.picture" height="50" width="50" style="border-radius: 50%"/>
            {{ account }} {{ role }}
          <div class="btn-group">
            <button class="btn btn-info" @click="signout">
              Sign Out
            </button>
            <button v-if="this.$route.path != '/admin/products'" class="btn btn-warning" @click="toCart"><span class="col-3" style="color:red">{{ cart }}</span>Cart</button>
          </div>
        </div>
      </div>
    </nav>
    <Admin v-if="this.$route.path == '/admin/products'" />
    <User v-else-if="this.$route.path == '/user/products'" @update="update" />
    <Cart v-else-if="this.$route.path == '/user/cart'" class="cart" @update="update" />
  </div>
</template>

<script>

import Admin from './pages/Admin';
import User from './pages/User';
import Cart from './pages/Cart';

export default {
  components: {
    Admin,
    User,
    Cart
  },
  data() {
    return {
      account: '',
      picture: '',
      role: '',
      cart: ''
    }
  },
  mounted() {
    const vm = this;
    console.log('this: ' + this)

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
    this.$axios.get(`${this.$api}/user/cart`).then(response => {
      console.log(response.data.length)
      vm.cart = response.data.length;
    })
  },
  methods: {
    signout() {
      this.$router.push('/signin').catch(err => err);
    },
    toCart() {
      this.$router.push('/user/cart');
    },
    update(val) {
      this.cart = val;
    },
    home() {
      this.$router.push('/user/products');
    }
  }
}
</script>

<style scoped>
  .title {
    width: 60%;
    display: flex;
    justify-content: space-between;
    color: white;
  }
</style>

