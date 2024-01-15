import * as actionType from '../Actions/Actions';
import {UserType} from '../../Types';
const initialState = {
  users: [] as UserType[],
  loadingUsers: false,
};

const UserReducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case actionType.ACTION_GET_USER:
      return {...state, users: action.payload, loadingUsers: false};
    case actionType.ACTION_GETTING_USER:
      return {...state, loadingUsers: true};
    case actionType.ACTION_REMOVE_ALBUM: {
      const {albumId, userId} = action.payload;
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              albums: user.albums.filter(album => album.id !== albumId),
            };
          }
          return user;
        }),
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
