'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';

interface Sale {
  id: number;
  product: string;
  amount: number;
  date: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('/api/sales');
        const data = await response.json();
        setSales(data);
      } catch (error) {
        setSales([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vendas
      </Typography>
      {sales.length === 0 ? (
        <Typography variant="body1">Nenhuma venda encontrada.</Typography>
      ) : (
        <Grid container spacing={2}>
          {sales.map((sale) => (
            <Grid item xs={12} md={6} lg={4} key={sale.id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{sale.product}</Typography>
                <Typography variant="body1">Quantidade: {sale.amount}</Typography>
                <Typography variant="body2">Data: {sale.date}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}