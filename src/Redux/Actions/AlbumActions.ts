import {fetchAlbumPhotos} from '../../Api/api';
import {AlbumPhotoType, AlbumType, UserType} from '../../Types';
import * as types from './Actions';

export const getAllAlbums = () => {
  return async (dispatch: any) => {
    dispatch({type: types.ACTION_ALBUMS_GETTING});
    fetchAlbumPhotos().then(async (response: AlbumPhotoType[] | any) => {
      dispatch({
        type: types.ACTION_ALBUMS_GET_ALL,
        payload: response,
      });
    });
  };
};
