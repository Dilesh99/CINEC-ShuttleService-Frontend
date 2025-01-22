import { useState } from "react";

let watchId = null;

export const LocationMethods = {
  startTracking: async function (shuttleID) {
    if (!shuttleID) {
      console.log("Please select a shuttle ID before starting tracking.");
      return;
    }

    if ("geolocation" in navigator && watchId == null) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { shuttleID, latitude, longitude };

          console.log(location);

          fetch(`http://5.181.217.67/updateLocation`, {
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
              console.log(`Error updating location: ${err.message}`);
            });
        },
        (error) => {
          console.log(`Error obtaining location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      console.log("Already tracking");
    }
  },

  stopTracking: async function () {
    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
      console.log("Tracking stopped.");
    } else {
      console.log("Tracking is not active.");
    }
  },

  fetchLocation: async function (shuttleID, setLocation) {
    try {
      const response = await fetch(
        `http://5.181.217.67/getLocation?shuttleID=${shuttleID}`
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
      console.error(`Error retrieving location: ${err.message}`);
    }
  },
};
