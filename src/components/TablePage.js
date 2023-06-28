import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); 
    return () => clearInterval(interval); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tableapi');
      const data = response.data;
      setTableData(data);
    } catch (error) {
      console.log('Error fetching table data:', error);
    }
  };

  const openNewPage = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tableapi');
      const data = response.data;
    
      const newWindow = window.open('', '_blank');
      newWindow.document.write('<html><head><title>Table Page</title></head><body>');
      newWindow.document.write('<div>');
      
      newWindow.document.write('<table>');
      newWindow.document.write('<thead>');
      newWindow.document.write('<tr>');
      newWindow.document.write('<th>Added By</th>');
      newWindow.document.write('<th>Account</th>');
      newWindow.document.write('<th>Amount</th>');
      newWindow.document.write('<th>Time</th>');
      newWindow.document.write('</tr>');
      newWindow.document.write('</thead>');
      newWindow.document.write('<tbody>');
    
      data.forEach(item => {
        newWindow.document.write('<tr>');
        newWindow.document.write(`<td>${item.addedBy}</td>`);
        newWindow.document.write(`<td>${item.account}</td>`);
        newWindow.document.write(`<td>${item.amount}</td>`);
        newWindow.document.write(`<td>${item.time}</td>`);
        newWindow.document.write('</tr>');
      });
    
      newWindow.document.write('</tbody>');
      newWindow.document.write('</table>');
      newWindow.document.write('</div>');
      newWindow.document.write('</body></html>');
      newWindow.document.close();
    } catch (error) {
      console.log('Error fetching table data:', error);
    }
  };
  
  // const addDataApi = async () => {
  //   try {
  //     const response = await axios.post('/api/addData', {
  //       addedBy: selectedEmployee.email,
  //       account: selectedEmployee.account,
  //       amount: parseInt(amount),
  //       time: new Date().toISOString()
  //     });
  //     console.log(response.data);
  //     fetchData();
  //   } catch (error) {
  //     console.log('Error adding data:', error);
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Check if selectedEmployee is valid
    if (!selectedEmployee || !selectedEmployee.email) {
      console.log('Invalid selected employee');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/addData', {
        addedBy: selectedEmployee.email,
        account: selectedEmployee.account,
        amount: parseInt(amount),
        time: new Date().toISOString()
      });
  
      console.log(response.data);
      setAmount('');
    } catch (error) {
      console.log('Error adding data:', error);
    }
  };
  
  
  

  const openEmployeeDialog = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeDialog = () => {
    setSelectedEmployee(null);
  };

  return (
    <div>
      
      <button onClick={openNewPage}>Show Table</button>

      {/* {selectedEmployee && (
        <div className="dialog">
          <h2>Employee Details</h2>
          <p>Email: {selectedEmployee.email}</p>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="amountInput">Enter Amount:</label>
            <input type="number" id="amountInput" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <button type="submit">Submit</button>
          </form>
          <button onClick={closeDialog}>Close Dialog</button>
        </div> */}
      )
    </div>
  );
};

export default TablePage;
