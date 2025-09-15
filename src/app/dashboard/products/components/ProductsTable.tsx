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
import { Inventory as InventoryIcon } from '@mui/icons-material';
import { Product, Category } from '@/dto/response';
import { ProductRow } from './ProductRow';

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, productId: string) => void;
}

export function ProductsTable({
  products,
  categories,
  loading,
  onMenuClick,
}: ProductsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='products table'>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Preço de Venda</TableCell>
            <TableCell>Estoque Atual</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell align='center'>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align='center'>
                Carregando...
              </TableCell>
            </TableRow>
          ) : products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align='center'>
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <InventoryIcon
                    sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }}
                  />
                  <Typography variant='h6' color='text.secondary'>
                    Nenhum produto encontrado
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Clique em "Novo Produto" para adicionar seu primeiro produto
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                categories={categories}
                onMenuClick={onMenuClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}