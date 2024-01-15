import {fetchUsers, fetchUserAlbums} from '../../Api/api';
import {UserType} from '../../Types';
import * as types from './Actions';

export const getUsersAndAlbums = () => {
  return async (dispatch: any) => {
    dispatch({type: types.ACTION_GETTING_USER});
    fetchUsers().then(async (response: UserType[] | any) => {
      const userWithAlbums = await Promise.all(
        response.map(async (user: UserType) => {
          const albums = await fetchUserAlbums(user.id);
          user.albums = albums;
          return user;
        }),
      );
      dispatch({
        type: types.ACTION_GET_USER,
        payload: userWithAlbums,
      });
    });
  };
};

export const removeAlbum = (albumId: number, userId: number) => {
  return {
    type: types.ACTION_REMOVE_ALBUM,
    payload: {
      albumId,
      userId,
    },
  };
};
