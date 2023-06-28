// BlankScreen.js
import React from 'react';

const BlankScreen = () => {
  return (
    <div className="BlankScreen">
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
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>123 Main St</td>
            <td>john@example.com</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>456 Elm St</td>
            <td>jane@example.com</td>
            <td>9876543210</td>
          </tr>
          {/* Add more rows if needed */}
        </tbody>
      </table>
    </div>
  );
};

export default BlankScreen;
