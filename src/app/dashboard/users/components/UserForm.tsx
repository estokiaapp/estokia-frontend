import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { User } from '@/dto/response';

interface UserFormData {
  name: string;
  email: string;
  password?: string;
}

interface UserFormProps {
  open: boolean;
  selectedUser: User | null;
  formData: UserFormData;
  onClose: () => void;
  onSubmit: () => void;
  onFormDataChange: (formData: UserFormData) => void;
}

export function UserForm({
  open,
  selectedUser,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}: UserFormProps) {
  const handleInputChange = (field: keyof UserFormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        {selectedUser ? 'Editar Colaborador' : 'Novo Colaborador'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label='Nome'
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
          <TextField
            label='Email'
            type='email'
            fullWidth
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          {!selectedUser && (
            <TextField
              label='Senha'
              type='password'
              fullWidth
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              helperText='A senha é obrigatória para criar um novo usuário'
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          disabled={
            !formData.name ||
            !formData.email ||
            (!selectedUser && !formData.password)
          }
        >
          {selectedUser ? 'Atualizar' : 'Criar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export type { UserFormData };