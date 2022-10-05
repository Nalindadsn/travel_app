import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';

const center = { lat: 6.9271, lng: 79.8612 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBL0oWpwIfqtwhIzyb-6pOz4SkXmow4-6I',
    libraries: ['places'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return '...';
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  console.log(directionsResponse);
  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   setDistance('');
  //   setDuration('');
  //   originRef.current.value = '';
  //   destiantionRef.current.value = '';
  // }

  return (
    <div style={{ height: '100vh' }}>
      <div
        style={{
          position: 'relative',
          height: '100vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,.5)',
            width: '50%',
            top: '0',
            right: '0',
            zIndex: '1000',
          }}
        >
          <div spacing={2} justifyContent="space-between">
            <div flexGrow={1}>
              <Autocomplete>
                <input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </div>
            <div flexGrow={1}>
              <Autocomplete>
                <input
                  type="text"
                  placeholder="Destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </div>
            <div
              p={4}
              borderRadius="lg"
              m={4}
              bgColor="white"
              shadow="base"
              minW="container.md"
              zIndex="1"
            ></div>
            <div>
              <button type="submit" onClick={calculateRoute}>
                Calculate Route
              </button>
            </div>
            <div>
              <div>Distance: {distance} </div>
              <div>Duration: {duration} </div>

              <span
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(6);
                }}
              >
                Icon
              </span>
            </div>
          </div>
        </div>

        <GoogleMap
          center={center}
          zoom={6}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '500px',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Google Map div */}
      </div>
    </div>
  );
}

export default App;
