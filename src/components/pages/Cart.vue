<template>
  <div>
    <div class="container col-md-8">
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Image</th>
          <th>Category</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="index">
        <td>
          <img :src="item.image" class="img-thumbnail" height="100" width="150" />
        </td>
        <td>{{ item.category }}</td>
        <td>{{ item.name }}</td>
        <td>
          <i class="fas fa-arrow-up" @click="add(item.id , item.quantity)"></i>
          {{ item.quantity }}
          <i class="fas fa-arrow-down" @click="minus(item.id, item.quantity)"></i>
        </td>
        <td>{{ item.price * item.quantity }}</td>
        <td>
          <i class="fas fa-trash-alt" @click="deleteProduct(item.id)"></i>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      isNew: '',
      modalTitle: '',
      quantity: {},
      message: 0
    }
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const vm = this;
      console.log(this.$route.path)
      this.$axios.get(`${this.$api}${this.$route.path}`).then(response => {
        vm.products = [];
        response.data.forEach(e => vm.products.push(e));
      })
      console.log(this.products)
    },
    deleteProduct(id) {
      const vm = this;
      console.log('id: ' + id)
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete it.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
        })
          .then(value => {
            if (value) {
              this.$axios.delete(`${this.$api}${this.$route.path}/${id}`).then(response => {
                if (response.data.success) {
                  vm.getProducts();
                this.$axios.get(`${this.$api}/user/cart`).then(response => {
                  vm.message = response.data.length;
                  console.log(vm.message)
                })
                  .then(() => {
                    this.$emit('update', vm.message)
                  })
                }
              })
            } 
          })
    },
    add(id, quantity) {
      const vm = this;
      this.quantity = Object.assign({}, { quantity: quantity + 1 });

      this.$axios.put(`${this.$api}${this.$route.path}/${id}`, { data: vm.quantity }).then(response => {
        console.log(response.data)
        if (response.data.success) {
          vm.getProducts();
        }
      })
    },
    minus(id, quantity) {
      const vm = this;

      if (quantity > 1) {
        this.quantity = Object.assign({}, { quantity: quantity - 1 });
      }
      this.$axios.put(`${this.$api}${this.$route.path}/${id}`, { data: vm.quantity }).then(response => {
        if (response.data.success) {
          vm.getProducts();
        }
      })
    }
  }
}
</script>

<style scoped>

.container {
  background-color: white;
}
</style>