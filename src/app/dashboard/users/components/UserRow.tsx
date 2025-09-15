import {
  TableCell,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { User } from '@/dto/response';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserRowProps {
  user: User;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, userId: number) => void;
}

export function UserRow({ user, onMenuClick }: UserRowProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
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
          onClick={(e) => onMenuClick(e, user.id)}
          size='small'
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}