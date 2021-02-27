<template>
  <div>
    <div class="container col-md-8">
      <div class="text-right mt-4">
          <button v-b-modal.modal class="btn btn-primary mt-4 mr-4" @click="openModal(true)">New product</button>
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
          <button class="btn btn-warning" v-b-modal.view>View</button>
          <button class="btn btn-info" v-b-modal.modal @click="openModal(false, item)">Edit</button>
          <button class="btn btn-danger" @click="deleteProduct(item.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>

    <b-modal
      id="view"
      hide-header
      hide-footer
    >
      <table style="border: 3px solid" width="100%">
        <div class="table-view">
        <thead>
          <th colspan="2" style="font-size: 30px; text-align: center; padding-bottom: 20px">Nutrition Facts</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">Serving Size <span>50g</span></td>
          </tr>
          <tr>
            <td colspan="2"><hr colspan="2" style="border: 1px solid" width="100%"></td>
          </tr>
          <tr>
            <td colspan="2">Amount per Serving</td>
          </tr>
          <tr>
            <td><span>Callories</span> 235</td>
            <td>Callories from fat 12</td>
          </tr>
          <tr>
            <td colspan="2"><hr colspan="2" style="border: 1px solid" width="100%"></td>
          </tr>
          <tr>
            <td colspan="2" class="text-right">%Daily Value</td>
          </tr>
          <tr>
            <td><span>Total fat</span> 2g</td>
            <td class="text-right">4%</td>
          </tr>
          <tr>
            <td class="indent">Saturated fat 2g</td>
            <td class="text-right">4%</td>
          </tr>
          <tr>
            <td class="indent" colspan="2">Trans fat 0g</td>
          </tr>
          <tr>
            <td><span>Cholosterol</span> 0mg</td>
            <td class="text-right">0%</td>
          </tr>
          <tr>
            <td><span>Sodium</span> 0mg</td>
            <td class="text-right">0%</td>
          </tr>
          <tr>
            <td><span>Total Carbohydrate</span> 19g</td>
            <td class="text-right">3%</td>
          </tr>
          <tr>
            <td class="indent">Dietary Fiber 2g</td>
            <td class="text-right">6%</td>
          </tr>
          <tr>
            <td class="indent" colspan="2">Sugars 17g</td>
          </tr>
          <tr>
            <td colspan="2"><span>Protein</span> 29g</td>
          </tr>
          <tr>
            <td colspan="2"><hr colspan="2" style="border: 1px solid" width="100%"></td>
          </tr>
          <tr>
            <td><span>Vitamin C</span> 35%</td>
            <td><span>Vitamin A</span> 20%</td>
          </tr>
          <tr>
            <td><span>Calcium</span> 5%</td>
            <td><span>Zinc</span> 5%</td>
          </tr>
        </tbody>
        </div>
      </table>
    </b-modal>

    <b-modal
      id="modal"
      :title=modalTitle
      @ok="handleOk"
      okTitle="Save"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group
                label="Image"
                invalid-feedback="Please upload image file."
              >
              <b-form-input  
                ref="files"
                name="upload-file"
                v-model="uploadFile"
                :state="inputState[1]"
                placeholder="Upload image..."
                @change="uploadImage"
              ></b-form-input>
              <b-img :src="tempProduct.image" thumbnail></b-img>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Name"
                invalid-feedback="Please enter name."
              >
                <b-form-input
                  v-model="tempProduct.name"
                  :state="inputState[3]"
                  placeholder="Enter name..."
                ></b-form-input>
              </b-form-group>
              
              <b-form-group
                label="Category"
                invalid-feedback="Please select category."
              >
                <b-form-select
                  v-model="tempProduct.category"
                  :state="inputState[2]"
                  :options="category"
                >
                  <template #first>
                    <b-form-select-option disabled>
                      -- Select category --
                    </b-form-select-option>
                  </template>
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Price"
                invalid-feedback="Please enter price."
              >
                <b-form-input
                v-model="tempProduct.price"
                :state="inputState[4]"
                placeholder="Enter price..."
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
            <b-form-group
              label="Description (optional)"
              invalid-feedback="Please enter something."
            >
              <b-form-textarea
              v-model="tempProduct.description"
              :state="inputState[5]"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            </b-col>
          </b-row>
      </form>
    </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: '',
      modalTitle: '',
      category: ['Dessert', 'Dumpling', 'Fruit', 'Meat', 'Veggie'],
      inputState: [],
      uploadFile: ''
    }
  },
  created() {
    this.getProducts();
    console.log(this.tempProduct)
  },
  methods: {
    getProducts() {
      const vm = this;
      console.log(this.$route.path)
      this.$axios.get(`${this.$api}${this.$route.path}`).then(response => {
        vm.products = [];
        response.data.forEach(e => vm.products.push(e));
      })
        .then(() => this.resetState());
    },
    resetState() {
      this.inputState = [];
      console.log(this.tempProduct.category)
      Object.keys(this.products[0]).forEach(e => {
        this.inputState.push(null);
        this.tempProduct[e] = '';
        console.log('temp: ' + Object.values(this.tempProduct))
        if (e == 'category') this.tempProduct[e] = undefined;
      })
      console.log(this.tempProduct)
    },
    openModal(isNew, item) {
      this.resetState();
      console.log(this.inputState)
      if (isNew) {
        this.modalTitle = 'Create product';
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.modalTitle = 'Update product';
        this.isNew = false;
      }
    },
    handleOk(e) {
      let val = Object.values(this.tempProduct);
      console.log(val[0], val[1], val[2], val[3], val[4], val[5])
      e.preventDefault();
      for (let i = 1; i < 5; i ++) {
        if (val[i] == undefined || val[i] == '') {
          this.inputState.splice(i, 1, false);
        } else {
          this.inputState.splice(i, 1, null);
        }
      }
      if (this.inputState.every(e => e == null)) this.updateProduct();
    },
    updateProduct() {
      if (this.isNew) {
        this.$axios.post(`${this.$api}${this.$route.path}`, { data: this.tempProduct }).then(response => {
          if (response.data.success) {
            this.$bvModal.hide('modal');
            this.getProducts();
          }
        })
      } else {
        this.$axios.put(`${this.$api}${this.$route.path}/${this.tempProduct.id}`, { data: this.tempProduct }).then(response => {
          if (response.data.success) {
            this.$bvModal.hide('modal');
            this.getProducts();
          }
        })
      }
    },
    deleteProduct(id) {
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
                this.getProducts();
              }
            })
            }
          })
    },
    uploadImage() {
      this.tempProduct.image = this.uploadFile;
    }
  }
}
</script>

<style scoped>

.container {
  background-color: white;
}

.table-view {
  padding: 30px;
  font-size: 20px;
}

.indent {
  padding-left: 40px;
}

span {
  font-size: 20px;
  font-weight: bolder;
}
</style>