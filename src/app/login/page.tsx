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
} from '@mui/material';
import Link from 'next/link';
import { loginUser } from '@/services/api';
import { LoginData } from '@/dto/request';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      console.log('Login data:', data);
      const responseData = await loginUser(data);
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <Container component='main' maxWidth='lg'>
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
          <Paper
            elevation={3}
            sx={{ padding: 4, width: '100%', maxWidth: 400 }}
          >
            <Typography component='h1' variant='h4' align='center' gutterBottom>
              Login
            </Typography>
            <Typography
              variant='body2'
              align='center'
              color='text.secondary'
              sx={{ mb: 3 }}
            >
              Entre na sua conta EstokIA
            </Typography>

            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                margin='normal'
                fullWidth
                id='email'
                label='Email'
                autoComplete='email'
                autoFocus
                type='email'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres',
                  },
                })}
                margin='normal'
                fullWidth
                name='password'
                label='Senha'
                type='password'
                id='password'
                autoComplete='current-password'
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <MuiLink href='#' variant='body2' sx={{ cursor: 'pointer' }}>
                  Esqueceu sua senha?
                </MuiLink>
              </Box>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='body2'>
                  Não tem uma conta?{' '}
                  <Link href='/signup' passHref>
                    <MuiLink component='span' sx={{ cursor: 'pointer' }}>
                      Cadastre-se
                    </MuiLink>
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: 4,
          }}
        >
          <Typography variant='h4' gutterBottom>
            EstokIa
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Estoque:</strong> Total de itens em estoque, itens críticos,
            itens fora de estoque.
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Previsões:</strong> Gráficos de previsão de demanda em 7
            dias.
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Transportadoras:</strong> Entregas pendentes, entregas
            atrasadas, entregas concluídas.
          </Typography>
          <Typography variant='body1' gutterBottom>
            <strong>Relatórios:</strong> Relatórios de vendas, relatórios de
            inventário.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
