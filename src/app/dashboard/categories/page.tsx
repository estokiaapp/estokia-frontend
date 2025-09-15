'use client';

import { Category } from '@/dto/response';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/api';
import { CreateCategoryData, UpdateCategoryData } from '@/dto/request';
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
  CategoryForm,
  CategoriesTable,
  DeleteCategoryDialog,
  CategoryFormData,
} from './components';
import { ActionMenu } from '@/components/shared';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({ name: '', description: '' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuCategoryId, setMenuCategoryId] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      showAlert('Erro ao carregar categorias', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetFormData = (): CategoryFormData => ({
    name: '',
    description: '',
  });

  const handleOpenForm = (category?: Category) => {
    if (category) {
      setSelectedCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
      });
    } else {
      setSelectedCategory(null);
      setFormData(resetFormData());
    }
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedCategory(null);
    setFormData(resetFormData());
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showAlert('Nome é obrigatório', 'error');
      return false;
    }
    return true;
  };

  const prepareCategoryData = (): CreateCategoryData | UpdateCategoryData => {
    const data: any = {
      name: formData.name.trim(),
    };

    if (formData.description.trim()) {
      data.description = formData.description.trim();
    }

    return data;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;

    try {
      const categoryData = prepareCategoryData();

      if (selectedCategory) {
        await updateCategory(selectedCategory.id, categoryData);
        showAlert('Categoria atualizada com sucesso', 'success');
      } else {
        await createCategory(categoryData as CreateCategoryData);
        showAlert('Categoria criada com sucesso', 'success');
      }
      handleCloseForm();
      fetchCategories();
    } catch (error: any) {
      const errorMessage = parseApiError(error, 'Erro ao salvar categoria');
      showAlert(errorMessage, 'error');
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await deleteCategory(selectedCategory.id);
      showAlert('Categoria excluída com sucesso', 'success');
      setOpenDeleteDialog(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error: any) {
      const errorMessage = parseApiError(error, 'Erro ao excluir categoria');
      showAlert(errorMessage, 'error');
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    categoryId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuCategoryId(categoryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCategoryId(null);
  };

  const handleEditClick = () => {
    const category = categories.find((c) => c.id === menuCategoryId);
    if (category) {
      handleOpenForm(category);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    const category = categories.find((c) => c.id === menuCategoryId);
    if (category) {
      setSelectedCategory(category);
      setOpenDeleteDialog(true);
    }
    handleMenuClose();
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant='h4' component='h1'>
          Gestão de Categorias
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm()}
        >
          Nova Categoria
        </Button>
      </Box>

      <CategoriesTable
        categories={categories}
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

      <CategoryForm
        open={openForm}
        selectedCategory={selectedCategory}
        formData={formData}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        onFormDataChange={setFormData}
      />

      <DeleteCategoryDialog
        open={openDeleteDialog}
        selectedCategory={selectedCategory}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteCategory}
      />
    </Box>
  );
}