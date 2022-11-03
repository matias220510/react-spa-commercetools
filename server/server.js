// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
    "sk_test_51HCjKYFYszobYHGdFlLUn9WHBZkBaqkhc62mLfCSm3JpnaN34WocNWa9mVr5FCJ7wC0qtIlQTqtyfyLntwuogLCu003aTuSdQZ"
);
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/checkout", async (req, res) => {
    const token = await stripe.tokens.create({
        card: {
            number: "4242424242424242",
            exp_month: 11,
            exp_year: 2023,
            cvc: "314",
        },
    });

    console.log("TOKEN", token);

    // return;

    try {
        const charge = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            source: token.id,
            description:
                "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
        });

        res.status(200).send(charge);

        console.log("CHARGE", charge);
    } catch (e) {
        res.status(402).json({ type: e.type, message: e.messasge });
        console.log("ERROR", e);
    }
});

app.listen(4242, () => console.log("Running on port 4242"));
