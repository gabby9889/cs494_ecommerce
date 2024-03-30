export default [
    {
        "shippingInfo": {
          "address": "123 Main St",
          "city": "New York",
          "phoneNo": "123-456-7890",
          "zipCode": "10001",
          "country": "USA"
        },
        "user": "61594b79a31e762d458325a9", // Sample ObjectId reference to User
        "orderItems": [
          {
            "name": "Product 1",
            "quantity": 2,
            "image": "https://example.com/product1.jpg",
            "price": "19.99",
            "product": "61594b79a31e762d458325b1" // Sample ObjectId reference to Product
          },
          {
            "name": "Product 2",
            "quantity": 1,
            "image": "https://example.com/product2.jpg",
            "price": "29.99",
            "product": "61594b79a31e762d458325b2" // Sample ObjectId reference to Product
          }
        ],
        "paymentMethod": "Card",
        "paymentInfo": {
          "id": "1234567890",
          "status": "Success"
        },
        "itemsPrice": 69.97,
        "taxAmount": 5.25,
        "shippingAmount": 10,
        "totalAmount": 85.22,
        "orderStatus": "Processing",
        "deliveredAt": null
      },
      {
        "shippingInfo": {
          "address": "1234 Main St",
          "city": "New York",
          "phoneNo": "123-456-7890",
          "zipCode": "10001",
          "country": "USA"
        },
        "user": "61594b79a31e762d458325a9", // Sample ObjectId reference to User
        "orderItems": [
          {
            "name": "Product 3",
            "quantity": 2,
            "image": "https://example.com/product1.jpg",
            "price": "119.99",
            "product": "61594b79a31e762d458325b1" // Sample ObjectId reference to Product
          },
          {
            "name": "Product 5",
            "quantity": 1,
            "image": "https://example.com/product2.jpg",
            "price": "29.99",
            "product": "61594b79a31e762d458325b2" // Sample ObjectId reference to Product
          }
        ],
        "paymentMethod": "Card",
        "paymentInfo": {
          "id": "1234567890",
          "status": "Success"
        },
        "itemsPrice": 69.97,
        "taxAmount": 5.25,
        "shippingAmount": 10,
        "totalAmount": 85.22,
        "orderStatus": "Processing",
        "deliveredAt": null
      }
];
  