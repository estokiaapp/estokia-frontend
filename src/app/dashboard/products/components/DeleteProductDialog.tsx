import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { Product } from '@/dto/response';

interface DeleteProductDialogProps {
  open: boolean;
  selectedProduct: Product | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProductDialog({
  open,
  selectedProduct,
  onClose,
  onConfirm,
}: DeleteProductDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir o produto{' '}
          <strong>{selectedProduct?.name}</strong>? Esta ação não pode ser
          desfeita.
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