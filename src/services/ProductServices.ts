import { IProduct } from '../utils/typesSchema';
import Product from "../schema/Product";
import {v4 as uuidv4} from 'uuid'

class ProductService{
    async createProduct (data:IProduct): Promise<IProduct>{
        const {name_product, slug, category, price, size, desc, image} = data; 
        
        const productId = uuidv4()

        const product = new Product({ productId, name_product, slug, category, price, size, desc, image})
        return await product.save()
    }

    async getAllProducts(): Promise<IProduct[]>{
        return await Product.find();
    }

    async getProductById (productId:string): Promise<IProduct | null>{
        
        return await Product.findById(productId)
    }

    async updateProduct(productId: string, data: IProduct): Promise<IProduct | null>{
        const {name_product, slug, category, price, size, desc, image} = data;
        
        return await Product.findByIdAndUpdate(productId,{name_product, slug, category, price, size, desc, image}, {new: true})
    }

    async deleteProduct(productId: string): Promise<IProduct | null>{
        
        return await Product.findByIdAndRemove(productId);
    }
}

export default new ProductService();


