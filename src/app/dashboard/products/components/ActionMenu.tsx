import { Menu, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionMenu({
  anchorEl,
  open,
  onClose,
  onEdit,
  onDelete,
}: ActionMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem onClick={onEdit}>
        <EditIcon sx={{ mr: 1 }} fontSize='small' />
        Editar
      </MenuItem>
      <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
        <DeleteIcon sx={{ mr: 1 }} fontSize='small' />
        Excluir
      </MenuItem>
    </Menu>
  );
}