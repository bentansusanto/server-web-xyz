import Cart from '../schema/Cart';
import { ICart} from '../utils/typesSchema';
import Product from '../schema/Product';
import { Types } from 'mongoose';

export const ObjectId = Types.ObjectId

class CartService{
    async getCartByUserId (userId:string): Promise<ICart | null> {
        return await Cart.findOne({ user: userId }).populate('items.product');
    }

    async addToCart(userId: string, productId: string, quantity: number): Promise<ICart | null> {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
          return null; // Keranjang tidak ditemukan
        }
    
        const product = await Product.findById(productId);
        if (!product) {
          return null; // Produk tidak ditemukan
        }
    
        const existingItem = cart.items.find((item) => item.product.toString() === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ product: new ObjectId(productId), quantity });
        }
    
        return await cart.save();
      }
    
      async removeFromCart(userId: string, productId: string): Promise<ICart | null> {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
          return null;
        }
    
        const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
        if (existingItemIndex === -1) {
          return null;
        }
    
        cart.items.splice(existingItemIndex, 1);
    
        return await cart.save();
      }
}

export default new CartService();