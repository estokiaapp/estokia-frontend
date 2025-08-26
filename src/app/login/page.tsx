'use client';

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  TextField, 
  Typography, 
  Link as MuiLink, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Entrar
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Entre com sua conta EstokIA
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="senha"
                id="senha"
                autoComplete="current-password"
                value={formData.senha}
                onChange={handleChange}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <MuiLink href="#" variant="body2" sx={{ cursor: 'pointer' }}>
                  Esqueceu sua senha?
                </MuiLink>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Não possui uma conta?{' '}
                <Link href="/signup" passHref>
                  <MuiLink component="span" sx={{ cursor: 'pointer' }}>
                    Cadastre-se
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            EstokIa
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Estoque:</strong> Total de itens em estoque, itens críticos, itens fora de estoque.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Previsões:</strong> Gráficos de previsão de demanda em 7 dias.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Transportadoras:</strong> Entregas pendentes, entregas atrasadas, entregas concluídas.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Relatórios:</strong> Relatórios de vendas, relatórios de inventário.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}