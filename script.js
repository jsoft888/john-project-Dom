const Nav = (props) => {
  const { setShow, size } = props;
  return(
    <>
      <nav>
        <h1 onClick={() => setShow(true)}>Shoping app</h1>
        <ul>
          <li><svg onClick={() => setShow(false)} fill="#ffffff" viewBox="0 0 576 512" width="20" title="shopping-cart">
  <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" />
</svg></li>
         <li className="size">{size}</li>
        </ul>
      </nav>
      
    </>
  )
}

const MyApp = () => {
  const [product] = useState([
    {
      link: 'https://images.unsplash.com/photo-1622690760696-d75f2d7a7c94?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjQ1NDU4NzY&ixlib=rb-1.2.1&q=80',
    name: 'Watermelon',
    price: 20,
    }
  ])
  const [cart, setCart] = useState([]);
  const [show, setShow] = useState(true);
  const [qty, setQty] = useState(1);
  
   const addToCart = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };
  useEffect(() => {
    console.log("cart change")
  }, [cart])
  return(
    <>
        <Nav setShow={setShow} size={cart.length}/>
        {show? <ItemCart product={product} addToCart={addToCart} qty={qty} setQty={setQty} /> : <Cart cart={cart} setCart={setCart} qty={qty} />
        
        }
       
    </>
  )
}

const ItemCart = (props) => {
  const { product, qty, setQty, addToCart } = props;
  return(
    <>
      {product.map((data, i) => {
        return(
          <div className="cart" key={i}>
              <img src={data.link} alt="watermelon"/>
              {data.name} ${data.price * qty}
            <div className="buttonGroup">
            <button type="button" disabled={qty <= 1} onClick={() => setQty(qty - 1)}>-</button>
            {qty}
            <button type="button" onClick={() => setQty(qty + 1)}>+</button>
            </div>
              <button type="button" onClick={() => addToCart(data)}>Add to card</button>
          </div>
        )})  
      }
    </>
  )
}

const Cart = (props) => {
  const { cart, setCart, qty } = props;

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.link} alt="" />
            <p>{item.name}</p>
            <p>${item.price * qty}</p>
          </div>
          <div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </article>
  );
};
ReactDOM.render(<MyApp />, document.querySelector("#app"));