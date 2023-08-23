import React,{useState,useEffect} from 'react'
import axios from 'axios'; 
function Home() {
    const [trains, setTrains] = useState([]);
    const [authorizationKey, setAuthorizationKey] = useState("");
    useEffect(() => {
        const fetchAuthorizationToken = async () => {
          const payload = {
            
                "companyName": "Train Central tanu",
                "clientID": "943eb3ab-a8ec-4100-a03e-2201dda9e2db",
                "clientSecret": "zqAmTPOgQOvezGLT",
                "ownerName": "tanu Kesharwani",
                "ownerEmail": "tanukesharwani570@gmail.com",
                "rollNo": "20131010273"
            
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
   

    
    <div style={{backgroundColor:'red'}} >

        <h1 style={{textAlign:'center'}}>Train Schedules</h1>
      <table style={{ width: '100%', backgroundColor: 'black', color: 'white', borderCollapse: 'collapse' }}>
        <thead></thead>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid white' }}>Train Name</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Departure Time</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Seats Available (Slp)</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Seats Available (3AC)</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Price (Sleeper)</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Price (AC)</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td style={{ padding: '10px', border: '1px solid white' }}>{train.trainName}</td>
              <td style={{ padding: '10px', border: '1px solid white' }}>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</td>
              <td style={{ padding: '10px', border: '1px solid white' }}>{train.seatsAvailable.sleeper}</td>
              <td style={{ padding: '10px', border: '1px solid white' }}>{train.seatsAvailable.AC}</td>
              <td style={{ padding: '10px', border: '1px solid white' }}>{train.price.sleeper}</td>
              <td style={{ padding: '10px', border: '1px solid white' }}>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  )
}

export default Home