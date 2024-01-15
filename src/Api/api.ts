import axios from 'axios';
const baseApiUrl = 'https://jsonplaceholder.typicode.com';
import {AlbumPhotoType, AlbumType} from '../Types/index';
export const fetchUsers = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseApiUrl}/users`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
export const fetchUserAlbums = async (userId: number) => {
  const url =
    userId === -1
      ? `${baseApiUrl}/albums`
      : `${baseApiUrl}/albums?userId=${userId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: {data: AlbumType}) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};

export const fetchAlbumPhotos = async () => {
  const url = `${baseApiUrl}/photos`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response: {data: AlbumPhotoType}) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log(error);
        reject(error);
      });
  });
};
