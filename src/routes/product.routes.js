import {Router} from "express";
import {productService} from "../services/product.service.js";


export const productRoutes = Router();

productRoutes.get("/",async(req,res)=>{
    const products = await productService.getAll();

    res.status(200).json(products); 

});

productRoutes.get("/:id",async (req,res)=>{
    const {id} = req.params;

    const product = await productService.getById({id})

    if(!product) {
        return res.status(404).json({message:"product not found"});
    }

    res.status(200).json(product);
});

productRoutes.post("/", async (req, res)=>{
    const {title, content, description} = req.body;

    try{
    const product = await productService.create({title, content, description});

    res.status(201).json(product);
    } catch (error){
        res.status(500).json({message:"Internal server error"});
    }
});

productRoutes.put("/:id",async (req,res)=>{
    const {id} = req.params;

    const { title,content,description} = req.body;

    try{
    const product = await productService.update({id, title, content, description});

    if (!product) {
        return res.status(404).json({message:"Product not found"});
    }

    res.status(200).json(product);
} catch (error) {
    res.satatus(500).json({message:"internal server error"})
}
});

productRoutes.delete ("/:id", async (req,res)=>{
    const {id} = req.params;

    try{
        const product = await productService.delete ({id});
        
        if (!product) {
            return res.status(404).json({message:"product not found"});
        }
            
            res.status(204).end();
        } catch (error) {
            res.status(500).json({message:"internal server error"});  
        }
    });

