import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from '@mui/material';
import { User } from '@/dto/response';

interface DeleteUserDialogProps {
  open: boolean;
  selectedUser: User | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteUserDialog({
  open,
  selectedUser,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza que deseja excluir o colaborador{' '}
          <strong>{selectedUser?.name}</strong>? Esta ação não pode ser
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