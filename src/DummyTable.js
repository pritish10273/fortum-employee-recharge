import React from 'react';

const DummyTable = () => {
  // Dummy table data
  const dummyData = [
    { id: 1, name: 'John Doe', address: '123 Main St', email: 'john@example.com', contactNumber: '1234567890' },
    { id: 2, name: 'Jane Smith', address: '456 Elm St', email: 'jane@example.com', contactNumber: '9876543210' },
    // Add more dummy data as needed
   { id: 3, name: 'Jane Smith', address: '4555 Elm St', email: 'jane@example.com', contactNumber: '9876543210' },
    // Add more dummy data as needed
    {id: 4, name: 'Jane Smith', address: '45gg Elm St', email: 'jane@example.com', contactNumber: '9876543210' },
    // Add more dummy data as needed
    {cdid: 5, name: 'Jane Smith', address: '45rfv Elm St', email: 'jane@example.com', contactNumber: '9876543210' },
    // Add more dummy data as needed
  ];

  return (
    <div>
      <h1>Dummy Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td>{item.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DummyTable;
