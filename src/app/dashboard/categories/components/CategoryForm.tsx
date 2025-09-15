import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { Category } from '@/dto/response';

interface CategoryFormData {
  name: string;
  description: string;
}

interface CategoryFormProps {
  open: boolean;
  selectedCategory: Category | null;
  formData: CategoryFormData;
  onClose: () => void;
  onSubmit: () => void;
  onFormDataChange: (formData: CategoryFormData) => void;
}

export function CategoryForm({
  open,
  selectedCategory,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}: CategoryFormProps) {
  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        {selectedCategory ? 'Editar Categoria' : 'Nova Categoria'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label='Nome *'
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <TextField
            label='Descrição'
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          disabled={!formData.name.trim()}
        >
          {selectedCategory ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export type { CategoryFormData };