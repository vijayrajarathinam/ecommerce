import { Grid, Grow, makeStyles } from "@material-ui/core";
import React from "react";
import Product from "./Product";

const useStyles = makeStyles({
  mt: {
    marginTop: "10px",
    paddingLeft: "12px",
    width: "100%",
  },
  container: {
    padding: "0 5%",
    width: "100%",
    mmargin: 0,
  },
});

function Products({ products, active }) {
  const classes = useStyles();
  return (
    <Grow in className={classes.mt}>
      <Grid container className={classes.container} alignItems="stretch" spacing={3}>
        {products.map((pdt, idx) => (
          <Grid xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
            <Product
              i={idx}
              id={idx}
              title={pdt.product_title.substring(0, 100)}
              image={pdt.product_main_image_url}
              price={pdt.app_sale_price}
              rating={5}
              author={pdt.product_id}
              subtitle={pdt.original_price}
              active={active}
            />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
}

export default Products;
