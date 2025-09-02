'use client';

import { useForm, Controller } from 'react-hook-form';
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
import { signupUser } from '@/services/api';
import { SignupData } from '@/dto/request';
import LoginTexts from '@/components/LoginTexts';

export default function SignupPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupData) => {
    console.log('Signup data:', data);
    try {
      var responseData = signupUser(data);
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <Container component='main' maxWidth='lg'>
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
          <Paper
            elevation={3}
            sx={{ padding: 4, width: '100%', maxWidth: 400 }}
          >
            <Typography component='h1' variant='h4' align='center' gutterBottom>
              Cadastro
            </Typography>
            <Typography
              variant='body2'
              align='center'
              color='text.secondary'
              sx={{ mb: 3 }}
            >
              Crie sua conta EstokIA
            </Typography>

            <Box
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <Controller
                name='name'
                control={control}
                rules={{ required: 'Nome é obrigatório' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label='Nome'
                    autoComplete='name'
                    autoFocus
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                rules={{
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    autoComplete='email'
                    type='email'
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                rules={{
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Senha'
                    type='password'
                    autoComplete='new-password'
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>

              <Typography variant='body2'>
                Já tem uma conta?{' '}
                <Link href='/login' passHref>
                  <MuiLink component='span' sx={{ cursor: 'pointer' }}>
                    Faça login
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <LoginTexts />
      </Box>
    </Container>
  );
}
