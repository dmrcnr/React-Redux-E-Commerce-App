import React from "react";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import DashBoard from "./DashBoard";
import { Route, Routes} from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <Container>
      <Navi />
      <Routes>
        <Route path="/" element={<DashBoard/>} />
        <Route path="/product" element={<DashBoard/>} />
        <Route path="/cart" element={<CartDetail/>} />
        <Route path="/saveproduct/:productId" element={<AddOrUpdateProduct/>}/>
        <Route path="/saveproduct" element={<AddOrUpdateProduct/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Container>
  );
}

export default App;
