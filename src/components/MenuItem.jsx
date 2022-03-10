import React from "react";
import {
  Paper,
  Text,
  Image,
  Grid,
  Space,
} from "@mantine/core";
import { AddtoCartForm } from "./AddTocartForm";

export const MenuItem = ({ item }) => {
  return (
    <Paper
      padding="lg"
      shadow="sm"
      style={{
        marginBottom: "1rem",
      }}
    >
      <Grid
        columns={24}
        style={{
          borderBottom: "2px dotted #ccc",
        }}
      >
        <Grid.Col span={5}>
          <Image
            src={item?.imageurl}
            alt={item?.foodname}
            fit="cover"
            radius="md"
            withPlaceholder
          />
        </Grid.Col>
        <Grid.Col span={16}>
          <Text weight={700}>{item?.foodname}</Text>
          <Text color="gray" size="xs">
            {item?.fooddescription}
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            weight={700}
            color="blue"
            size="sm"
            align="right"
          >
            ${item.price}
          </Text>
        </Grid.Col>
      </Grid>
      <Space h="md" />
      <AddtoCartForm item={item} />
    </Paper>
  );
};
