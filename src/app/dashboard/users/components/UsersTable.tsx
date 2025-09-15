import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { User } from '@/dto/response';
import { UserRow } from './UserRow';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, userId: number) => void;
}

export function UsersTable({ users, loading, onMenuClick }: UsersTableProps) {
  return (
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
                <Typography variant='body1' color='text.secondary' sx={{ py: 4 }}>
                  Nenhum colaborador encontrado
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onMenuClick={onMenuClick}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}