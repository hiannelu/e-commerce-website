<template>
  <div>
    <div class="container col-md-8">
    <div class="text-right">
      <button class="btn btn-edit" @click="openModal(true)">New product</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>Image</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
        <td>
          <img :src="item.image" class="img-thumbnail" height="100" width="150" />
        </td>
        <td>{{ item.category }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.description }}</td>
        <td class="btn-group">
          <button class="btn btn-view">View</button>
          <button class="btn btn-edit" @click="openModal(false, item)">Edit</button>
          <button class="btn btn-delete" @click="deleteProduct(item.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <label>Image</label>
              <input class="form-control" type="text" @change="uploadFile" v-model="tempProduct.image" placeholder="Enter URL">
              <label>or Upload image</label>
              <input class="form-control" type="file" @change="uploadFile">
            </div>
            <div class="col">
              <label>Name</label>
              <input class="form-control" type="text" v-model="tempProduct.name" placeholder="Enter name">
              <label>Category</label>
              <input class="form-control" type="text" v-model="tempProduct.category" placeholder="Enter category">
              <label>Price</label>
              <input class="form-control" type="text" v-model="tempProduct.price" placeholder="Enter price">
              <label>Description</label>
              <textarea class="form-control" v-model="tempProduct.description" placeholder="Enter description"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">Save</button>
        </div>
        </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

const api = 'http://localhost:3036';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: '',
      modalTitle: ''
    }
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const vm = this;
      console.log(this.$route.path)
      this.axios.get(`${api}${this.$route.path}`).then(response => {
        vm.products = [];
        response.data.forEach(e => vm.products.push(e));
      })
      console.log(this.products)
    },
    openModal(isNew, item) {
      $('#productModal').modal('show');
      if (isNew) {
        this.tempProduct = {};
        this.modalTitle = 'Create product';
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.modalTitle = 'Update product';
        this.isNew = false;
      }
    },
    updateProduct() {
      const vm = this;
      
      if (this.isNew) {
        console.log(this.tempProduct)

        this.axios.post(`${api}${this.$route.path}`, { data: vm.tempProduct }).then(response => {
          console.log(response.data)
          console.log(vm.tempProduct)
          if (response.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          }
        })
      } else {
        this.axios.put(`${api}${this.$route.path}/${vm.tempProduct.id}`, { data: vm.tempProduct }).then(response => {
          console.log(response.data)
          console.log(vm.tempProduct)
          if (response.data.success) {
            $('#productModal').modal('hide');
            vm.getProducts();
          }
        })
      }
    },
    deleteProduct(id) {
      const vm = this;

      this.axios.delete(`${api}${this.$route.path}/${id}`).then(response => {
        if (response.data.success) {
          vm.getProducts();
        }
      })

    }
    // updateProduct() {
    //   const vm = this;

    //   if (this.isNew) {
    //     this.axios.post(api, { data: vm.tempProduct }).then(response => {
    //       $('#productModal').modal('hide');
    //       vm.getProducts();
    //       console.log(response)
    //     })
    //   }
    // }
    // getProducts() {
    //   const api = 'https://vue-course-api.hexschool.io/api/annelu/products';
    //   const vm = this;

    //   this.axios.get(api).then(response => {
    //     vm.products = response.data.products;
    //     console.log(response.data)
    // })
    // },
    // openModal(isNew, item) {
    //   $('#productModal').modal('show');
    //   if (isNew) {
    //     this.tempProduct = {};
    //     this.isNew = true;
    //     this.modalTitle = 'Create product';
    //   } else {
    //     this.tempProduct = Object.assign({}, item);
    //     this.isNew = false;
    //     this.modalTitle = 'Update product';
    //   }
    // },
    // updateProduct() {
    //   const api = 'https://vue-course-api.hexschool.io/api/annelu/admin/product';
    //   const vm = this;

    //   if (this.isNew) {
    //     this.axios.post(api, { data: vm.tempProduct }).then(response => {
    //       console.log(response.data)
    //       console.log(vm.tempProduct)
    //       if (response.data.success) {
    //         $('#productModal').modal('hide');
    //         vm.getProducts();
    //       }
    //     })
    //   } else if (!this.isNew) {
    //       console.log('hey')
    //     this.axios.put(`${api}/${vm.tempProduct.id}`, { data: vm.tempProduct }).then(response => {
    //       console.log(response.data)
    //       console.log(vm.tempProduct)
    //       if (response.data.success) {
    //         $('#productModal').modal('hide');
    //         vm.getProducts();
    //       }
    //     })
    //   } 
    // },
    // deleteProduct(id) {
    //   const api = `https://vue-course-api.hexschool.io/api/annelu/admin/product/${id}`
    //   const vm = this;

    //   this.axios.delete(api).then(response => {
    //   console.log(response.data)
    //   console.log(id)
    //   if (response.data.success) {
    //     vm.getProducts();
    //   }
    //     })
    // },
    // uploadFile() {
    //   console.log(this)
    //   const file = this.$refs.file.files[0];
    //   const formData = new FormData();
    //   formData.append('file-to-upload', file);

    // }
  }
}
</script>

<style>
body {
  background-image: url("/./pictures/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
 
}
.container {
  background-color: white;
}
</style>
