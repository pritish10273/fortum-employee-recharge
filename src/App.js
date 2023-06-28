import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './table.css';
import './dialog.css';
import ReactDOM from 'react-dom';
import DummyTable from './DummyTable';
import './dtable.css';
import './drawer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaTrash } from 'react-icons/fa';
import TablePage from './components/TablePage';

import AWS from 'aws-sdk';

axios.defaults.baseURL = 'http://localhost:3001';

const EmployeeTable = () => {
  const [datas, setDatas] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const formRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [auditLog, setAuditLog] = useState([]);
  const [showTable, setShowTable] = useState(false);




  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    
    const newAuditEntry = {
      employee: selectedEmployee.name, // Assuming the 'name' property represents the employee's name
      amount: amount,

    };

    setAuditLog([...auditLog, newAuditEntry]);
  
    
    setAmount('');
    closeDialog();
  };
  
  const handleDeleteEmployee = (employee) => {
   
    const updatedDatas = datas.filter((item) => item.id !== employee.id);
    setDatas(updatedDatas);
  };

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    age: '',
    contactnumber: '',
  });

 

useEffect(() => {
  const fetchDataFromTableAPI = async () => {
    try {
    
      const response = await axios.get('http://localhost:3001/tableapi'); 
      const data = response?.data;
      console.log(data);
      
      setDatas(data);
      console.log('datas', datas);
    } catch (error) {
      console.error(error);
    }
  };

  if (datas.length === 0) {
    fetchDataFromTableAPI();
  }
}, [datas]);



  // useEffect(() => {
  // AWS.config.update({ region: 'ap-south-1' }); 
  // const dynamodb = new AWS.DynamoDB.DocumentClient();



  // const fetchData = async () => {
  //   const params = {
  //     TableName: 'employee-recharge-audit	', 
  //     Key: {
  //       id: 'ITEM_ID', 
  //     },
  //   };

  //   try {
  //     const response = await dynamodb.get(params).promise();
  //     const item = response.Item;
  //     setDatas([item]);
  //   } catch (error) {
  //     console.log('Error fetching data:', error);
  //   }
    
  // };
  //  fetchData();
  // }, []);

  useEffect(() => {
    const fetchDataFromDynamoDB = async () => {
      try {
        // Fetch data from DynamoDB
        const response = await axios.get('http://localhost:3000/data');
        const data = response?.data?.data;
        console.log(data);
        
        setDatas(data);
        console.log('datas', datas);
      } catch (error) {
        console.error(error);
      }
    };

    if (datas.length === 0) {
      fetchDataFromDynamoDB();
    }
  }, [datas]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  
    if (!isFormVisible && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  
  
  const handleInputChange = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddEmployee = async (event) => {
    event.preventDefault();

    if (newEmployee.contactnumber.length !== 10) {
      alert('Contact number should contain 10 digits');
      return;
    }
    // Add new employee to the datas array
    newEmployee.id = parseInt(newEmployee.id);
    const response = await axios.post('http://localhost:3000/addemp', newEmployee, {
      headers: {
        Authorization: 'Basic Zm9ydHVtOmNuZDEyMw=='
      }
    });

  

// function to handle adding data to DynamoDB
const addDataToDynamoDB = async (data) => {
  try {
    await axios.post('http://localhost:3000/addData', data);
    console.log('Data added successfully');
    
  } catch (error) {
    console.error('Error adding data:', error);
   
  }
};


const handleMoneyAdded = async () => {
  
  const addedBy = 'abc';
  const account = 'xyz';
  const amount = 100;
  const time = new Date().toISOString();

  
  const data = { addedBy, account, amount, time };

 
  await addDataToDynamoDB(data);
};

    

    const updatedEmployee = response.data;
    const updatedDatas = [...datas, updatedEmployee];
    setDatas(updatedDatas);
    setNewEmployee({
      name: '',
      email: '',
      age: '',
      contactnumber: '',
    });
    setIsFormVisible(false);
  };

  const handleClearAuditLog = () => {
    setAuditLog([]);
  };
  const openDialog = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDialog = () => {
    setSelectedEmployee(null);
    setAmount('');
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(amount);
  //   setAmount('');
  //   setSelectedEmployee(null);
  // };

  const handleLogClick = () => {
    console.log('Button clicked!');
  };

  const handleEmailClick = (email) => {
    const newWindow = window.open('about:blank');
    newWindow.document.write('<html><head><title>Dummy Table</title></head><body>');
    newWindow.document.write('<div id="root"></div>');
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    const dummyTableElement = React.createElement(DummyTable);
    ReactDOM.render(dummyTableElement, newWindow.document.getElementById('root'));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      
      window.location.href = '/login';
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Perform user authentication here, e.g., check against a database or API
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  
 


  if (!isLoggedIn) {
    return (
      <div className="App">
        <style>{`
          .login-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f1f1f1;
          }
          .login-container h1 {
            margin-bottom: 1rem;
          }
          .login-container form {
            display: flex;
            flex-direction: column;
          }
          .login-container label {
            margin-bottom: 0.5rem;
          }
          .login-container input {
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .login-container button {
            padding: 0.5rem 1rem;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        `}</style>
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>
      <img className="logo" src= "https://chargedrive.in/ftmlite/assets/images/logonew.png" alt="Logo" style={{ width: '180px', height: 'auto', marginLeft:'550px' }} />
      </h1>
<hr></hr>


     

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Drawer */}
      <div className="navigation-drawer">
     
      <button
  className={`drawer-toggle ${isDrawerOpen ? 'open' : ''}`}
  onClick={toggleDrawer}
  style={{
    margin: '20px',
    padding: '10px 20px',
    backgroundColor: 'white',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  }}
>
  {isDrawerOpen ? 'Close Drawer' : <FontAwesomeIcon icon={faBars} />}
</button>
<div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
  <ul>
    <li>
    <button style={{ backgroundColor: 'teal', color: 'white'  }}>
  <a href="about:blank">Menu Item 1</a>
</button>
    </li>
    <li>
    <button style={{ backgroundColor: 'teal', color: 'white'  }}>
  <a href="about:blank">Menu Item 2</a>
</button>
    </li>
    <li>
      <button onClick={() => setShowTable(!showTable)} style={{ backgroundColor: 'teal' }}>Show Table</button>
      {showTable && <TablePage />}
    </li>
    {/* <li>
    <button style={{ backgroundColor: 'teal', color: 'white'  }}>
  <a href="about:blank">Menu Item 3</a>
</button>
    </li> */}
    <li>
      <button onClick={handleLogout} style={{ backgroundColor: 'teal', color: 'white' }}>
        Logout
      </button>
    </li>
   
    <li>
      <button onClick={() => setIsDrawerOpen(false)} style={{ backgroundColor: 'teal' }}>
        Close Drawer
      </button>
    </li>
  </ul>
</div>


   </div>
        

 

<table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px', marginRight:'20px' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Contact Number</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Add Money</th>
      <th style={{ border: '1px solid #ddd', padding: '8px' }}>Remove employee</th>
    </tr>
  </thead>
  <tbody>
    {datas.map((item) => (
      <tr
        key={item.id}
        style={{
          border: '1px solid #ddd',
          transition: 'background-color 0.3s',
        }}
        className="hover-row"
      >
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.id}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.address}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
          <a href="#" onClick={() => handleEmailClick(item.email)}>{item.email}</a>
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.contactnumber}</td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
          <button
            style={{
              backgroundColor: 'teal',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => openDialog(item)}
          >
            Add money
          </button>
        </td>
        <td style={{ border: '1px solid #ddd', padding: '8px' }}>
  <button
    style={{
      backgroundColor: 'white',
      color: 'red',
      padding: '8px 16px',
      border: 'none',
      cursor: 'pointer',
      marginLeft:'55px',
    }}
    onClick={() => {
      const confirmDelete = window.confirm(
        'Sure you want to delete the selected employee details?'
      );
      if (confirmDelete) {
        handleDeleteEmployee(item);
      }
    }}
  >
    <FaTrash size={15} color="red" />
  </button>
</td>

      </tr>
    ))}
  </tbody>
</table>


{selectedEmployee && (
  <div className="dialog">
    <h2>Employee Details</h2>
    <p>Email: {selectedEmployee.email}</p>
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="amountInput">Enter Amount:</label>
      <input type="number" id="amountInput" value={amount} onChange={handleAmountChange} required />
      <button type="submit">Submit</button>
    </form>
    <button onClick={closeDialog}>Close Dialog</button>
  </div>
)}

{/* aidit log */}
<div className="audit-log" style={{ marginTop: '20px', marginBottom: '20px' }}>
  <h3 style={{ margin: '20px' }}>Audit Log</h3>
  {auditLog.map((entry, index) => (
    <p key={index} style={{ margin: '20px' }}>
      Employee: {entry.employee} | Amount: {entry.amount}
    </p>
  ))}
  <button onClick={handleClearAuditLog} style={{ margin: '20px', backgroundColor: 'teal' }}>Clear Audit Log</button>
</div>


       
      </div>

      <hr></hr>
      
      <button
  onClick={toggleFormVisibility}
  style={{
    margin: '20px',
    padding: '10px 20px',
    backgroundColor: 'teal',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }}
>
  Add Employee
</button>

{isFormVisible && (
  <form
  ref={formRef}
  className="add-employee-form"
  onSubmit={handleAddEmployee}
  style={{
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    marginLeft: '400px',
    maxWidth: '400px',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  }}
>
  <label htmlFor="nameInput">Name:</label>
  <input
    type="text"
    id="nameInput"
    name="name"
    value={newEmployee.name}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <label htmlFor="emailInput">Email:</label>
  <input
    type="email"
    id="emailInput"
    name="email"
    value={newEmployee.email}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <label htmlFor="ageInput">Age:</label>
  <input
    type="number"
    id="ageInput"
    name="age"
    value={newEmployee.age}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <label htmlFor="contactNumberInput">Contact Number:</label>
  <input
    type="tel"
    id="contactNumberInput"
    name="contactnumber"
    value={newEmployee.contactnumber}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <label htmlFor="idInput">ID:</label>
  <input
    type="number"
    id="idInput"
    name="id"
    value={newEmployee.id}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <label htmlFor="addressInput">Address:</label>
  <input
    type="text"
    id="addressInput"
    name="address"
    value={newEmployee.address}
    onChange={handleInputChange}
    required
    style={{
      marginBottom: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}
  />

  <button
    type="submit"
    style={{
      marginTop: '1rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    }}
  >
    Submit
  </button>
</form>

)}
<br></br>
 <footer>
          <button onClick={handleLogClick} style={{ margin: '20px', backgroundColor: 'teal'}}>Log Message</button>
        </footer>
      
    </div>
    
  );
};

export default EmployeeTable;


//basic auth ka password sahi y
//76 40
//make an api
//create a table in aws
//post 
//when submit button is clicked the data should be added to the table
// the table will contain 4 things which are who added the money, to whose accountat what time and the amount 