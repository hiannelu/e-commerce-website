<template>
  <table class="table">
    <div class="wrap">
        <form class="form-signin card shadow" :style="{ 'width': 25 + 'rem', 'height': check + 'rem'}" @submit.prevent="signin">
          <h1 class="title">Sign In</h1>
          <div class="alert alert-danger mt-2" v-if="signinCheck">
            Incorrect username or password.
          </div>
          <label for="inputEmail" :class="{ 'font-weight-bold': true, 'mt-4': !signinCheck, 'mt-2': signinCheck }">Email address</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="user.username" required autofocus>
          <label for="inputPassword" class="mt-3 font-weight-bold">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Enter password" v-model="user.password" required >
          <div class="mt-3">
            <input type="checkbox" value="remember-me" id="check" @click="remember">
            <label class="ml-2">Remember me</label>
          </div>
          <button class="mt-3 btn btn-primary btn-block" type="submit">Sign In</button>
          <p class="title mt-5 text-muted">&copy; 2020</p>
      </form>
    </div>
  </table>
</template>

<script>

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      signinCheck: false,
      check: 30
    }
  },
  watch() {

  },
  mounted() {
    let cookie = document.cookie;
    let re = /(username=)|(password=)/g;
    let user = cookie.replace(re, '').split('; ');
    
    this.user.username = user[1];
    this.user.password = user[0];
    if (user.length == 2) {
      document.getElementById('check').checked = true;
    }
    console.log(user.length)
  },
  methods: {
    signin() {
      this.$axios.get(`${this.$api}/signin`).then(response => {
        console.log('data: ' + response.data)
        console.log(response)

        response.data.forEach(e => {
          if (e.username == this.user.username && e.password == this.user.password) {
            this.$router.push(`/${e.role}/products`);
          }
        });
        this.signinCheck = true;
        this.check = 33;
        if (this.remember()) {
          document.cookie = `username=${this.user.username}`;
          document.cookie = `password=${this.user.password}`;
        } else {
          document.cookie = `username=${this.user.username}; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
          document.cookie = `password=${this.user.password}; expires=Thu, 18 Dec 2013 12:00:00 UTC`;
        }
    })
    },
    remember() {
      return document.getElementById('check').checked;
    }
  }
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    position: fixed;
    align-items: center;  
  }

  .title {
    text-align: center;
  }

  .form-signin {
    width: 330px;
    padding: 30px 30px 0 30px;
    margin: auto;
  }

</style>