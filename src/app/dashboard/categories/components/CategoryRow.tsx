import {
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Category } from '@/dto/response';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CategoryRowProps {
  category: Category;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, categoryId: string) => void;
}

export function CategoryRow({ category, onMenuClick }: CategoryRowProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <TableRow
      key={category.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Typography variant='body2' fontWeight='medium'>
          {category.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant='body2' color='text.secondary'>
          {category.description || '-'}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={`${category._count?.products || 0} produtos`}
          size='small'
          variant='outlined'
        />
      </TableCell>
      <TableCell>{formatDate(category.createdAt)}</TableCell>
      <TableCell>{formatDate(category.updatedAt)}</TableCell>
      <TableCell align='center'>
        <IconButton
          onClick={(e) => onMenuClick(e, category.id)}
          size='small'
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}