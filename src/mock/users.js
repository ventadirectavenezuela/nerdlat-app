const initialUsers = [
  {
    id: 1,
    usuario: "admin",
    contraseña: "Adm1n$2025",
    nombre: "Administrador",
    apellido: "Principal",
    correo: "admin@tuapp.com",
    documento: "ADMIN123",
    rol: "Administrador",
    estado: "activo",
    autenticacion_mfa: false,
    fechaCreacion: new Date().toISOString()
  }
];

export default initialUsers;