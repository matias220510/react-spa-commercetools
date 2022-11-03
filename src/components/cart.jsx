import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";
import "../App.scss";
import styles from "./cart.module.scss";
import CartItem from "./cartItem";

function Cart({
    cart,
    order,
    showCart,
    handleCreateOrder,
    handleSetShippingAddress,
    handleCreatePayment,
    handleAddPaymentInfo,
    handlePay,
}) {
    console.log(cart, showCart);
    useEffect(() => {}, []);

    const onToken = async (res) => {
        console.log("On Token Called!");
        console.log("RES", res);
        // const order = await createOrder({
        //     variables: {
        //         token: res.id,
        //     },
        // }).catch((err) => {
        //     alert(err.message);
        // });

        // Router.push({
        //     pathname: "/order",
        //     query: { id: order.data.createOrder.id },
        // });
    };

    const onClosed = (res) => {
        console.log("onClosed!", res);
    };

    return (
        <div
            className={`${styles["shopping-cart"]} ${
                showCart ? styles.active : ""
            }`}
        >
            <div className={styles.cartHeader}>
                <div className={styles.title}>Shopping Bag</div>
                <div className={styles["total-price"]}>
                    {cart?.totalPrice
                        ? `Total Price: ${cart?.totalPrice.centAmount / 100}`
                        : ""}
                </div>
            </div>

            {cart?.lineItems ? (
                <div>
                    {cart?.lineItems?.map((lineItem) => (
                        <CartItem lineItem={lineItem} />
                    ))}
                    <div className={styles.buttonsContainer}>
                        <button
                            onClick={handleSetShippingAddress}
                            className={styles.createOrder}
                        >
                            Set Shipping address
                        </button>
                        <button
                            onClick={handleCreateOrder}
                            className={styles.createOrder}
                        >
                            Create Order
                        </button>
                        <button
                            onClick={handleCreatePayment}
                            className={styles.createOrder}
                        >
                            Create Payment
                        </button>
                        <button
                            onClick={handleAddPaymentInfo}
                            className={styles.createOrder}
                        >
                            ADD PAYMENT INFO
                        </button>

                        {order ? (
                            <button onClick={handlePay} type="submit">
                                PAY
                            </button>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.noItems}>NO ITEMS IN YOUR CART</div>
            )}
        </div>
    );
}

export default Cart;
