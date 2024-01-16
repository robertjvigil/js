import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAlbums} from '../Redux/Actions/AlbumActions';
import {AlbumPhotoType, AlbumType, RootStackParamList} from '../Types/index';

function Albums(_props: RootStackParamList['Albums']): React.JSX.Element {
  const route = useRoute();
  const album = route.params?.Album;
  const dispatch = useDispatch();

  const {albumPhotos, loadingAlbums} = useSelector(
    (state: any) => state.albums,
  );
  const [showAll, setShowAll] = useState(false);
  const [headerTitle, setHeaderTitle] = useState<string>(album.title);
  useEffect(() => {
    dispatch(getAllAlbums());
  }, []);

  useLayoutEffect(() => {
    _props.navigation.setOptions({
      headerTitle: headerTitle,
      headerRight: () => (
        <TouchableOpacity onPress={() => setHeader(!showAll)}>
          <Icon name="star" size={30} color={showAll ? 'blue' : 'black'} />
        </TouchableOpacity>
      ),
    });
  });
  /*
  _props.navigation.setOptions({
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <TouchableOpacity onPress={() => setHeader(!showAll)}>
        <Icon name="star" size={30} color={showAll ? 'blue' : 'black'} />
      </TouchableOpacity>
    ),
    headerTitle: headerTitle,
  });
  */

  function setHeader(showall: boolean) {
    if (showall) {
      setHeaderTitle('All User Albums');
    } else {
      setHeaderTitle(album.title);
    }
    setShowAll(showall);
  }
  // useMemo to avoid costly call in future
  function getAlbumsToShow() {
    if (showAll) {
      return albumPhotos;
    } else {
      let userAlbumPhotos: AlbumPhotoType[] = [];
      albumPhotos.forEach((photo: AlbumPhotoType) => {
        if (album.id === photo.albumId) {
          userAlbumPhotos.push(photo);
        }
      });
      return userAlbumPhotos;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {loadingAlbums ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={getAlbumsToShow()}
          style={{flex: 1}}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({item}) => (
            <Image style={styles.image} source={{uri: item.thumbnailUrl}} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    padding: 20,
    margin: 10,
  },
});

export default Albums;
