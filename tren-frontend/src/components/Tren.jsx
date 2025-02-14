import React, { useState } from 'react';
import axios from 'axios';
import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container,
  Paper,
  Stack
} from '@mui/material';

const API_URL = 'https://localhost:7211/api/tren';

const Tren = () => {
  const [vagones, setVagones] = useState([]);
  const [numero, setNumero] = useState('');

  const engancharVagon = async (posicion) => {
    if (!numero) {
      alert('Por favor ingresa un número de vagón');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/enganchar`, {
        numero: parseInt(numero),
        posicion
      });
      setVagones(response.data.tren);
      setNumero('');
    } catch (error) {
      console.error('Error al enganchar vagón:', error);
      alert('Error al enganchar el vagón');
    }
  };

  const desengancharVagon = async (posicion) => {
    try {
      const response = await axios.post(`${API_URL}/desenganchar`, {
        posicion
      });
      setVagones(response.data.tren);
    } catch (error) {
      console.error('Error al desenganchar vagón:', error);
      alert('Error al desenganchar el vagón');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Simulador de Tren
        </Typography>
        
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <TextField
              label="Número de vagón"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              type="number"
              variant="outlined"
              size="small"
            />
            <Button 
              variant="contained" 
              onClick={() => engancharVagon('izquierda')}
              color="primary"
            >
              Enganchar Izquierda
            </Button>
            <Button 
              variant="contained" 
              onClick={() => engancharVagon('derecha')}
              color="primary"
            >
              Enganchar Derecha
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={() => desengancharVagon('izquierda')}
              color="secondary"
            >
              Desenganchar Izquierda
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => desengancharVagon('derecha')}
              color="secondary"
            >
              Desenganchar Derecha
            </Button>
          </Box>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              backgroundColor: '#f5f5f5',
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Mi tren es:
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                letterSpacing: '2px'
              }}
            >
              {vagones.length > 0 ? vagones.join(' - ') : '[Vacío]'}
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Container>
  );
};

export default Tren;
