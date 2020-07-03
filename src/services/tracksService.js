import { request } from './fetchService';

const getTracks = async () => {
  return request('tracks', 'GET');
};

const createTrack = async (data) => {
  return request('tracks', 'POST', data);
};

const updateTrack = async (id, data) => {
  return request(`tracks/${id}`, 'PUT', data);
};

const deleteTrack = async (id) => {
  return request(`tracks/${id}`, 'DELETE');
};

export { getTracks, createTrack, updateTrack, deleteTrack };
