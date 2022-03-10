import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  Text,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [cart, clearCart, setOrders] = useStore((state) => [
    state.cart,
    state.clearCart,
    state.setOrders
  ]);
  const navigate = useNavigate();
   const theme = useMantineTheme();
  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      <h1>Order Summary</h1>
      <Paper
        shadow="sm"
        style={{
          marginBottom: "1rem",
          borderRadius: 10,
          minHeight: 200,
          padding: "1rem",
        }}
      >
        <ul>
          <h3>Order Details</h3>
          {cart.map((item) => (
            <Grid
              columns={24}
              align="center"
              key={item.item.foodid}
              style={{
                borderBottom: "2px dotted #ccc",
              }}
            >
              <Grid.Col span={12}>
                <Text size="xs" weight={600} color="gray">
                  Item
                </Text>
                <Text size="sm" weight={600}>
                  {item.item.foodname}
                </Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="xs" weight={600} color="gray">
                  Quantity
                </Text>
                <Text size="sm" weight={600}>
                  {item.quantity}
                </Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size="xs" weight={600} color="gray">
                  Price
                </Text>
                <Text size="sm" weight={600}>
                  ${item.total}
                </Text>
              </Grid.Col>
            </Grid>
          ))}
        </ul>
        <Button
          onClick={() => setShowModal(true)}
          style={{
            width: 200,
            margin: "auto",
          }}
        >
          Pay Now
        </Button>
      </Paper>
      <Modal
        size={400}
        centered
        opened={showModal}
        onClose={() => {
          setShowModal(false);
          setOrders();
          clearCart();
          navigate("/");
        }}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.95}
      >
        <span>
          <h1>Thank you for your order!</h1>
        </span>
      </Modal>
    </div>
  );
};
