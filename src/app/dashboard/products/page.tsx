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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  Alert,
  Snackbar,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { format, formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductFormData {
  name: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  costPrice: string;
  sellingPrice: string;
  currentStock: string;
  minimumStock: string;
  maximumStock: string;
  unitOfMeasure: string;
  description: string;
}

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

  const resetFormData = () => ({
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

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return '-';
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getStockStatus = (product: Product) => {
    if (product.currentStock === 0) {
      return <Chip label='Sem Estoque' color='error' size='small' />;
    }

    if (product.currentStock !== undefined && product.currentStock < 0) {
      return <Chip label='Estoque Negativo' color='error' size='small' />;
    }

    if (
      product.currentStock &&
      product.minimumStock &&
      product.currentStock <= product.minimumStock
    ) {
      return <Chip label='Estoque Baixo' color='warning' size='small' />;
    }

    if (product.currentStock && product.currentStock > 0) {
      return <Chip label='Em Estoque' color='success' size='small' />;
    }

    return null;
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='products table'>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Preço de Venda</TableCell>
              <TableCell>Estoque Atual</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell align='center'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  Carregando...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align='center'>
                  <Box sx={{ py: 4, textAlign: 'center' }}>
                    <InventoryIcon
                      sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
                    />
                    <Typography variant='h6' color='text.secondary'>
                      Nenhum produto encontrado
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Clique em "Novo Produto" para adicionar seu primeiro
                      produto
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant='body2' fontWeight='medium'>
                      {product.sku}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{product.name}</Typography>
                    {product.description && (
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                      >
                        {product.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {getCategoryName(product.categoryId)}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatCurrency(product.sellingPrice)}</TableCell>
                  <TableCell>
                    {product.currentStock ?? '-'}
                    {product.unitOfMeasure && ` ${product.unitOfMeasure}`}
                  </TableCell>
                  <TableCell>{getStockStatus(product)}</TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, product.id)}
                      size='small'
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>
          <EditIcon sx={{ mr: 1 }} fontSize='small' />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} fontSize='small' />
          Excluir
        </MenuItem>
      </Menu>

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth='md' fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Nome *'
                fullWidth
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='SKU *'
                fullWidth
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Preço de Custo'
                type='number'
                fullWidth
                value={formData.costPrice}
                onChange={(e) =>
                  setFormData({ ...formData, costPrice: e.target.value })
                }
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Preço de Venda'
                type='number'
                fullWidth
                value={formData.sellingPrice}
                onChange={(e) =>
                  setFormData({ ...formData, sellingPrice: e.target.value })
                }
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Estoque Atual'
                type='number'
                fullWidth
                value={formData.currentStock}
                onChange={(e) =>
                  setFormData({ ...formData, currentStock: e.target.value })
                }
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Estoque Mínimo'
                type='number'
                fullWidth
                value={formData.minimumStock}
                onChange={(e) =>
                  setFormData({ ...formData, minimumStock: e.target.value })
                }
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Estoque Máximo'
                type='number'
                fullWidth
                value={formData.maximumStock}
                onChange={(e) =>
                  setFormData({ ...formData, maximumStock: e.target.value })
                }
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label='Unidade de Medida'
                fullWidth
                value={formData.unitOfMeasure}
                onChange={(e) =>
                  setFormData({ ...formData, unitOfMeasure: e.target.value })
                }
                placeholder='ex: UN, KG, L, M'
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={formData.categoryId}
                  label='Categoria'
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                >
                  <MenuItem value=''>
                    <em>Selecione uma categoria</em>
                  </MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                      {category.description && (
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          sx={{ ml: 1 }}
                        >
                          - {category.description}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                label='Descrição'
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button
            onClick={handleSubmitForm}
            variant='contained'
            disabled={!formData.name || !formData.sku}
          >
            {selectedProduct ? 'Atualizar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o produto{' '}
            <strong>{selectedProduct?.name}</strong>? Esta ação não pode ser
            desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleDeleteProduct}
            color='error'
            variant='contained'
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

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
