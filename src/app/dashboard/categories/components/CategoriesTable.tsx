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
} from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';
import { Category } from '@/dto/response';
import { CategoryRow } from './CategoryRow';

interface CategoriesTableProps {
  categories: Category[];
  loading: boolean;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, categoryId: string) => void;
}

export function CategoriesTable({
  categories,
  loading,
  onMenuClick,
}: CategoriesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='categories table'>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Produtos</TableCell>
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
          ) : categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <CategoryIcon
                    sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
                  />
                  <Typography variant='h6' color='text.secondary'>
                    Nenhuma categoria encontrada
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Clique em "Nova Categoria" para adicionar sua primeira categoria
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                onMenuClick={onMenuClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}