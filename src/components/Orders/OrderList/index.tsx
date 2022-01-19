import * as React from "react";
import { Container, Line, LineNumber } from "./styles";
import { OrdersListProps } from "../../../types";

export const OrderList: React.FC<OrdersListProps> = ({
  orders,
  dropZero,
  selectOrder,
}) => {
  return (
    <Container>
      <div>Ваші минулі замовлення:</div>
      <Line>
        <LineNumber style={{ justifyContent: "center" }}>Номер</LineNumber>
        <div style={{ justifyContent: "center" }}>Статус</div>
      </Line>
      {}
      {orders?.map((item, index) => (
        <Line key={index} onClick={() => selectOrder(item)}>
          <LineNumber>№{dropZero(item.number)}</LineNumber>
          <div>{item.status}</div>
        </Line>
      ))}
    </Container>
  );
};
