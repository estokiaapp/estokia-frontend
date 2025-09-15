'use client';

import { User } from '@/dto/response';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/api';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAlert } from '@/app/context/AlertContext';
import { parseApiError } from '@/utils/errorHandler';
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
  const { showAlert } = useAlert();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (error) {
      showAlert('Erro ao carregar usuários', 'error');
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
        showAlert('Usuário atualizado com sucesso', 'success');
      } else {
        if (!formData.password) {
          showAlert('Senha é obrigatória para criar usuário', 'error');
          return;
        }
        await createUser({ name: formData.name, email: formData.email, password: formData.password });
        showAlert('Usuário criado com sucesso', 'success');
      }
      handleCloseForm();
      fetchUsers();
    } catch (error: any) {
      const errorMessage = parseApiError(error, 'Erro ao salvar usuário');
      showAlert(errorMessage, 'error');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      showAlert('Usuário excluído com sucesso', 'success');
      setOpenDeleteDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      const errorMessage = parseApiError(error, 'Erro ao excluir usuário');
      showAlert(errorMessage, 'error');
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

    </Box>
  );
}