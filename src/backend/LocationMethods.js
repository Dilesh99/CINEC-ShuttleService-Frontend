let watchId = null;

export const LocationMethods = {
  startTracking: async function (shuttleID, setError) {
    if (!shuttleID) {
      setError("Please select a shuttle ID before starting tracking.");
      return;
    }

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { shuttleID, latitude, longitude };

          console.log(location);

          fetch(`http://localhost:8080/updateLocation`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
          })
            .then(() => {
              console.log("Location updated successfully");
            })
            .catch((err) => {
              setError(`Error updating location: ${err.message}`);
            });
        },
        (error) => {
          setError(`Error obtaining location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  },

  stopTracking: async function (setError) {
    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      setError("Tracking stopped.");
    } else {
      setError("Tracking is not active.");
    }
  },

  seeCoordinates: async function () {
    window.open('/view-location', '_blank');
  },

  fetchLocation: async function (shuttleID, setLocation, setError) {
    try {
      const response = await fetch(
        `http://localhost:8080/getLocation?shuttleID=${shuttleID}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching location: ${response.statusText}`);
      }
      const data = await response.json();
      setLocation({
        shuttleID: data.shuttleID,
        longitude: data.longitude,
        latitude: data.latitude,
      });
    } catch (err) {
      setError(`Error retrieving location: ${err.message}`);
    }
  },
};
