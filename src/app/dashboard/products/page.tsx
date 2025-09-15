'use client';

import { Product, Category } from '@/dto/response';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from '@/services/api';
import { CreateProductData, UpdateProductData } from '@/dto/request';
import {
  Box,
  Button,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  ProductForm,
  ProductsTable,
  DeleteProductDialog,
  ProductFormData,
} from './components';
import { ActionMenu } from '@/components/shared';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    categoryId: '',
    supplierId: '',
    costPrice: '',
    sellingPrice: '',
    currentStock: '',
    minimumStock: '',
    maximumStock: '',
    unitOfMeasure: '',
    description: '',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuProductId, setMenuProductId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      setAlert({
        open: true,
        message: 'Erro ao carregar produtos',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const resetFormData = (): ProductFormData => ({
    name: '',
    sku: '',
    categoryId: '',
    supplierId: '',
    costPrice: '',
    sellingPrice: '',
    currentStock: '',
    minimumStock: '',
    maximumStock: '',
    unitOfMeasure: '',
    description: '',
  });

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        sku: product.sku,
        categoryId: product.categoryId || '',
        supplierId: product.supplierId || '',
        costPrice: product.costPrice?.toString() || '',
        sellingPrice: product.sellingPrice?.toString() || '',
        currentStock: product.currentStock?.toString() || '',
        minimumStock: product.minimumStock?.toString() || '',
        maximumStock: product.maximumStock?.toString() || '',
        unitOfMeasure: product.unitOfMeasure || '',
        description: product.description || '',
      });
    } else {
      setSelectedProduct(null);
      setFormData(resetFormData());
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedProduct(null);
    setFormData(resetFormData());
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setAlert({
        open: true,
        message: 'Nome é obrigatório',
        severity: 'error',
      });
      return false;
    }
    if (!formData.sku.trim()) {
      setAlert({ open: true, message: 'SKU é obrigatório', severity: 'error' });
      return false;
    }
    return true;
  };

  const prepareProductData = (): CreateProductData | UpdateProductData => {
    const data: any = {
      name: formData.name,
      sku: formData.sku,
    };

    if (formData.categoryId) data.categoryId = formData.categoryId;
    if (formData.supplierId) data.supplierId = formData.supplierId;
    if (formData.costPrice) data.costPrice = parseFloat(formData.costPrice);
    if (formData.sellingPrice)
      data.sellingPrice = parseFloat(formData.sellingPrice);
    if (formData.currentStock)
      data.currentStock = parseInt(formData.currentStock);
    if (formData.minimumStock)
      data.minimumStock = parseInt(formData.minimumStock);
    if (formData.maximumStock)
      data.maximumStock = parseInt(formData.maximumStock);
    if (formData.unitOfMeasure) data.unitOfMeasure = formData.unitOfMeasure;
    if (formData.description) data.description = formData.description;

    return data;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;

    try {
      const productData = prepareProductData();

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        setAlert({
          open: true,
          message: 'Produto atualizado com sucesso',
          severity: 'success',
        });
      } else {
        await createProduct(productData as CreateProductData);
        setAlert({
          open: true,
          message: 'Produto criado com sucesso',
          severity: 'success',
        });
      }
      handleCloseForm();
      fetchProducts();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Erro ao salvar produto',
        severity: 'error',
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);
      setAlert({
        open: true,
        message: 'Produto excluído com sucesso',
        severity: 'success',
      });
      setOpenDeleteDialog(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Erro ao excluir produto',
        severity: 'error',
      });
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    productId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuProductId(productId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuProductId(null);
  };

  const handleEditClick = () => {
    const product = products.find((p) => p.id === menuProductId);
    if (product) {
      handleOpenForm(product);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    const product = products.find((p) => p.id === menuProductId);
    if (product) {
      setSelectedProduct(product);
      setOpenDeleteDialog(true);
    }
    handleMenuClose();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Gestão de Produtos
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Novo Produto
        </Button>
      </Box>

      <ProductsTable
        products={products}
        categories={categories}
        loading={loading}
        onMenuClick={handleMenuClick}
      />

      <ActionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <ProductForm
        open={openForm}
        selectedProduct={selectedProduct}
        formData={formData}
        categories={categories}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        onFormDataChange={setFormData}
      />

      <DeleteProductDialog
        open={openDeleteDialog}
        selectedProduct={selectedProduct}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
      />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert
          severity={alert.severity}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}