import { Navigate } from 'react-router-dom';
import { getToken } from '../services/Auth';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2'

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  
  // si no hay token, redirige al login
  if (!token) {
    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Debe iniciar sesión para acceder a este sitio",
        showConfirmButton: false,
        timer: 1500
      });

    return <Navigate to="/login" replace />;
  }
  else{
    try {
        var tok = jwtDecode(token);
      
        if (!tok || !tok.exp) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Su sesión ha caducado. Para acceder a esta sección, vuelva a ingresar.",
            showConfirmButton: false,
            timer: 2000
          });
          return <Navigate to="/login" replace />;
        }
      
        //hora actual en segundos
        const currentTime = Math.floor(Date.now() / 1000);  // convertir a segundos
      
        // verificar si el token ha expirado
        if (tok.exp < currentTime) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Su sesión ha caducado. Para acceder a esta sección, vuelva a ingresar.",
            showConfirmButton: false,
            timer: 2000
          });
          return <Navigate to="/login" replace />;
        }
      } catch (error) {
       
      }
      
  }
  // si hay token y no expiro, muestra el contenido protegido. Ver en el App.js
  return children;
};

export default ProtectedRoute;