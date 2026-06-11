export const ROUTES = {
  HOME: '/',
  CURRENCIES: '/divisas',
  AGE: '/edad',
  ENCRYPT: '/encriptar',
  DIAGRAMS: '/diagramas',
  CONTACT: '/contacto'
};

export const routeConfig = [
  { path: ROUTES.HOME, component: 'Home', title: 'Inicio' },
  { path: ROUTES.CURRENCIES, component: 'Currencies', title: 'Conversor de Divisas' },
  { path: ROUTES.AGE, component: 'Age', title: 'Calculadora de Edad' },
  { path: ROUTES.ENCRYPT, component: 'Encrypt', title: 'Almacenamiento Encriptado' },
  { path: ROUTES.DIAGRAMS, component: 'Diagrams', title: 'Diagramas del Sistema' },
  { path: ROUTES.CONTACT, component: 'Contact', title: 'Contacto' }
];