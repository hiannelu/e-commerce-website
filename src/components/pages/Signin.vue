<template>
  <div class="wrap">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="title">Sign In</h1>
      <div class="alert alert-danger" role="alert" v-if="signinCheck">
        Incorrect username or password.
      </div>
      <label for="inputEmail" class="mt-4 font-weight-bold">Email address</label>
      <input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="user.username" required autofocus>
      <label for="inputPassword" class="mt-3 font-weight-bold">Password</label>
      <input type="password" class="form-control" id="inputPassword" placeholder="Enter password" v-model="user.password" required >
      <input type="checkbox" value="remember-me">
      <label class="mt-3 ml-2">Remember me</label>
      <button class="mt-3 btn btn-primary btn-block" type="submit">Sign In</button>
      <p class="title mt-5 text-muted">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
const api = 'http://localhost:3036';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      signinCheck: false
    }
  },
  methods: {
    signin() {
      //const api = 'https://vue-course-api.hexschool.io/admin/signin';
      this.axios.get(`${api}/signin`).then(response => {
        console.log(response.data)
        console.log(response)
 
        const account = e => e.username == this.user.username && e.password == this.user.password;
        const role = response.data.find(account).role;

        this.$router.push(`/${role}/products`);
    })

    //   this.axios.post(api, this.user).then(response => {
    //   console.log(response.data)
    //   if (response.data.success) {
    //     const token = response.data.token;
    //     const expired = response.data.expired;
    //     console.log(token, expired)
    //     document.cookie = `token=${ token }; expires=${ new Date(expired) }`
    //     this.$router.push('/admin/products');
    //   }
    // })
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
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .title {
    text-align: center;
  }
  .form-signin {
    width: 330px;
    padding: 15px;
    margin: auto;
  }
</style>