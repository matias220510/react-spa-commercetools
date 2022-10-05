import React, { useState, useEffect } from "react";
import Cart from "./components/cart";
import "./App.scss";

function App() {
    const [results, setResults] = useState([]);
    const [setToken, token] = useState("Qrc48eNeaAETDButZHu1ZjfMrKQg_U7f");
    const [isValidToken, setIsValidToken] = useState(true);
    const [cart, setCart] = useState(null);
    const [showCart, setShowCart] = useState(false);

    const TOKEN = "GBfG3c-uxDwJKK-Q0_dwzki1z2nnF8IF";

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "",
            Authorization: "Bearer " + TOKEN,
        },
    };

    const accessTokenOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "",
            Authorization:
                "Basic VUdqUFBQSGs5U2xnWVRzcHdBYjliNGpEOndwLXA2bVREa1JOeklvd2NROUVjcGp2TWhXSUJYaVV3",
            grant_type: "client_credentials",
        },
    };

    useEffect(() => {
        if (!isValidToken) {
            fetch(
                "https://UGjPPPHk9SlgYTspwAb9b4jD:wp-p6mTDkRNzIowcQ9EcpjvMhWIBXiUw@auth.us-central1.gcp.commercetools.com/oauth/token",
                accessTokenOptions
            )
                .then((response) => response.json())
                .then((res) => {
                    // setResults(res.results);
                    console.log("NEW TOKEN!", res);
                })
                .catch((error) => {
                    console.log(error, "TOKEN ERROR");
                });
        } else {
            fetch(
                "https://api.us-central1.gcp.commercetools.com/getting-started-project-matias/products",
                options
            )
                .then((response) => response.json())
                .then((res) => {
                    setResults(res.results);
                    console.log("res", res.results);
                })
                .catch((error) => {
                    console.log(error, "ERROR");
                });
        }
    }, []);

    const getCart = async () => {
        if (cart) {
            console.log("returning existing cart!", cart);
            return cart;
        }

        const response = await fetch(
            "https://api.us-central1.gcp.commercetools.com/getting-started-project-matias/carts",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + TOKEN,
                },
                body: JSON.stringify({
                    currency: "EUR",
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Data coud not be fetched!");
        } else {
            return response.json();
        }
    };

    const handleAddToCart = async (productId, variantId) => {
        const temporalCart = await getCart();

        console.log("ADDING PRODUCT TO THE CART!", temporalCart, productId);
        fetch(
            "https://api.us-central1.gcp.commercetools.com/getting-started-project-matias/carts/" +
                temporalCart.id,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + TOKEN,
                },
                body: JSON.stringify({
                    version: temporalCart.version,
                    actions: [
                        {
                            action: "addLineItem",
                            productId: productId,
                            variantId: variantId,
                            quantity: 1,
                        },
                    ],
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setCart(res);
                console.log("ADDED PRODUCT", res);
            })
            .catch((error) => {
                console.log(error, "ERROR");
            });
    };

    const handleCartClick = () => {
        setShowCart(!showCart);
    };

    return (
        <div className="App">
            <h1>React + Commercetools!</h1>
            <div className="cartContainer">
                <img
                    onClick={handleCartClick}
                    src={"./src/assets/cart-icon2.png"}
                />
                {cart?.totalLineItemQuantity > 0 ? (
                    <div className="quantity">
                        {cart?.totalLineItemQuantity}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div>
                <Cart cart={cart} showCart={showCart} />
            </div>
            <div className="products">
                {results.map((product) => (
                    <div className="products__product-card">
                        <h3 className="products__product-card__product-title">
                            {product.masterData.current.name.en}
                        </h3>
                        <img
                            className="products__product-card__product-img"
                            src={
                                product.masterData.current.masterVariant
                                    ?.images[0].url
                            }
                        />

                        <p>
                            Price:{" $"}
                            {product.masterData.current.masterVariant?.prices[2]
                                .value.centAmount / 100}
                        </p>
                        <button
                            onClick={() =>
                                handleAddToCart(product.id, product.variantId)
                            }
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;