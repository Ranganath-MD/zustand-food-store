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

export const CartSummary = () => {
  const [showModal, setShowModal] = useState(false);
  const [cart, clearCart] = useStore((state) => [
    state.cart,
    state.clearCart,
  ]);

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
            Cart Summary
          </Text>
          {cart.length > 0 && (
            <ActionIcon
              variant="transparent"
              onClick={() => setShowModal(true)}
            >
              <RiDeleteBin6Line color="#fff" size={15} />
            </ActionIcon>
          )}
        </div>
      </div>
      {cart.length > 0 ? (
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
          {cart.map((item) => (
            <CartItem item={item} key={item.item.foodid} />
          ))}
          <Text
            size="sm"
            align="center"
            weight={600}
            style={{
              marginTop: "1rem",
            }}
          >
            Total Amount: $
            {cart.reduce(
              (acc, item) => acc + item.total,
              0
            )}
          </Text>
          <Link
            to="/checkout"
            style={{
              textDecoration: "none",
            }}
          >
            <Button fullWidth>Proceed to checkout</Button>
          </Link>
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
              Your cart is empty
            </Text>
          </div>
        </div>
      )}
      <Modal
        size={250}
        centered
        opened={showModal}
        // hideCloseButton
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
