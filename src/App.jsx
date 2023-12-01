import Meals from "./components/Meals";
import Header from "./components/Header";
import CartContextProvider from "./store/cart-context";

function App() {
  console.clear()
  return (
    <CartContextProvider>
    <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
