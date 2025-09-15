'use client';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function DashboardPage() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Total de Produtos
            </Typography>
            <Typography variant='h4'>1,234</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Pedidos Hoje
            </Typography>
            <Typography variant='h4'>87</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Vendas do Mês
            </Typography>
            <Typography variant='h4'>R$ 45.2K</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Clientes Ativos
            </Typography>
            <Typography variant='h4'>567</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant='h6' gutterBottom>
            Vendas por Período
          </Typography>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            Gráfico de vendas aqui
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, height: 300 }}>
          <Typography variant='h6' gutterBottom>
            Produtos em Baixa
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary='Produto A'
                secondary='Estoque: 5 unidades'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Produto B'
                secondary='Estoque: 2 unidades'
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary='Produto C'
                secondary='Estoque: 8 unidades'
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
