<template>
  <div>
    <swiper class="swiper" ref="mySwiper" :options="swiperOptions">
      <swiper-slide><img src="/./pictures/slide_1.jpg"></swiper-slide>
      <swiper-slide><img src="/./pictures/slide_2.jpg"></swiper-slide>
      <swiper-slide><img src="/./pictures/slide_3.jpg"></swiper-slide>
      <swiper-slide><img src="/./pictures/slide_4.jpg"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="category">
      <img :src="dumplingHover ? '/./pictures/dumpling.jpeg' : '/./pictures/dumpling_hover.jpeg'" 
      width="200" height="200" class="img-thumbnail"
      @mouseover="dumplingHover=false"
      @mouseleave="dumplingHover=true"
      @click="category('Dumplings')">

      <img :src="meatHover ? '/./pictures/meat.jpeg' : '/./pictures/meat_hover.jpeg'" 
      width="200" height="200" class="img-thumbnail"
      @mouseover="meatHover=false"
      @mouseleave="meatHover=true"
      @click="category('Meats')">

      <img :src="veggieHover ? '/./pictures/veggie.jpeg' : '/./pictures/veggie_hover.jpeg'" 
      width="200" height="200" class="img-thumbnail"
      @mouseover="veggieHover=false"
      @mouseleave="veggieHover=true"
      @click="category('Veggies')">

      <img :src="fruitHover ? '/./pictures/fruit.jpeg' : '/./pictures/fruit_hover.jpeg'" 
      width="200" height="200" class="img-thumbnail"
      @mouseover="fruitHover=false"
      @mouseleave="fruitHover=true"
      @click="category('Fruits')">

      <img :src="dessertHover ? '/./pictures/dessert.jpeg' : '/./pictures/dessert_hover.jpeg'" 
      width="200" height="200" class="img-thumbnail"
      @mouseover="dessertHover=false"
      @mouseleave="dessertHover=true"
      @click="category('Desserts')">
    </div>

    <div id="parallax" :style="{'background-position-x':0,'background-position-y': y+'px' }">
      {{ categoryTitle }}
    </div>

    <div class="wrap-products">
      <div v-for="(item, index) in products" :key="index" class="col-sm-3">
        <div class="card shadow" style="width:13rem; height: 22rem;">
          <img class="card-img-top" :src="item.image" alt="Card image cap">
          <div class="card-body">
            <div class="card-text">{{ item.name }}</div>
            <div class="card-text">NT$ <span style="color:red">{{ totalPrice[index] }}</span></div>
         
            <div class="quantity">
              <i class="fas fa-arrow-up" @click="add(index, item.price)"></i>
                {{ quantity[index] }}
              <i class="fas fa-arrow-down" @click="minus(index, item.price)"></i>
              <i class="fas fa-shopping-cart" @click="cart(item, index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  // import $ from 'jquery';
  import axios from 'axios';
  const api = 'http://localhost:3036';


  export default {
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          slidesPerView: 3,
          autoplay: true,
          speed: 200,
          loop: true,
          centeredSlides: true,
          watchSlidesProgress: true,
          spaceBetween: 50,
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 0,
            stretch: 50,
            depth: 400,
            modifier: 1,
            slideShadows: false
          }
        },
        dumplingHover: true,
        meatHover: true,
        veggieHover: true,
        fruitHover: true,
        dessertHover: true,
        y: 0,
        categoryTitle: "Anne's Supermarket",
        products: [],
        quantity: [],
        totalPrice: []
      }
    },
    created() {
      this.getProducts();
      //this.quantity = this.quantity.push(1);
    },
    mounted() {
      window.onload = () => {
        let parallax = document.getElementById('parallax');
          this.y += parallax.offsetTop * 0.5;
      };
    },
    methods: {
      getProducts() {
        const vm = this;
        console.log(this.$route.path)
        axios.get(`${api}${this.$route.path}`).then(response => {
          response.data.forEach(e => {
            vm.products.push(e);
            vm.quantity.push(1);
            vm.totalPrice.push(e.price)
          })
        })
        console.log(this.products)
      },
      category(title) {
        const vm = this;
        this.categoryTitle = title;
        this.products = [];
        this.quantity = [];
        this.totalPrice = [];

        axios.get(`${api}${this.$route.path}`).then(response => {
          response.data.forEach(e => {
            if (title == e.category) {
              console.log('title: ' + title)
              vm.products.push(e);
              vm.quantity.push(1);
              vm.totalPrice.push(e.price);
            }
          })
        })
      },
      add(index, price) {
        let add = this.quantity[index] + 1;

        console.log('index: ' + index)
        console.log('quantity: ' + this.quantity)
        console.log('add: ' + add)

        this.quantity.splice(index, 1, add);
        console.log('new quantity: ' + this.quantity)
        this.totalPrice.splice(index, 1, add * price);
      },
      minus(index, price) {
        let minus  = this.quantity[index] - 1;
        if (minus > 0) {
          this.quantity.splice(index, 1, minus);   
          this.totalPrice.splice(index, 1, minus * price)
        }
      },
      cart(item, index) {
        console.log(item, this.quantity[index])
      }
    }
  }
</script>

  <style>

    body {
      background: #eee;
    }

    .swiper img {
      height: 350px;
      width: auto;
      margin-top: 30px;
    }

    .category {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 80px 0 80px 0;
    }
    
    #parallax {
      height: 200px;
      color: white;
      font-size: 100px;
      text-align: center;
      background-image: url("/./pictures/parallax.jpg");
      background-attachment: fixed;
    }

    .product-container {
      width: 90%;
      margin: 80px auto;
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      font-size: 30px;
      text-align: center;
      background: #FEAC5E;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }

    .wrap-products {
   
      margin: 80px auto;
      padding: 20px;
      font-size: 30px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      text-align: center;
      background: #FEAC5E;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .wrap-products img {
      width: 200px;
      height: 200px;
      align-items: center;
    }
    .card-body {
      margin-top: -20px;
    }
    .quantity {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    
  </style>