import { Router } from "express";

export const bateriasRoutes = Router ();

export const baterias = [
    {name: "loudwig", type:"maple"},
    {name: "pearl" , type: "birtch"},
    {name: "tama" , type: "acrilico"},
    {name: "gretsch" , type: "electrica"},
];

bateriasRoutes.get("/", (req, res) => {
res.json(baterias);
});

bateriasRoutes.post("/", (req,res) => {
    const { name,type } = req.body;
    baterias.push({ name,type });
    res.json({ name,type });
})