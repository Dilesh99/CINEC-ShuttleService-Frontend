import { useState } from "react";
import backEndURL from "./backEndApi";
import { authMethods } from "./authMethods";

let watchId = null;

export const LocationMethods = {
  startTracking: async function (shuttleID) {
    if (!shuttleID) {
      console.log("Please select a shuttle ID before starting tracking.");
      return;
    }

    // Fetch the vehicleNumber associated with the shuttleID
    let vehicleNumber;
    try {
      const retrievedData = await authMethods.refreshToken();
      const accessToken = retrievedData.accessToken;
      const response = await fetch(`${backEndURL}/getLocation?shuttleID=${shuttleID}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch shuttle data: ${response.status}`);
      }
      const shuttleData = await response.json();
      vehicleNumber = shuttleData.vehicleNumber; // Get the vehicleNumber from the response
    } catch (error) {
      console.error("Error fetching shuttle data:", error);
      return;
    }

    if ("geolocation" in navigator && watchId == null) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = { shuttleID, latitude, longitude };

          try {
            const response = await fetch(`${backEndURL}/updateLocation`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                shuttleID: shuttleID,
                vehicleNumber: vehicleNumber,
                latitude: location.latitude,
                longitude: location.longitude,
              }),
            });

            if (!response.ok) {
              throw new Error(`Failed to update location: ${response.status}`);
            }

            console.log("Location updated successfully");
          } catch (err) {
            console.error(`Error updating location: ${err.message}`);
          }
        },
        (error) => {
          console.error(`Error obtaining location: ${error.message}`);
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
        `${backEndURL}/getLocation?shuttleID=${shuttleID}`
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

  updateShuttle: async function (shuttleID, vehicleNumber) {
    try {
      const response = await fetch(`${backEndURL}/updateLocation`, {
        method: "PUT",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shuttleID: shuttleID, vehicleNumber: vehicleNumber })
      });

      if (!response.ok) {
        console.error(`Error updating shuttle (status: ${response.status})`);
        return null;
      }

      const data = await response.text();
      console.log("Shuttle updated:", data);
      return data;
    } catch (error) {
      console.error("Error updating shuttle:", error);
      return null;
    }
  },

  getAllShuttles: async function () {
    try {
      const data = await authMethods.refreshToken();
      if (!data || data.role !== "Admin") {
        console.error("Unauthorized access: Admin role required.");
        return null;
      }

      const accessToken = data.accessToken;
      const response = await fetch(`${backEndURL}/getAllLocations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        console.error(`Error fetching all shuttles (status: ${response.status})`);
        return null;
      }

      const shuttles = await response.json();
      return shuttles;
    } catch (error) {
      console.error("Error fetching all shuttles:", error);
      return null;
    }
  },
};
