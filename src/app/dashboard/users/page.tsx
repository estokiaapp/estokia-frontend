'use client';

import { User } from '@/dto/response';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/api';
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
  Stack,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserFormData {
  name: string;
  email: string;
  password?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({ name: '', email: '', password: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuUserId, setMenuUserId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      setAlert({ open: true, message: 'Erro ao carregar usuários', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenForm = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({ name: user.name, email: user.email });
    } else {
      setSelectedUser(null);
      setFormData({ name: '', email: '', password: '' });
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmitForm = async () => {
    try {
      if (selectedUser) {
        const updateData = { name: formData.name, email: formData.email };
        await updateUser(selectedUser.id, updateData);
        setAlert({ open: true, message: 'Usuário atualizado com sucesso', severity: 'success' });
      } else {
        if (!formData.password) {
          setAlert({ open: true, message: 'Senha é obrigatória para criar usuário', severity: 'error' });
          return;
        }
        await createUser({ name: formData.name, email: formData.email, password: formData.password });
        setAlert({ open: true, message: 'Usuário criado com sucesso', severity: 'success' });
      }
      handleCloseForm();
      fetchUsers();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Erro ao salvar usuário',
        severity: 'error'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      setAlert({ open: true, message: 'Usuário excluído com sucesso', severity: 'success' });
      setOpenDeleteDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      setAlert({
        open: true,
        message: error.response?.data?.message || 'Erro ao excluir usuário',
        severity: 'error'
      });
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  const handleEditClick = () => {
    const user = users.find(u => u.id === menuUserId);
    if (user) {
      handleOpenForm(user);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    const user = users.find(u => u.id === menuUserId);
    if (user) {
      setSelectedUser(user);
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant='h4' component='h1'>
          Gestão de Colaboradores
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Novo Colaborador
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='users table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Data de Criação</TableCell>
              <TableCell>Data de Atualização</TableCell>
              <TableCell align='center'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  Carregando...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  Nenhum colaborador encontrado
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.id}</TableCell>
                  <TableCell component='th' scope='row'>
                    <Typography variant='body2' fontWeight='medium'>
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.updatedAt)}</TableCell>
                  <TableCell align='center'>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, user.id)}
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

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth='sm' fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Colaborador' : 'Novo Colaborador'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label='Nome'
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              label='Email'
              type='email'
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {!selectedUser && (
              <TextField
                label='Senha'
                type='password'
                fullWidth
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                helperText='A senha é obrigatória para criar um novo usuário'
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button
            onClick={handleSubmitForm}
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

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir o colaborador <strong>{selectedUser?.name}</strong>?
            Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteUser} color='error' variant='contained'>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
