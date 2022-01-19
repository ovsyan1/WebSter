import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {BodyWrapper, LoaderWrapper, Wrapper} from "./styles";
import {createOrder, getOrders} from "../../api";
import Button from "@mui/material/Button";
import { NewOrder } from "../../components/Orders/NewOrder";
import { OrderList } from '../../components/Orders/OrderList';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import Loader from "../../components/Loader";

const Orders: React.FC = () => {
  const [newOrder, setNewOrder] = useState(false);
  const eee: any = null;
  const [currentOrder, setCurrentOrder] = useState(eee);
  const dispatch = useDispatch();
  const allOrders = useSelector(
    (state: RootState) => state.orders.ordersResponse?.data
  );
  const orderData = useSelector((state: RootState) => state.order.orderResponse?.data);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, orderData]);

  useEffect(() => {
    if(order.orderResponse) {
      setCurrentOrder(order.orderResponse.data);
    } else {
      setCurrentOrder(null);
    }
  }, [newOrder, order]);

  const newOrderOnClick = () => {
    dispatch(createOrder());
    dispatch(getOrders());
    setNewOrder(true);
  };

  const dropZero = (val: string) => {
    return val.replace(/^0+/, "");
  };

  const selectOrder = (item: any) => {
    setCurrentOrder(item);
  }

  return (
    <BodyWrapper>
      <Header drawer />
      {currentOrder && <NewOrder order={currentOrder} dropZero={dropZero} setCurrentOrder={setCurrentOrder} />}
      {!currentOrder && allOrders && (
        <Wrapper>
          <Button onClick={() => newOrderOnClick()}>Створити нове замовлення</Button>
                        <OrderList orders={allOrders} dropZero={dropZero} selectOrder={selectOrder} />
        </Wrapper>
      )}
      <LoaderWrapper>
      {!allOrders && <Loader />}
      </LoaderWrapper>
      
      <Footer />
    </BodyWrapper>
  );
};

export default Orders;
