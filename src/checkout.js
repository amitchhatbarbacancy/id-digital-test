import { Button, Card, CardContent, FormHelperText, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const CheckOut = ({ generatedBill, products, error, disabled }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h4" className="text-primary">
                    Checkout
          </Typography>
                <Grid container className={classes.container}>
                    <Grid item sm={8}>
                        SubTotal
            </Grid>
                    <Grid item sm={3} className={classes.right}>
                        {`$ ${generatedBill.subTotal}`}
                    </Grid>
                    {products &&
                        products.map((product) => {
                            return (
                                product.discountCentsPerLitre && (
                                    <>
                                        <Grid item sm={8}>
                                            {product.name}
                                        </Grid>
                                        <Grid item sm={3} className={classes.right}>
                                            {`- $ ${product.discountCentsPerLitre / 100}`}
                                        </Grid>
                                    </>
                                )
                            );
                        })}
                    <Grid item sm={8}>
                        Total to tender
            </Grid>
                    <Grid item sm={3} className={classes.right}>
                        {`$ ${generatedBill.total}`}
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    className={classes.processNowBtn}
                    disabled={disabled}
                >
                    PROCESS NOW
          </Button>
                <FormHelperText className={classes.error}>
                    {error.total ? 'Total is greater than card balence' : ''}
                </FormHelperText>
            </CardContent>
        </Card>
    );
};

export default CheckOut;