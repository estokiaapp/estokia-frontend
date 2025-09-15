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
      <Grid size={12}>
        <Typography variant='h4' gutterBottom>
          EstokIA - Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}
