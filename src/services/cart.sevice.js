import fs from "node:fs";
import { v4 as uuid } from 'uuid';

class CartService {
    path
    carts

    constructor({ path }) {
        this.path = path;
        if (fs.existsSync(path)) {
            try {
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }

    async getAll() {
        return this.carts;
    }

    async getById({ id }) {
        const cart = this.carts.find((cart) => cart.id === id);
        return cart;
    }

    async create({ items = [] }) {
        const id = uuid();

        const cart = {
            id,
            items,
        };

        this.carts.push(cart);

        try {
            await this.saveOnFile();
            return cart;
        } catch (error) {
            console.error("Error al guardar el archivo");
        }
    }

    async update({ id, items }) {
        const cart = this.carts.find((cart) => cart.id === id);

        if (!cart) {
            return null;
        }

        cart.items = items ?? cart.items;

        const index = this.carts.findIndex((c) => c.id === id);
        this.carts[index] = cart;

        try {
            await this.saveOnFile();
            return cart;
        } catch (error) {
            console.error("Error al actualizar el archivo");
        }
    }

    async delete({ id }) {
        const cart = this.carts.find((cart) => cart.id === id);

        if (!cart) {
            return null;
        }

        const index = this.carts.findIndex((c) => c.id === id);
        this.carts.splice(index, 1);

        try {
            await this.saveOnFile();
            return cart;
        } catch (error) {
            console.error("Error al eliminar el archivo");
        }
    }

    async saveOnFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
        } catch (error) {
            console.error("Error al guardar el archivo");
        }
    }
}

export const cartService = new CartService({
    path: "./db/cart.json",
});
