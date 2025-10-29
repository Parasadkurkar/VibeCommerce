const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const products = [
  {
    _id: '1',
    name: 'Vibe T-Shirt',
    price: 29.99,
    image: 'http://localhost:5000/images/tshirt.jpeg'
  },
  {
    _id: '2',
    name: 'Vibe Hoodie',
    price: 49.99,
    image: 'http://localhost:5000/images/hoodie.jpeg'
  },
  {
    _id: '3',
    name: 'Vibe Cap',
    price: 19.99,
    image: 'http://localhost:5000/images/cap.jpeg'
  },
  {
    _id: '4',
    name: 'Vibe Sneakers',
    price: 89.99,
    image: 'http://localhost:5000/images/sneakers.jpeg'
  },
  {
    _id: '5',
    name: 'Vibe Water Bottle',
    price: 14.99,
    image: 'http://localhost:5000/images/bottle.jpeg'
  },
  {
    _id: '6',
    name: 'Vibe Shorts',
    price: 24.99,
    image: 'http://localhost:5000/images/shorts.jpeg'
  },
  {
    _id: '7',
    name: 'Vibe Jacket',
    price: 79.99,
    image: 'http://localhost:5000/images/jacket.jpeg'
  },
  {
    _id: '8',
    name: 'Vibe Backpack',
    price: 59.99,
    image: 'http://localhost:5000/images/backpack.jpeg'
  },
  {
    _id: '9',
    name: 'Vibe Sunglasses',
    price: 39.99,
    image: 'http://localhost:5000/images/sunglass.jpeg'
  },
  {
    _id: '10',
    name: 'Vibe Watch',
    price: 129.99,
    image: 'http://localhost:5000/images/watch.jpeg'
  },
];

let globalCart = [];

app.get('/', (req, res) => {
  res.send('Vibe Commerce API is running!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});


app.get('/api/cart', (req, res) => {
  const calculateTotal = () => {
    return globalCart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  };

  res.json({
    items: globalCart,
    total: calculateTotal(),
  });
});


app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existItem = globalCart.find((x) => x._id === product._id);

  if (existItem) {
    existItem.qty = Number(qty);
  } else {
    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty),
    };
    globalCart.push(cartItem);
  }

  res.status(201).json(globalCart);
});


app.delete('/api/cart/:id', (req, res) => {
  const productId = req.params.id;

  globalCart = globalCart.filter((x) => x._id !== productId);

  res.json({ message: 'Item removed', cart: globalCart });
});


app.post('/api/checkout', (req, res) => {
  const { cartItems } = req.body;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);


  const receipt = {
    receiptId: `VIBE-${Date.now()}`,
    total: total,
    itemsCount: cartItems.reduce((acc, item) => acc + item.qty, 0),
    timestamp: new Date().toISOString(),
  };


  globalCart = [];


  res.status(200).json(receipt);
});



app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});