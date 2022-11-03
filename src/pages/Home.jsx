import React, { useState, useEffect } from "react";
import Cart from "../components/cart";
import cartIcon from "../../public/cart-icon2.png";
import "../App.scss";

function Home() {
    const [results, setResults] = useState([]);
    const [token, setToken] = useState(null);
    const [isValidToken, setIsValidToken] = useState(false);
    const [cart, setCart] = useState(null);
    const [order, setOrder] = useState(null);
    const [payment, setPayment] = useState(null);
    const [showCart, setShowCart] = useState(false);

    const randomOrderNumber = (min = 0, max = 10000000) => {
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor(rand * difference);
        rand = rand + min;

        return rand.toString();
    };

    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "",
            Authorization: "Bearer " + token,
        },
    };

    const accessTokenOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "",
            Authorization:
                "Basic " +
                btoa(
                    "lIh0bbjZq8e56l4_HKiwQAJL:BZz6R_y2G8VYzlD0FFO0XzeuzJUT5mzt"
                ),
        },
    };

    const USER_INFO = {
        id: "ef1883a1-d698-4ea2-9e7d-3d244b7dcc7c",
        email: "john.doe@example.com",
    };

    useEffect(() => {
        console.log("USE EFFECT", token);
        if (!isValidToken && !token) {
            fetch(
                "https://auth.us-central1.gcp.commercetools.com/oauth/token?grant_type=client_credentials",
                accessTokenOptions
            )
                .then((response) => response.json())
                .then((res) => {
                    if (res.access_token) {
                        setToken(res.access_token);
                        setIsValidToken(true);
                        console.log("NEW TOKEN!", res);
                    }
                })
                .catch((error) => {
                    console.log("TOKEN ERROR", error);
                });
        } else {
            fetch(
                `https://api.us-central1.gcp.commercetools.com/${
                    import.meta.env.VITE_PROJECT_KEY
                }/products`,
                options
            )
                .then((response) => response.json())
                .then((res) => {
                    setResults(res.results);
                    console.log("RES PRODUCTS!", res.results);
                })
                .catch((error) => {
                    console.log(error, "ERROR");
                });
        }
    }, [token]);

    const getCart = async () => {
        if (cart) {
            console.log("returning existing cart!", cart);
            return cart;
        }

        const response = await fetch(
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/carts`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    currency: "EUR",
                    customerId: USER_INFO.id,
                    customerEmail: USER_INFO.email,
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
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/carts/${temporalCart.id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
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

    const handleCreateOrder = () => {
        console.log("CREATE ORDER!", cart.id, cart.version);
        fetch(
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/orders/`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    id: cart.id,
                    version: cart.version,
                    paymentState: "Pending",
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setOrder(res);
                console.log("ORDER CREATED", res);
            })
            .catch((error) => {
                console.log("ORDER CREATION error", error);
            });
    };

    const handleSetShippingAddress = () => {
        console.log("SET SHIPPING ADDRESS!", cart.id, cart.version);
        fetch(
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/carts/${cart.id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    version: cart.version,
                    actions: [
                        {
                            action: "setShippingAddress",
                            address: {
                                key: "exampleKey",
                                title: "My Address",
                                salutation: "Mr.",
                                firstName: "Example",
                                lastName: "Person",
                                streetName: "Examplary Street",
                                streetNumber: "4711",
                                additionalStreetInfo: "Backhouse",
                                postalCode: "80933",
                                city: "New York",
                                region: "",
                                state: "New York",
                                country: "US",
                                company: "My Company Name",
                                department: "Sales",
                                building: "Hightower 1",
                                apartment: "247",
                                pOBox: "2471",
                                phone: "+49 89 12345678",
                                mobile: "+49 171 2345678",
                                email: "email@example.com",
                                fax: "+49 89 12345679",
                                additionalAddressInfo: "no additional Info",
                                externalId: "Information not needed",
                                taxCategoryId:
                                    "1ce299a0-95e7-42b5-9f59-7aa605bf93f4",
                            },
                        },
                    ],
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setCart(res);
                console.log("SHIPPING ADDRESS DONE", res);
            })
            .catch((error) => {
                console.log("SHIPPING ADDRESS ERROR", error);
            });
    };

    const handleAddPaymentInfo = () => {
        console.log("ADD PAYMENT INFO!", cart.id, cart.version);
        fetch(
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/orders/${order.id}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    version: order.version,
                    actions: [
                        {
                            action: "addPayment",
                            payment: {
                                typeId: "payment",
                                id: payment.id,
                            },
                        },
                    ],
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setCart(res);
                console.log("ADD PAYMENT INFO DONE", res);
            })
            .catch((error) => {
                console.log("ADD PAYMENT INFO ERROR", error);
            });
    };

    const handleCreatePayment = () => {
        console.log("CREATE PAYMENT!", cart.id, cart.version);
        fetch(
            `https://api.us-central1.gcp.commercetools.com/${
                import.meta.env.VITE_PROJECT_KEY
            }/payments/`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Origin: "",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    customer: {
                        typeId: "customer",
                        id: USER_INFO.id,
                    },
                    amountPlanned: {
                        currencyCode: "USD",
                        centAmount: order.totalPrice.centAmount,
                    },
                    paymentMethodInfo: {
                        paymentInterface: "STRIPE",
                        method: "CREDIT_CARD",
                        name: {
                            en: "Credit Card",
                        },
                    },
                    transactions: [
                        {
                            timestamp: "2015-10-20T08:54:24.000Z",
                            type: "Charge",
                            amount: {
                                currencyCode: "USD",
                                centAmount: order.totalPrice.centAmount,
                            },
                            state: "Pending",
                        },
                    ],
                }),
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setPayment(res);
                console.log("CREATE PAYMENT DONE", res);
            })
            .catch((error) => {
                console.log("CREATE PAYMENT ERROR", error);
            });
    };

    const handlePay = () => {
        fetch("http://localhost:4242/checkout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // setPayment(res);
                console.log("PAY SUCCESS", res);
            })
            .catch((error) => {
                console.log("PAY ERROR", res);
            });
    };

    return (
        <div className="App">
            <h1>React + Commercetools!</h1>
            <div className="cartContainer">
                <img onClick={handleCartClick} src={cartIcon} />
                {cart?.totalLineItemQuantity > 0 ? (
                    <div className="quantity">
                        {cart?.totalLineItemQuantity}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div>
                <Cart
                    cart={cart}
                    order={order}
                    showCart={showCart}
                    handleCreateOrder={handleCreateOrder}
                    handleSetShippingAddress={handleSetShippingAddress}
                    handleCreatePayment={handleCreatePayment}
                    handleAddPaymentInfo={handleAddPaymentInfo}
                    handlePay={handlePay}
                />
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

export default Home;
