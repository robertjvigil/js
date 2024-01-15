import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersAndAlbums, removeAlbum} from '../Redux/Actions/UserActions';

function Home(props: any): React.JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAndAlbums());
  }, []);
  const {users, loadingUsers} = useSelector((state: any) => state.user);
  console.log(users);
  return (
    <SafeAreaView style={styles.container}>
      {loadingUsers ? (
        <Text>Loading...</Text>
      ) : (
        <SectionList
          sections={users.map((user: UserType) => ({
            name: user.name,
            data: user.albums,
          }))}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => props.navigation.push('Albums', {Album: item})}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                height: 30,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'right'}}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeAlbum(item.id, item.userId))}>
                <Text style={styles.removeButton}>-</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section}) => (
            <TouchableOpacity
              style={styles.seciontHeader}
              onPress={() => {
                props.navigation.push('Albums', {UserAlbums: section.data});
              }}>
              <Text style={{fontWeight: 'bold'}}>{section.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.id + index}
        />
      )}
      <TouchableOpacity onPress={() => dispatch(removeAlbum(3, 1))}>
        <Text>Remove</Text>
      </TouchableOpacity>
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
  seciontHeader: {
    paddingLeft: 10,
    height: 40,
    backgroundColor: '#f0f0f0',
    flex: 1,
    justifyContent: 'center',
  },
  removeButton: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
  },
});
export default Home;
