import React,{useState,useEffect} from 'react'
import axios from 'axios'; 
function train() {
    const [trains, setTrains] = useState([]);
    const [authorizationKey, setAuthorizationKey] = useState("");
    useEffect(() => {
        const fetchAuthorizationToken = async () => {
          const payload = {
            companyName: 'Train Central',
            clientID: '709ebe29-dd82-4237-8353-a85742b4d97a',
            ownerName: 'pulak raj',
            ownerEmail: 'pulakshri@gmail.com',
            rollNo: '20131010490',
            clientSecret: 'QSppyoPjKuzqohom',
          };
    
          try {
            const response = await axios.post('http://20.244.56.144/train/auth', payload);
            if (response.status === 200) {
              const responseData = response.data;
              const authKey = responseData.access_token;
              setAuthorizationKey(authKey);
            } else {
              console.log('Request for authorization token was not successful.');
            }
          } catch (error) {
            console.error('Error getting authorization token:', error);
          }
        };
    
        fetchAuthorizationToken();
      }, []);
    
      useEffect(() => {
        if (!authorizationKey) {
          return; // Don't make the request if authorization key is not available yet
        }
    
        const headers = {
          Authorization: `Bearer ${authorizationKey}`,
          Accept: 'application/json'
        };
    
        axios.get('http://20.244.56.144:80/train/trains', { headers })
          .then(response => {
            setTrains(response.data);
          })
          .catch(error => console.error('Error fetching train schedules:', error));
      }, [authorizationKey]); // Include authorizationKey as a dependency
    
      // Rest of your component code remains the same
    
  return (
    <div>
        <h1>Train Schedules</h1>
      <table>
        <thead>
          <tr>
            <th>Train Name</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Seats Available (AC)</th>
            <th>Price (Sleeper)</th>
            <th>Price (AC)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainName}</td>
              <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  )
}

export default train