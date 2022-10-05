import React, { useState, useEffect } from "react";
import "../App.scss";
import styles from "./cart.module.scss";
import CartItem from "./cartItem";

function Cart({ cart, showCart }) {
    console.log(cart, showCart);
    useEffect(() => {}, []);

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
                cart?.lineItems?.map((lineItem) => (
                    <CartItem lineItem={lineItem} />
                ))
            ) : (
                <div className={styles.noItems}>NO ITEMS IN YOUR CART</div>
            )}
        </div>
    );
}

export default Cart;
