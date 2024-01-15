import * as actionType from '../Actions/Actions';
import {AlbumType, AlbumPhotoType} from '../../Types';
const initialState = {
  albums: [] as AlbumType[],
  albumPhotos: [] as AlbumPhotoType[],
  loadingAlbums: false,
};

const AlbumReducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case actionType.ACTION_ALBUMS_GET_ALL:
      return {...state, albumPhotos: action.payload, loadingAlbums: false};
    case actionType.ACTION_ALBUMS_GETTING:
      return {...state, loadingAlbums: true};
    default:
      return state;
  }
};

export default AlbumReducer;
