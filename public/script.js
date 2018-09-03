var PRICE = 9.99;
new Vue ({
  el: '#app',
  data: {
    total: 0,
    items: [],
    cart: [],
    search: 'Sebastian',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  mounted: function () {
    this.onSubmit(); //when page loads it has done a default search so the page is not empty
  },
  methods: {
    addItem: function (index) {
      this.total += PRICE;
      var item = this.items[index];
      var found = false;
      for (var i = 0; i < this.cart.length; i++) { //loop through the cart items
        if (this.cart[i].id === item.id) { //if item is found in the cart show the quantity
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if (!found) { //if item not in the cart put it in and show quantity and price
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        })
      }
    },
    increase: function (item) {
      item.qty++; //increment the item quantity by 1
      this.total += PRICE; //increment the price by 1
    },
    decrease: function (item) {
      item.qty--; //decrement the quantity by 1
      this.total -= PRICE; //decrement the price by 1
      if (item.qty <= 0) { //if the item qty is set to 0
        for (var i=0; i<this.cart.length; i++) {//loop through cart and
          if (this.cart[i].id === item.id) {//if the item is the one set to 0
            this.cart.splice(i,1); //remove it from the cart *splice removes using the index of the item and how many
            break; //exit the for loop
          }
        }
      }
    },
    onSubmit: function () {
      this.items = [];
      this.loading = true;
      this.$http.get('/search/'.concat(this.search)).then(function (res) { //getting results from imgur server using /search/:query returning results that relate to what was input in the search box
        this.lastSearch = this.search; //set the lastsearch to what was last entered in the input field
        this.items = res.data; //data received now put into items
        this.loading = false;
      });
    }
  },
  filters: {
    currency: function (price) {
      return '£'.concat(price.toFixed(2)); //set the price to have a £ infront and also convert to a 2 decimal string value
    }
  }
});
