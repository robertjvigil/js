
export type AlbumPhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type AlbumType = {
  userId: number;
  id: number;
  title: string;
};
export  type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite?: string | undefined;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  website?: string : undefined;
  company: {
    name: string;
    catchPhrase?: string : undefined;
    bs?: string : undefined;
  };
  albums?: AlbumType[] : undefined;
  
}

// navigation types

export type RootStackParamList = {
  Home: undefined;
  Albums: {
    Album: AlbumType;
  };
}