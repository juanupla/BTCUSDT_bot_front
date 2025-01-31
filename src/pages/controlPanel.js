import React, { useEffect, useState } from 'react';
import './controlPanel.css';
import CreateUserModal from '../components/createUserModal';
import { getStatus } from '../services/Api';



const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('bot');

  const [botStatus, setBotStatus] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    { email: "admin@juanupla.com", name: "Juan", lastName: "Cremona", role: "Administrador" }
  ]);

  const handleUserCreated = (newUser) => {
    setUsers([...users, newUser]);
    setShowModal(false); //cerrar modal despues de agregar el usuario
  };

  useEffect(()=>{

    const fetchData = async () => {
       try {
              const status = await getStatus();
              setBotStatus(status);
              
            } catch (error) {
              console.error('Error al cargar los datos:', error);
            }
    }
    fetchData();

  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="admin-panel-container">
        <div className="row m-0">
          <div className="col-12">
            <h1 className="admin-title">Administrative Control Panel </h1>
            
            <div className="nav-tabs-wrapper">
              <ul className="nav nav-tabs custom-tabs internal-nav">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'bot' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bot')}
                  >
                    Bot Control
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    Users
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'ema' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ema')}
                  >
                    Clean EMAs
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'operations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('operations')}
                  >
                    Performance operations
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content p-3">
              {activeTab === 'bot' && (
                <div className="tab-pane active">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h2 className="card-title">Bot control</h2>
                      <h3 className='status-tittle'>Status</h3>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className='Status'>{botStatus ? <div className='Status-on'>ON</div> : <div className='Status-off'>OFF</div>}</span>
                        <button
                          className={`btn ${botStatus ? 'btn-danger' : 'btn-warning'}`}
//------------------------Esto de abajo tiene que ser uan funcion. consultar is estaseguro y pega al endpoint. si es todo correcto 
//                        setBotStatus(!botStatus), sino no. y se muestra sweetalert
                          onClick={() => setBotStatus(!botStatus)} 
                        >
                          {botStatus ? 'Stop Bot' : 'Start Bot'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="tab-pane active">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h2 className="card-title">User management</h2>
                      <button className="btn btn-warning mb-3" onClick={() => setShowModal(true)}>
                        Create a new user
                      </button>
                      <CreateUserModal 
                        show={showModal} 
                        onClose={() => setShowModal(false)}
                        onUserCreated={handleUserCreated}
                      />
                      <div className="table-responsive">
                        <table className="table table-dark table-hover">
                          <thead>
                            <tr>
                              <th>Email</th>
                              <th>Name</th>
                              <th>LastName</th>
                              <th>Rol</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, index) => (
                              <tr key={index}>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.role}</td>
                                <td>
                                  <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ema' && (
                <div className="tab-pane active">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h2 className="card-title">Cleaning EMAs before date</h2>
                      <div className="d-flex gap-3 align-items-center">
                        <input type="date" className="form-control bg-dark text-light" />
                        <button className="btn btn-warning">
                          Clean Emas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'operations' && (
                <div className="tab-pane active">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <h2 className="card-title">Operations performance management</h2>
                      <div className="mb-4">
                        <h3 className='LPTWP'>Last purchase transaction without performance</h3>
                        <div className="table-responsive">
                          <table className="table table-dark table-hover">
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className='LSTWP'>Latest sales transactions without performance</h3>
                        <div className="table-responsive">
                          <table className="table table-dark table-hover">
                            <thead>
                              <tr>
                                <th>Fecha</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>

                      <button className="btn btn-warning justify-content-end">
                        Create a new performance operation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;