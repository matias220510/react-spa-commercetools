import React, { useState, useEffect } from "react";
import styles from "./cartItem.module.scss";

function CartItem({ lineItem }) {
    useEffect(() => {
        console.log("cart ITEM!", lineItem);
    });

    return (
        <div className={styles.cartItem}>
            <div className={styles.item}>
                <div className={styles.buttons}>
                    <span className={styles["delete-btn"]}></span>
                    <span className={styles["like-btn"]}></span>
                </div>

                <div className={styles.image}>
                    <img src={lineItem.variant.images[0].url} alt="" />
                </div>

                <div className={styles.description}>
                    <span>{lineItem.name.en}</span>
                    <span>Bball High</span>
                    <span>White</span>
                </div>

                <div className={styles.quantity}>
                    <button
                        className={styles["plus-btn"]}
                        type="button"
                        name="button"
                    >
                        <img src="../public/plus.svg" alt="" />
                    </button>
                    <input type="text" name="name" value="1" />
                    <button
                        className={styles["minus-btn"]}
                        type="button"
                        name="button"
                    >
                        <img src="../public/minus.svg" alt="" />
                    </button>
                </div>

                <div className={styles["total-price"]}>
                    ${lineItem.variant?.prices[2].value.centAmount / 100}
                </div>
            </div>
        </div>
    );
}

export default CartItem;
