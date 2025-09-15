import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { Category } from '@/dto/response';

interface DeleteCategoryDialogProps {
  open: boolean;
  selectedCategory: Category | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteCategoryDialog({
  open,
  selectedCategory,
  onClose,
  onConfirm,
}: DeleteCategoryDialogProps) {
  const hasProducts = selectedCategory?._count?.products && selectedCategory._count.products > 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir a categoria{' '}
          <strong>{selectedCategory?.name}</strong>?
        </Typography>
        {hasProducts && (
          <Typography color='warning.main' sx={{ mt: 2 }}>
            ⚠️ Atenção: Esta categoria possui{' '}
            <strong>{selectedCategory?._count?.products} produto(s)</strong> associado(s).
            A exclusão pode afetar esses produtos.
          </Typography>
        )}
        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
          Esta ação não pode ser desfeita.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color='error' variant='contained'>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}