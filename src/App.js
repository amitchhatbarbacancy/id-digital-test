import { Card, CardContent, Grid, TextField } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Data from './data.js';
import debounce from 'lodash.debounce';
import CheckOut from './components/checkout';
import ProductComponent from './components/productComponent';

const initTotal = {
  subTotal: 0,
  total: 0,
};

const App = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState({});
  const [allowedProducts, setAllowedProducts] = useState([]);
  const [generatedBill, setGeneratedBill] = useState(initTotal);
  const [cardBalance, setCardBalance] = useState(0);

  const jsonData = Data;

  const debounceSearch = useRef(
    debounce((cardNum) => {
      const foundCard =
        cardNum && jsonData.find((data) => data.number === Number(cardNum));
      if (foundCard) {
        setCardBalance(foundCard.balance);
        setAllowedProducts(foundCard.allowedProducts);
      }
    }, 100),
  );

  useEffect(() => {
    if (cardNumber) {
      debounceSearch.current(cardNumber);
    } else {
      setAllowedProducts([]);
    }
  }, [cardNumber]);

  const setProduct = (product, index) => {
    const data = [...products];
    data[index] = product;
    setProducts([...data]);
  };

  useEffect(() => {
    const cost = { ...initTotal };
    products.forEach((product) => {
      cost.subTotal += product.price * Number(product.qty);
      if (product.discountCentsPerLitre) {
        cost.total +=
          product.price * product.qty -
          (product.discountCentsPerLitre / 100) * product.qty;
      }
      cost.total = cost.subTotal;
      if (cost.total > cardBalance) {
        setError({ ...error, total: true, index: 0 });
      }
    });

    if (cost.total > cardBalance) {
      setError({ ...error, total: true, index: 0 });
    }
    setGeneratedBill({ ...cost });
  }, [products, error, cardBalance]);

  const handleBlur = (index) => {
    const product = products[index];
    if (
      product.price <= product.minPriceCents / 100 ||
      product.price >= product.maxPriceCents / 100
    ) {
      setError({ ...error, price: true, index });
    } else {
      setError({ price: false, index: -1 });
    }
  };

  const handleProductChange = (label, value, index) => {
    let product = products[index];
    if (label === 'product') {
      product = allowedProducts.find(item => item.id === value);
      product.qty = 1;
      product.price = 0;
      setProduct(product, index);
    } else {
      product[label] = value;
      setProduct(product, index);
    }
  };

  const addProducts = () => {
    const obj = {
      id: '',
      name: '',
      quantity: 1,
      price: ''
    }
    setProducts([...products, obj]);
  };

  const removeProducts = (index) => {
    const data = [...products];
    data.splice(index, 1);
    setProducts([...data]);
  };


  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      color="primary"
      className="container"
    >
      <Grid item md={5} xs={12} sm={12}>
        <Card>
          <CardContent>
            <TextField
              id="card-number"
              label="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2>Purchase</h2>
            <ProductComponent
              allowedProducts={allowedProducts}
              addProducts={addProducts}
              products={products}
              handleProductChange={handleProductChange}
              removeProducts={removeProducts}
              error={error}
              handleBlur={handleBlur}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CheckOut
              disabled={!(cardBalance > 0 && cardBalance >= generatedBill.total)}
              generatedBill={generatedBill}
              products={products}
              error={error}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
