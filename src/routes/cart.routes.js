import { Router } from "express";
import { cartService } from "../services/cart.service.js";

export const cartRoutes = Router();

cartRoutes.get("/", async (req, res) => {
    const carts = await cartService.getAll();
    res.status(200).json(carts);
});

cartRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    const cart = await cartService.getById({ id });

    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
});

cartRoutes.post("/", async (req, res) => {
    const { items } = req.body;

    try {
        const cart = await cartService.create({ items });
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

cartRoutes.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { items } = req.body;

    try {
        const cart = await cartService.update({ id, items });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

cartRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await cartService.delete({ id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
