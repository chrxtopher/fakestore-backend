module.exports = [
  {
    username: "chrxtopher",
    password: "password123",
    first_name: "Christopher",
    last_name: "Roddy",
    wishlist: [1, 2, 3, 4],
    cart: JSON.stringify([
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 4 },
    ]),
  },
  {
    username: "mands",
    password: "password456",
    first_name: "Amanda",
    last_name: "Burhop",
    wishlist: [4, 5],
    cart: JSON.stringify([
      { productId: 4, quantity: 1 },
      { productId: 5, quantity: 3 },
      { productId: 6, quantity: 7 },
    ]),
  },
];
