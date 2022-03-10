import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useStore } from "../store/store";
import {
  Grid,
  Button,
  Group,
  Space,
  Skeleton,
  CloseButton,
} from "@mantine/core";
import {
  MenuItem,
  CartSummary,
  YourOrder,
} from "../components";

export const Home = () => {
  const [category, setCategory] = useState("");
  const [fetchEventdata, menu, loading] = useStore((state) => [
    state.fetchEventdata,
    state.menu,
    state.loading,
  ]);

  useEffect(() => {
    fetchEventdata();
  }, []);

  const handleCategory = useCallback(
    (category) => {
      setCategory(category);
    },
    [category]
  );

  const full_menu = useMemo(() => {
    if (category === "") return menu;
    return menu.filter((item) => item.category === category);
  }, [category])

  return (
    <div>
      <Categories
        handleCategory={handleCategory}
        category={category}
      />
      <Space h="md" />
      <Grid columns={24} gutter="xl">
        <Grid.Col span={16}>
          <Skeleton
            visible={loading}
            height={loading && "250px"}
          >
            {full_menu &&
              full_menu.map((item) => (
                <MenuItem item={item} key={item.foodid} />
              ))}
          </Skeleton>
        </Grid.Col>
        <Grid.Col span={8}>
          <CartSummary />
          <YourOrder />
        </Grid.Col>
      </Grid>
    </div>
  );
};

const Categories = ({ category, handleCategory }) => {
  const [categories, loading] = useStore((state) => [
    state.categories,
    state.loading,
  ]);

  return (
    <Skeleton
      visible={loading}
      height={loading && "50px"}
      width={loading && "400px"}
      style={{
        marginTop: "1rem",
      }}
    >
      <Group
        style={{
          marginTop: "1rem",
        }}
      >
        {categories &&
          Object.keys(categories).map((key) => {
            const icon = categories[key].icon;
            return (
              <Button
                key={key}
                variant="light"
                style={{
                  border:
                    category === key
                      ? "2px solid #000"
                      : "",
                }}
                size="xs"
                leftIcon={
                  <img
                    src={icon}
                    alt={key}
                    width={20}
                    height={20}
                  />
                }
                onClick={() => handleCategory(key)}
              >
                {key}
              </Button>
            );
          })}
        {category && (
          <CloseButton
            onClick={() => handleCategory("")}
          />
        )}
      </Group>
    </Skeleton>
  );
};
