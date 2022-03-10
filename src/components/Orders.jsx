import React, { useState } from "react";
import {
  Modal,
  Paper,
  Text,
  Grid,
  Button,
  ActionIcon,
} from "@mantine/core";
import { useStore } from "../store/store";
import { BsCart4 } from "react-icons/bs";
import { CartItem } from "../components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

export const YourOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const [orders] = useStore((state) => [state.orders]);
  console.log(orders)
  return (
    <Paper
      shadow="sm"
      style={{
        marginBottom: "1rem",
        borderRadius: 10,
        minHeight: 200,
      }}
    >
      <div>
        <div
          style={{
            backgroundColor: "blue",
            padding: "0.5rem",
            borderRadius: "10px 10px 0 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text size="md" weight={700} color="#fff">
            Your Orders
          </Text>
        </div>
      </div>
      {orders.length > 0 ? (
        <div
          style={{
            padding: 10,
          }}
        >
          <Grid columns={24}>
            <Grid.Col span={12}>
              <Text size="xs" color="#a5a5a5">
                Item
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" color="#a5a5a5">
                Qty
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" color="#a5a5a5">
                Sub total
              </Text>
            </Grid.Col>
          </Grid>
          {orders.map((item) => {
            console.log(item)
            return (
              <CartItem
                item={item}
                type="order"
                key={item.item.foodid}
              />
            );
          })}
        </div>
      ) : (
        <div
          style={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <BsCart4 size={30} color="#ccc" />
            <Text color="#ccc" size="sm" align="center">
              No Orders
            </Text>
          </div>
        </div>
      )}
      <Modal
        size={250}
        centered
        opened={showModal}
        hideCloseButton
        onClose={() => setShowModal(false)}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Text size="sm" align="center" weight={700}>
            Are you sure you want to clear the cart?
          </Text>
          <br />
          <Button
            size="sm"
            onClick={() => {
              setShowModal(false);
              clearCart();
            }}
          >
            Confirm
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Paper>
  );
};
