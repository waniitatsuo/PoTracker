import React, { createContext, useState } from 'react';

// Criamos o contexto vazio
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Definição das cores para cada modo
  const theme = {
    isDark, // para saber qual está ativo
    colors: isDark ? {
      // Cores do Modo Escuro
      background: '#121212',
      surface: '#1E1E1E', // Cor dos cards
      text: '#ffffff',
      textSecondary: '#aaaaaa',
      border: '#333333',
      primary: '#FF3D00', // Mantemos o vermelho da marca
      status: 'light', // Para a barra de status do celular
    } : {
      // Cores do Modo Claro (Padrão atual)
      background: '#f5f5f5',
      surface: '#ffffff',
      text: '#333333',
      textSecondary: '#666666',
      border: '#cccccc',
      primary: '#FF3D00',
      status: 'dark',
    }
  };

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};