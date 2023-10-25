import { Request, Response } from "express";
import CartServices from "../services/CartServices";

export const getCartByUser =async (req:Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cart = await CartServices.getCartByUserId(userId);
    
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found', data: cart });
        }
    
        res.status(200).json({message: "Success get cart", data: cart});
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart' });
      }
}

export const addToCart = async (req:Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const { productId, quantity } = req.body;
    
        // Memeriksa apakah productId valid
        if (!productId || typeof productId !== 'string') {
          return res.status(400).json({ message: 'Invalid productId' });
        }
    
        // Memeriksa apakah quantity valid
        if (quantity <= 0) {
          return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }
    
        const updatedCart = await CartServices.addToCart(userId, productId, quantity);
    
        if (!updatedCart) {
          return res.status(404).json({ message: 'Failed to add product to cart' });
        }
    
        res.json(updatedCart);
      } catch (error) {
        console.error(error); // Tampilkan error di konsol
        res.status(500).json({ message: 'Failed to add product to cart' });
      }
}