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
import { useAlert } from '@/app/context/AlertContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { showAlert } = useAlert();
  const router = useRouter();
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

      showAlert('Login realizado com sucesso!', 'success');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('There was an error!', error);
      showAlert(
        'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
        'error'
      );
    }
  };

  return (
    <Container component='main' maxWidth='lg'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row-reverse' },
          minHeight: '100vh',
          alignItems: 'center',
          py: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '100%', md: 'auto' },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: { xs: 3, sm: 4 },
              width: '100%',
              maxWidth: { xs: '100%', sm: 400 },
              mx: { xs: 0, sm: 'auto' },
            }}
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
            padding: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            order: { xs: -1, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              component='h1'
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', sm: '3rem' },
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              EstokIA
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.secondary',
                fontWeight: 300,
                mb: 1,
              }}
            >
              Gerencie seu estoque com inteligência artificial
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              gap: { xs: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: { xs: 1.5, md: 2 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 6, md: 8 },
                  height: { xs: 6, md: 8 },
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mt: { xs: 0.5, md: 1 },
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Controle de Estoque
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  }}
                >
                  Monitore itens críticos e níveis de inventário em tempo real
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'success.main',
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  Previsões Inteligentes
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  Análises preditivas de demanda com IA para 7 dias
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'warning.main',
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  Gestão de Entregas
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  Acompanhe entregas pendentes, atrasadas e concluídas
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'info.main',
                  mt: 1,
                  flexShrink: 0,
                }}
              />
              <Box>
                <Typography
                  variant='subtitle1'
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  Relatórios Avançados
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  Insights de vendas e inventário para decisões estratégicas
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
