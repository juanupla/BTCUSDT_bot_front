import React, { useState } from 'react';
import {createUser} from '../services/Api' 
import './createUserModal.css'
import Swal from 'sweetalert2';

const CreateUserModal = ({ show, onClose, onUserCreated }) => {
    const [formData, setFormData] = useState({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });
  
    const handleSubmit = async () => {
      try {
        const response = await createUser(formData);
        if(response.status === "OK"){
          onUserCreated(response); // Callback para actualizar la lista de usuarios
          onClose();
          setFormData({ name: '', lastName: '', email: '', password: '' }); // Limpiar form
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: "The user has been registered.",
              showConfirmButton: false,
              timer: 1700
            });
        }
        else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "The user hasn't been registered.",
            showConfirmButton: false,
            timer: 1700
          });
        }
       
      } catch (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "A problem has occurred .",
            showConfirmButton: false,
            timer: 1700
          });
      }
    };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">Create a new user</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-light border-secondary inp"
                  placeholder="Mínimo 3 caracteres, solo letras" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last name</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-light border-secondary inp"
                  placeholder="Mínimo 3 caracteres, solo letras"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control bg-dark text-light border-secondary inp"
                  placeholder="ejemplo@dominio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control bg-dark text-light border-secondary inp"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer border-secondary">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-warning" onClick={() => handleSubmit(formData)}>
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
};

export default CreateUserModal;