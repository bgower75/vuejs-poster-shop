var PRICE = 9.99;
new Vue ({
  el: '#app',
  data: {
    total: 0,
    items: [
      { id: 1, title: 'Item1'},
      { id: 2, title: 'Item2'},
      { id: 3, title: 'Item3'}
    ],
    cart: []
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
        for (var i=0; i<this.cart.length; i++) //loop through cart and
          if (this.cart[i].id === item.id) {//if the item is the one set to 0
            this.cart.splice(i,1); //remove it from the cart *splice removes using the index of the item and how many
            break; //exit the for loop
          }
      }
    }
  },
  filters: {
    currency: function(price) {
      return '£'.concat(price.toFixed(2)); //set the price to have a £ infront and also convert to a 2 decimal string value
    }
  }
});

