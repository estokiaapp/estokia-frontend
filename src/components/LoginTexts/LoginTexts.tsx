'use client';

import { Box, Typography } from '@mui/material';

interface FeatureItem {
  title: string;
  description: string;
  color: 'primary' | 'success' | 'warning' | 'info';
}

interface LoginTextsProps {
  showFeatures?: boolean;
}

const features: FeatureItem[] = [
  {
    title: 'Controle de Estoque',
    description: 'Monitore itens críticos e níveis de inventário em tempo real',
    color: 'primary',
  },
  {
    title: 'Previsões Inteligentes',
    description: 'Análises preditivas de demanda com IA para 7 dias',
    color: 'success',
  },
  {
    title: 'Gestão de Entregas',
    description: 'Acompanhe entregas pendentes, atrasadas e concluídas',
    color: 'warning',
  },
  {
    title: 'Relatórios Avançados',
    description: 'Insights de vendas e inventário para decisões estratégicas',
    color: 'info',
  },
];

export default function LoginTexts({ showFeatures = true }: LoginTextsProps) {
  return (
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

      {showFeatures && (
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            gap: { xs: 2, md: 3 },
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
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
                  bgcolor: `${feature.color}.main`,
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
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}