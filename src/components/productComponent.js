import { Button, Card, CardContent, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import RemoveIcon from "@material-ui/icons/Remove"
import { useStyles } from "./../styles";

const ProductComponent = ({ allowedProducts,
    handleProductChange,
    removeProducts,
    error,
    handleBlur,
    products,
    addProducts }) => {

    const classes = useStyles();
    return (<div>
        {allowedProducts && allowedProducts.length > 0 &&
            <>
                {products &&
                    products.map((product, index) => {
                        return (
                            <Card key={product.id}>
                                <CardContent>
                                    <Grid container className={classes.container}>
                                        <Grid item md={4} xs={12} sm={12} className={classes.productItem}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="select-label">Product</InputLabel>
                                                <Select
                                                    labelId="select-label"
                                                    id="product"
                                                    required
                                                    value={product.id}
                                                    onChange={(e) =>
                                                        handleProductChange('product', e.target.value, index)
                                                    }
                                                >
                                                    {allowedProducts &&
                                                        allowedProducts.map((allowedProduct) => {
                                                            return (
                                                                <MenuItem
                                                                    value={allowedProduct.id}
                                                                    key={allowedProduct.id}
                                                                >
                                                                    {allowedProduct.name}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
                                            <TextField
                                                id="qty"
                                                label="Qty/Litre"
                                                required
                                                value={product.qty}
                                                onChange={(e) =>
                                                    handleProductChange('qty', e.target.value, index)
                                                }
                                            />
                                        </Grid>
                                        <Grid item md={3} xs={12} sm={12} className={classes.productItem}>
                                            <TextField
                                                id="price"
                                                label="Unit Price/$"
                                                required
                                                value={product.price}
                                                onChange={(e) =>
                                                    handleProductChange('price', e.target.value, index)
                                                }
                                                onBlur={() => handleBlur(index)}
                                            />
                                            {error.price &&
                                                (error.index === index ? (
                                                    <FormHelperText className={classes.error}>
                                                        {`Unit Price should be between ${product.minPriceCents / 100
                                                            } and ${product.maxPriceCents / 100}`}
                                                    </FormHelperText>
                                                ) : (
                                                        ""
                                                    ))}
                                        </Grid>
                                        <Grid item md={1} xs={12} sm={12} className={classes.iconGrid}>
                                            <RemoveIcon
                                                className={classes.icon}
                                                onClick={() => removeProducts(index)}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        );
                    })}
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={addProducts}
                >
                    Add Product
              </Button>
            </>
        }
    </div>
    )
}

export default ProductComponent;