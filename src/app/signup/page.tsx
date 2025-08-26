'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link as MuiLink
} from '@mui/material';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Signup data:', formData);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row-reverse',
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
              Cadastro
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Crie sua conta EstokIA
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="nome"
                label="Nome"
                name="nome"
                autoComplete="name"
                autoFocus
                value={formData.nome}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="telefone"
                label="Telefone"
                name="telefone"
                autoComplete="tel"
                value={formData.telefone}
                onChange={handleChange}
                type="tel"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="new-password"
                value={formData.senha}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
              <Typography variant="body2" align='center' sx={{ mt: 2 }}>
                Já tem uma conta?{' '}
                <Link href="/login" passHref>
                  <MuiLink component="span" sx={{ cursor: 'pointer' }}>
                    Faça login
                  </MuiLink>
                </Link>
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
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}