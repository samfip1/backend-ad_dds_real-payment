import e, { Router } from "express";

const subscriptionrouter = Router();

subscriptionrouter.get("/subscriptions", (req, res) => {
    res.send("GET all subscriptions");

    res.json({
        title: "Subscription"
    });
});


subscriptionrouter.get("/:id", (req, res) => {
    res.send("GET subscription by id");

    res.json({
        title: "Subscription"
    });
});

subscriptionrouter.post("/", (req, res) => {
    res.send("POST create subscription");

    res.json({
        title: "Subscription"
    });
});

subscriptionrouter.put("/:id", (req, res) => {
    res.send("PUT update subscription");

    res.json({
        title: "Subscription"
    });
});

subscriptionrouter.delete("/:id", (req, res) => {
    res.send("DELETE subscription");

    res.json({
        title: "Subscription"
    });
});


subscriptionrouter.get('/user/:id', (req, res) => {
    res.send("GET user's subscriptions");

    res.json({
        title: "Subscription"
    });
});

subscriptionrouter.put('/:id/cancel', (req, res) => {
    res.send("PUT cancel subscription");

    res.json({
        title: "Subscription"
    });
});


subscriptionrouter.get('/upcoming', (req, res) => {
    res.send("GET upcoming subscriptions");

    res.json({
        title: "Subscription"
    });
});




export default subscriptionrouter;