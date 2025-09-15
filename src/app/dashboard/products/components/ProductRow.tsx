import {
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Product, Category } from '@/dto/response';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductRowProps {
  product: Product;
  categories: Category[];
  onMenuClick: (event: React.MouseEvent<HTMLElement>, productId: string) => void;
}

export function ProductRow({ product, categories, onMenuClick }: ProductRowProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return '-';
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getStockStatus = (product: Product) => {
    if (product.currentStock === 0) {
      return <Chip label='Sem Estoque' color='error' size='small' />;
    }

    if (product.currentStock !== undefined && product.currentStock < 0) {
      return <Chip label='Estoque Negativo' color='error' size='small' />;
    }

    if (
      product.currentStock &&
      product.minimumStock &&
      product.currentStock <= product.minimumStock
    ) {
      return <Chip label='Estoque Baixo' color='warning' size='small' />;
    }

    if (product.currentStock && product.currentStock > 0) {
      return <Chip label='Em Estoque' color='success' size='small' />;
    }

    return null;
  };

  return (
    <TableRow
      key={product.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Typography variant='body2' fontWeight='medium'>
          {product.sku}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2'>{product.name}</Typography>
        {product.description && (
          <Typography
            variant='caption'
            color='text.secondary'
            display='block'
          >
            {product.description}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography variant='body2'>
          {getCategoryName(product.categoryId)}
        </Typography>
      </TableCell>
      <TableCell>{formatCurrency(product.sellingPrice)}</TableCell>
      <TableCell>
        {product.currentStock ?? '-'}
        {product.unitOfMeasure && ` ${product.unitOfMeasure}`}
      </TableCell>
      <TableCell>{getStockStatus(product)}</TableCell>
      <TableCell>{formatDate(product.createdAt)}</TableCell>
      <TableCell align='center'>
        <IconButton
          onClick={(e) => onMenuClick(e, product.id)}
          size='small'
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}