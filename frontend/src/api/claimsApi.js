// src/api/claimsApi.js
import axios from 'axios';
import BASE_URL from '../config';

// Get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Fetch all claims
export const fetchClaims = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/claims`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching claims", error);
    throw error;
  }
};

// Create a new claim
export const createClaim = async (vehicleInfo) => {
  try {
    await axios.post(`${BASE_URL}/claims/create`, { vehicleInfo }, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (error) {
    console.error("Error creating claim", error);
    throw error;
  }
};

// Update an existing claim
export const updateClaim = async (id, vehicleInfo) => {
  try {
    await axios.put(`${BASE_URL}/claims/${id}`, { vehicleInfo }, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (error) {
    console.error("Error updating claim", error);
    throw error;
  }
};

// Cancel a claim
export const cancelClaim = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/claims/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (error) {
    console.error("Error canceling claim", error);
    throw error;
  }
};

// Appeal a claim
export const appealClaim = async (id, appealMessage) => {
  try {
    await axios.post(`${BASE_URL}/claims/${id}/appeal`, { appealMessage }, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
  } catch (error) {
    console.error("Error appealing claim", error);
    throw error;
  }
};


export const submitFeedback = async (id, message) => {
    try {
      await axios.post(`${BASE_URL}/claims/${id}/feedback`, { message }, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
    } catch (error) {
      console.error("Error appealing claim", error);
      throw error;
    }
  };



