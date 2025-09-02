'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { STORAGE_KEYS } from '@/services/api';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Estoque', icon: <InventoryIcon />, path: '/dashboard/inventory' },
  { text: 'Pedidos', icon: <OrdersIcon />, path: '/dashboard/orders' },
  { text: 'Clientes', icon: <CustomersIcon />, path: '/dashboard/customers' },
  { text: 'Relatórios', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
  {
    text: 'Configurações',
    icon: <SettingsIcon />,
    path: '/dashboard/settings',
  },
];

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER);

    if (!token) {
      router.push('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (text: string) => {
    setSelectedItem(text);
    setMobileOpen(false);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setLogoutModalOpen(false);
    router.push('/login');
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography>Carregando...</Typography>
      </Box>
    );
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          EstokIA
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedItem === item.text}
              onClick={() => handleMenuItemClick(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Sair' />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {selectedItem}
          </Typography>
          <IconButton color='inherit'>
            <NotificationsIcon />
          </IconButton>
          <Avatar sx={{ ml: 2 }}>
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : user?.email
              ? user.email.charAt(0).toUpperCase()
              : 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {selectedItem === 'Dashboard' && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    Total de Produtos
                  </Typography>
                  <Typography variant='h4'>1,234</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    Pedidos Hoje
                  </Typography>
                  <Typography variant='h4'>87</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    Vendas do Mês
                  </Typography>
                  <Typography variant='h4'>R$ 45.2K</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
        )}

        {selectedItem !== 'Dashboard' && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant='h4' gutterBottom>
              {selectedItem}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Esta seção está em desenvolvimento.
            </Typography>
          </Paper>
        )}
      </Box>

      <Dialog
        open={logoutModalOpen}
        onClose={handleLogoutCancel}
        aria-labelledby='logout-dialog-title'
        aria-describedby='logout-dialog-description'
      >
        <DialogTitle id='logout-dialog-title'>Confirmar Saída</DialogTitle>
        <DialogContent>
          <DialogContentText id='logout-dialog-description'>
            Tem certeza de que deseja sair do sistema?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color='primary'>
            Cancelar
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            color='primary'
            variant='contained'
          >
            Sair
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
