import React, { useState } from "react";
import {
  Grid,
  Space,
  Text,
  ActionIcon,
  Modal,
  Button,
} from "@mantine/core";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useStore } from "../store/store";

export const CartItem = ({ item, type }) => {
  const deleteItem = useStore(state => state.deleteItem);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteItem = () => {
    deleteItem(item);
    setShowModal(false);
  };

  return (
    <div
      style={{
        padding: "1rem 0",
        borderBottom: "2px dotted #ccc",
      }}
    >
      <Grid columns={24} align="center">
        <Grid.Col span={12}>
          <Text size="xs" weight={600}>
            {item.item.foodname}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xs" weight={600}>
            {item.quantity}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text size="xs" weight={600}>
            ${item.total}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          {type === "orders" && (
            <ActionIcon
              variant="transparent"
              onClick={() => setShowModal(true)}
            >
              <RiDeleteBin6Line size={15} />
            </ActionIcon>
          )}
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <div>
        {item.note && (
          <div>
            <Text size="xs" color="#a5a5a5">
              Note to kitchen
            </Text>
            <Text size="xs" weight={600}>
              {item.note}
            </Text>
          </div>
        )}
      </div>
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
            Are you sure you want to delete this item?
          </Text>
          <br />
          <Button size="sm" onClick={handleDeleteItem}>
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
    </div>
  );
};
