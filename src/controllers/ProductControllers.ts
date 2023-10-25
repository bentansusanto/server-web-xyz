import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";

export const createProduct =async (req:Request, res: Response) => {
    try {
        const newProduct = await ProductServices.createProduct(req.body)
        res.json({message:"Product Success Created" ,data: newProduct})
    } catch (error) {
        res.status(500).json({ data: null, message: "Network error" });
    }
}

export const getAllProduct =async (req:Request, res: Response) => {
    try {
        const products = await ProductServices.getAllProducts();
        res.json({message: "Success get products", data: products}) 
    } catch (error) {
        res.status(500).json({ data: null, message: "Network error" });
    }
}

export const getProductById = async (req:Request, res: Response) => {
    try {
        const product = await ProductServices.getProductById(req.params.id);

        if(!product){
            res.status(404).json({message: "Product not found"})
        }

        res.json({message: "Success get product", data: product})

    } catch (error) {
        res.status(500).json({ data: null, message: "Network error" });
    }
}

export const updateProductId = async (req:Request, res: Response) => {
    try {
        const updatedProduct = await ProductServices.updateProduct(req.params.id, req.body)

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
          }

        res.json({message: "Success update product", data: updatedProduct})

    } catch (error) {
        res.status(500).json({ data: null, message: "Network error" });
    }
}
export const deleteProductId = async (req:Request, res: Response) => {
    try {
        const deletedProduct = await ProductServices.deleteProduct(req.params.id)

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
          }

        res.json({message: "Success delete product"})

    } catch (error) {
        res.status(500).json({ data: null, message: "Network error" });
    }
}