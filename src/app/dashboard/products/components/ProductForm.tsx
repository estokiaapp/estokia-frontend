import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { Product, Category } from '@/dto/response';

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

interface ProductFormProps {
  open: boolean;
  selectedProduct: Product | null;
  formData: ProductFormData;
  categories: Category[];
  onClose: () => void;
  onSubmit: () => void;
  onFormDataChange: (formData: ProductFormData) => void;
}

export function ProductForm({
  open,
  selectedProduct,
  formData,
  categories,
  onClose,
  onSubmit,
  onFormDataChange,
}: ProductFormProps) {
  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
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
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='SKU *'
              fullWidth
              value={formData.sku}
              onChange={(e) => handleInputChange('sku', e.target.value)}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Preço de Custo'
              type='number'
              fullWidth
              value={formData.costPrice}
              onChange={(e) => handleInputChange('costPrice', e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Preço de Venda'
              type='number'
              fullWidth
              value={formData.sellingPrice}
              onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Estoque Atual'
              type='number'
              fullWidth
              value={formData.currentStock}
              onChange={(e) => handleInputChange('currentStock', e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Estoque Mínimo'
              type='number'
              fullWidth
              value={formData.minimumStock}
              onChange={(e) => handleInputChange('minimumStock', e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Estoque Máximo'
              type='number'
              fullWidth
              value={formData.maximumStock}
              onChange={(e) => handleInputChange('maximumStock', e.target.value)}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Unidade de Medida'
              fullWidth
              value={formData.unitOfMeasure}
              onChange={(e) => handleInputChange('unitOfMeasure', e.target.value)}
              placeholder='ex: UN, KG, L, M'
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={formData.categoryId}
                label='Categoria'
                onChange={(e) => handleInputChange('categoryId', e.target.value)}
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
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          disabled={!formData.name || !formData.sku}
        >
          {selectedProduct ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export type { ProductFormData };