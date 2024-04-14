import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';

const MyFriends = ({text, lines}) => {
  const [showButtons, setShowButtons] = useState(true);

  const handleAddFriend = () => {
    // Perform actions to add friend
    setShowButtons(false);
  };

  const handleIgnore = () => {
    // Perform actions to ignore friend request
    setShowButtons(false);
  };

  const handleCancel = () => {
    // Toggle the state to show or hide buttons
    setShowButtons(prevState => !prevState);
  };

  const data = [
    {
      userName: 'Brooklyn Simmons',
      friendCount: '+20',
      profession: 'Developer',
      userImage: require('../../assets/png/user2.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user2.png'),
      mutualFriend3: require('../../assets/png/user3.png'),
    },
    {
      userName: 'Darrell Stewarns',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user9.png'),
      mutualFriend1: require('../../assets/png/user4.png'),
      mutualFriend2: require('../../assets/png/user5.png'),
      mutualFriend3: require('../../assets/png/user3.png'),
    },
    {
      userName: 'Jenny Wilson',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user10.png'),
      mutualFriend1: require('../../assets/png/user4.png'),
      mutualFriend2: require('../../assets/png/user7.png'),
      mutualFriend3: require('../../assets/png/user9.png'),
    },
    {
      userName: 'Theresa Webb',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user8.png'),
      mutualFriend1: require('../../assets/png/user6.png'),
      mutualFriend2: require('../../assets/png/user9.png'),
      mutualFriend3: require('../../assets/png/user10.png'),
    },
    {
      userName: 'Savannah Nguyen',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user5.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user5.png'),
      mutualFriend3: require('../../assets/png/user7.png'),
    },
    {
      userName: 'Theresa Webb',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user6.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user4.png'),
      mutualFriend3: require('../../assets/png/user2.png'),
    },
    {
      userName: 'Wade Warren',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user7.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user4.png'),
      mutualFriend3: require('../../assets/png/user2.png'),
    },
    {
      userName: 'Jenny Wilson',
      friendCount: '+10',
      userImage: require('../../assets/png/user1.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user4.png'),
      mutualFriend3: require('../../assets/png/user2.png'),
    },
    {
      userName: 'Ima Iram',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user3.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user4.png'),
      mutualFriend3: require('../../assets/png/user2.png'),
    },
    {
      userName: 'Theresa Webb',
      profession: 'Developer',
      friendCount: '+10',
      userImage: require('../../assets/png/user4.png'),
      mutualFriend1: require('../../assets/png/user1.png'),
      mutualFriend2: require('../../assets/png/user4.png'),
      mutualFriend3: require('../../assets/png/user2.png'),
    },
  ];

  return (
    <>
      <StatusBar barStyle={'dark-lite'} backgroundColor="#1E293C" />
      <Header />
      <View style={styles.container}>
        <View style={{marginHorizontal: 16, marginVertical: 10}}>
          <Text style={styles.FriendTex}>
            My Friend <Text style={{color: '#1866B4'}}>52</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity style={styles.buttons}>
              <Text style={{color: 'black', fontWeight: '500'}}>
                Find Friend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text style={{color: 'black', fontWeight: '500'}}>
                Received Request
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <Text style={{color: 'black', fontWeight: '500'}}>
                Send Request
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchSection}>
          <TextInput placeholder="Search Friends" style={styles.searchBox} />
          <TouchableOpacity style={styles.searchbtn}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/png/search.png')}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data.map((item, index) => (
            <View key={index} style={styles.friendList}>
              <View style={styles.userImage}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={item.userImage}
                />
              </View>
              <View>
                <Text
                  numberOfLines={lines}
                  ellipsizeMode="tail"
                  style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
                  {item.userName}
                </Text>
                <Text
                  style={{fontSize: 12, color: '#1866B4', fontWeight: '500'}}>
                  {item.profession}
                </Text>
                <View style={styles.mutualBox}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={styles.mutualImg}
                      source={item.mutualFriend1}
                    />
                    <Image
                      style={styles.mutualImg2nd}
                      source={item.mutualFriend2}
                    />
                    <Image
                      style={styles.mutualImg2nd}
                      source={item.mutualFriend3}
                    />
                  </View>
                  <Text style={{color: 'black'}}>
                    {item.friendCount} mutual connections
                  </Text>
                </View>
                {showButtons ? (
                  <View style={styles.buttonArea}>
                    <TouchableOpacity
                      style={[styles.blueBtn, {backgroundColor: '#192334'}]}
                      onPress={handleAddFriend}>
                      <Text style={{color: 'white'}}>UnFriend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.blueBtn, {backgroundColor: '#CED4DA'}]}>
                      <Text style={{color: 'black'}}>Message</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.buttonArea}>
                    <TouchableOpacity
                      style={styles.blueBtn}
                      onP
                      onPress={handleCancel}>
                      <Text style={{color: 'white'}}>Add Friend</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.blueBtn, {backgroundColor: '#CED4DA'}]}>
                      <Text style={{color: 'black'}}>Ignore</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchSection: {
    marginHorizontal: 10,
    marginBottom: 10,
    position: 'relative',
  },
  searchBox: {
    backgroundColor: '#f4f4f4',
    borderRadius: 50,
    height: 45,
    paddingLeft: 20,
  },
  searchbtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
  },
  friendList: {
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
  mutualImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  mutualImg2nd: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: -5,
  },
  mutualBox: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
  },
  buttonArea: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  blueBtn: {
    backgroundColor: '#1866B4',
    height: 34,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  FriendTex: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  buttons: {
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginVertical: 12,
  },
});

export default MyFriends;