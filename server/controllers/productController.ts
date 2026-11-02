import { Request, Response } from 'express';
import { store } from '../data/store.js';
import { SeedProduct } from '../data/seedData.js';
import { isMongoDBActive } from '../config/db.js';
import Product from '../models/Product.js';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy = 'rating',
      availability,
      page = '1',
      limit = '12',
    } = req.query;

    let items = [...store.products];

    // Filter by category
    if (category && category !== 'All') {
      items = items.filter(
        (p) => p.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    // Filter by search
    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Filter by price range
    if (minPrice) {
      const min = parseFloat(minPrice as string);
      if (!isNaN(min)) items = items.filter((p) => p.pricePerMonth >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice as string);
      if (!isNaN(max)) items = items.filter((p) => p.pricePerMonth <= max);
    }

    // Filter by availability
    if (availability === 'true') {
      items = items.filter((p) => p.availability && p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
        break;
      case 'price-desc':
        items.sort((a, b) => b.pricePerMonth - a.pricePerMonth);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
      default:
        // By default, preserve balanced curated order or reverse ID
        break;
    }

    const total = items.length;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit as string, 10) || 12);
    const totalPages = Math.ceil(total / limitNum) || 1;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedItems = items.slice(startIndex, startIndex + limitNum);

    return res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages,
      limit: limitNum,
      products: paginatedItems,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = store.products.find((p) => p._id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      description,
      pricePerMonth,
      securityDeposit,
      images,
      availability = true,
      stock = 5,
      rating = 5.0,
      features = [],
      specs = {},
      brand = 'RentEase Premium',
    } = req.body;

    if (!name || !category || !description || pricePerMonth === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all mandatory fields (Name, Category, Description, Price per Month).',
      });
    }

    const imageList = Array.isArray(images) && images.length > 0 
      ? images 
      : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'];

    const newProduct: SeedProduct = {
      _id: 'prod-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      category,
      description: description.trim(),
      pricePerMonth: Number(pricePerMonth),
      securityDeposit: securityDeposit !== undefined ? Number(securityDeposit) : Number(pricePerMonth) * 2,
      images: imageList,
      availability: Boolean(availability),
      stock: Number(stock) || 1,
      rating: Number(rating) || 4.8,
      reviewsCount: 1,
      features: Array.isArray(features) ? features : [],
      specs: typeof specs === 'object' && specs !== null ? specs : {},
      brand: brand.trim(),
      createdAt: new Date().toISOString(),
    };

    store.products.unshift(newProduct);
    store.save();

    if (isMongoDBActive()) {
      try {
        const mongoProd = new Product(newProduct);
        await mongoProd.save();
      } catch (err) {
        console.warn('MongoDB sync note on create product:', err);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = store.products.findIndex((p) => p._id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    const current = store.products[index];
    const updated: SeedProduct = {
      ...current,
      ...req.body,
      _id: current._id, // Preserve ID
    };

    if (req.body.pricePerMonth !== undefined) updated.pricePerMonth = Number(req.body.pricePerMonth);
    if (req.body.securityDeposit !== undefined) updated.securityDeposit = Number(req.body.securityDeposit);
    if (req.body.stock !== undefined) {
      updated.stock = Number(req.body.stock);
      updated.availability = updated.stock > 0;
    }

    store.products[index] = updated;
    store.save();

    if (isMongoDBActive()) {
      try {
        await Product.findByIdAndUpdate(id, updated);
      } catch (err) {
        console.warn('MongoDB sync note on update product:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      product: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = store.products.findIndex((p) => p._id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    const deleted = store.products.splice(index, 1)[0];
    store.save();

    if (isMongoDBActive()) {
      try {
        await Product.findByIdAndDelete(id);
      } catch (err) {
        console.warn('MongoDB sync note on delete product:', err);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
      productId: deleted._id,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
