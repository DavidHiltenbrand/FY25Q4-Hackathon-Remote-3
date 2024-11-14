import { useEffect, useState } from 'react';

function CustomerDataComponent() {
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/api/getCustomerData?gpsi=12345'); // Replace with your API endpoint and parameters
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        setCustomerData(data); // Store the fetched data in state
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchCustomerData(); // Call the API on page load
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Display loading or error states
  if (error) return <p>Error: {error}</p>;
  if (!customerData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Customer Data</h1>
      <pre>{JSON.stringify(customerData, null, 2)}</pre>
    </div>
  );
}

export default CustomerDataComponent;