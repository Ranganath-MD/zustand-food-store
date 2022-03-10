import React, { useMemo } from "react";
import {
  Grid,
  NumberInput,
  Select,
  TextInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useStore } from "../store/store";

const style = {
  unstyledVariant: {
    boxShadow: "0px 4px 20px 0px rgb(204 204 204 / 0.5)",
    borderRadius: "5px",
  },
};

export function AddtoCartForm({ item }) {
  const form = useForm({
    initialValues: {},
  });

  const addToCart = useStore(state => state.addToCart);

  const sessionlist = useMemo(() => {
    return item?.sessionlist.map((session) => {
      return {
        value: session,
        label: session,
      };
    });
  }, []);

  const handleChangeQauntity = (value) => {
    console.log(value);
    if (value > 0) {
      form.setFieldValue("quantity", value);
      const totalAmount = item.price * value;
      form.setFieldValue("total", totalAmount);
    } else if (value === undefined) {
      form.setFieldValue("total", 0);
      form.setFieldValue("quantity", undefined);
    }
  }

  const handleAddTocart = (values) => {
    if (values.quantity === undefined) {
      form.setFieldError('quantity', 'Quantity cannot be 0');
    } else if (values.session === '') {
      form.setFieldError('session', 'Please select session');
    } else {
      const cartItem = { ...values, item };
      addToCart(cartItem);
      form.setFieldValue("quantity", undefined);
      form.reset();
    }
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleAddTocart(values))}>
      <Grid columns={24} gutter="md">
        <Grid.Col span={9}>
          <NumberInput
            placeholder="Quantity"
            label="Quantity"
            hideControls
            variant="unstyled"
            value={form.values.quantity}
            styles={style}
            min={1}
            max={10}
            onChange={handleChangeQauntity}
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Select
            label="Session"
            placeholder="Select Session"
            data={sessionlist}
            variant="unstyled"
            styles={style}
            {...form.getInputProps("session")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            placeholder="$ 0.00"
            label="Sub total"
            hideControls
            readOnly
            value={form.values?.total}
            variant="unstyled"
            styles={style}
            {...form.getInputProps("total")}
          />
        </Grid.Col>
      </Grid>
      <Grid columns={24} gutter="md" align="end">
        <Grid.Col span={18}>
          <TextInput
            label="Note to the kitchen"
            variant="unstyled"
            styles={style}
            {...form.getInputProps("note")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            fullWidth
            style={{
              fontSize: 12,
            }}
            type="submit"
          >
            Add To Cart
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
