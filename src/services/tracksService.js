import { request } from './fetchService';

const getTracks = async () => {
  return await request('tracks', 'GET');
};

const createTrack = async (data) => {
  return await request('tracks', 'POST', data);
};

const updateTrack = async (id, data) => {
  return await request(`tracks/${id}`, 'PUT', data);
};

const deleteTrack = async (id) => {
  return await request(`tarcks/${id}`, 'DELETE');
};

export { getTracks, createTrack, updateTrack, deleteTrack };
