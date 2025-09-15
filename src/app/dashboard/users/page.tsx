'use client';

import { User } from '@/dto/response';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/api';
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
  UserForm,
  UsersTable,
  DeleteUserDialog,
  UserFormData,
} from './components';
import { ActionMenu } from '@/components/shared';

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

      <UsersTable
        users={users}
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

      <UserForm
        open={openForm}
        selectedUser={selectedUser}
        formData={formData}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        onFormDataChange={setFormData}
      />

      <DeleteUserDialog
        open={openDeleteDialog}
        selectedUser={selectedUser}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteUser}
      />

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