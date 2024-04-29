import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import {DateTime} from 'luxon';
import * as ImagePicker from 'react-native-image-picker';
import {
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Linking,
} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import axios from 'axios';
import configURL from '../config/config';
import DocumentPicker from 'react-native-document-picker';
export function allowMedia(mediapath) {
  if (mediapath) {
    if (mediapath.indexOf('youtube') > -1) {
      return 'youtube';
    }
    var url = mediapath.split('.');
    var ext = '.' + url[url.length - 1].toLowerCase();

    if (mediapath == null || mediapath == '') {
      return '';
    } else {
      if (
        ext == '.wv' ||
        ext == '.wma' ||
        ext == '.webm' ||
        ext == '.wav' ||
        ext == '.vox' ||
        ext == '.voc' ||
        ext == '.tta' ||
        ext == '.sln' ||
        ext == '.rf64' ||
        ext == '.raw' ||
        ext == '.ra' ||
        ext == '.rm' ||
        ext == '.opus' ||
        ext == '.ogg' ||
        ext == '.oga' ||
        ext == '.mogg' ||
        ext == '.nmf' ||
        ext == '.msv' ||
        ext == '.mpc' ||
        ext == '.mp3' ||
        ext == '.mmf' ||
        ext == '.m4p' ||
        ext == '.m4b' ||
        ext == '.m4a' ||
        ext == '.ivs' ||
        ext == '.iklax' ||
        ext == '.gsm' ||
        ext == '.flac' ||
        ext == '.dvf' ||
        ext == '.dss' ||
        ext == '.cda' ||
        ext == '.awb' ||
        ext == '.au' ||
        ext == '.ape' ||
        ext == '.amr' ||
        ext == '.alac' ||
        ext == '.aiff' ||
        ext == '.act' ||
        ext == '.aax' ||
        ext == '.aac' ||
        ext == '.aa' ||
        ext == '.8svx' ||
        ext == '.3gp'
      ) {
        return 'audio';
      } else if (
        ext == '.jpg' ||
        ext == '.jpeg' ||
        ext == '.png' ||
        ext == '.gif' ||
        ext == '.jfif' ||
        ext == '.webp' ||
        ext == '.bmp' ||
        ext == '.svg'
      ) {
        return 'image';
      } else if (
        ext == '.webm' ||
        ext == '.flv' ||
        ext == '.vob' ||
        ext == '.ogg' ||
        ext == '.avi' ||
        ext == '.mov' ||
        ext == '.wmv' ||
        ext == '.mp4' ||
        ext == '.3gp'
      ) {
        return 'video';
      } else if (
        ext == '.zip' ||
        ext == '.rar' ||
        ext == '.doc' ||
        ext == '.docx' ||
        ext == '.xls' ||
        ext == '.csv' ||
        ext == '.pdf' ||
        ext == '.xlsx' ||
        ext == '.vsdx' ||
        ext == '.rtf' ||
        ext == '.bmp' ||
        ext == '.ppt' ||
        ext == '.pptx' ||
        ext == '.txt'
      ) {
        return 'document';
      } else {
        return '';
      }
    }
  }
}

export const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9][a-zA-Z0-9-]+\.com(?:\/\S*)?)/g;

export const isYoutubeUrl = url => {
  return url.match(/(youtube\.com|youtu\.be)\/(watch)?(\?v=)?(\S+)?/);
};

export const extractYouTubeID = url => {
  const match = url.match(
    /(?:youtube\.com.*(?:\\?|&)(?:v)=|youtu\.be\/)([^&?]*)(?:[?&]t=([^&\s]+))?/,
  );
  return match ? match[1] : null;
};

export const openURL = url => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'http://' + url;
  }
  Linking.openURL(url);
};
export function getDocType(data) {
  if (data.MediaPath) {
    const urlSp = data.MediaPath.split('/');
    const name = urlSp[urlSp.length - 1].toLowerCase();
    const result = name.split('.');
    return result;
  }
  return null;
}

export function getTimeFromDateByZone(UserDateTime) {
  const localDate = DateTime.fromISO(UserDateTime, {zone: 'utc'}).toLocal();
  const displayDate = localDate.toFormat('t');
  return displayDate;
}

export function formatDateString(dateStr) {
  const options = {year: 'numeric', month: 'short', day: '2-digit'};
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

export async function downloadFile(documentPath, result) {
  const {dirs} = RNFetchBlob.fs;
  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

  let granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
  );

  if (!granted) {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to read files.',
        buttonPositive: 'OK',
      },
    );
  }

  if (granted) {
    console.log('Storage permission granted');
    try {
      if (result.length == 2) {
        const downloadDest = `${dirToSave}/${result[0]}.${result[1]}`;
        const options = {
          fromUrl: documentPath,
          toFile: downloadDest,
          background: true,
          begin: res => {
            if (Platform.OS === 'ios') {
              PushNotificationIOS.presentLocalNotification({
                alertBody: 'Download started...',
                sound: 'default',
              });
            } else {
              ToastAndroid.show('Download started...', ToastAndroid.LONG);
            }
          },
          progress: res => {
            const progressPercent =
              (res.bytesWritten / res.contentLength) * 100;
            console.log(`Download progress: ${progressPercent.toFixed(2)}%`);
          },
        };

        const downloadTask = RNFS.downloadFile(options);

        downloadTask.promise
          .then(response => {
            if (Platform.OS === 'ios') {
              PushNotificationIOS.presentLocalNotification({
                alertBody: 'Download complete!',
                sound: 'default',
              });
            } else {
              ToastAndroid.show(
                `File ${result[0]}.${result[1]} saved in Downloader Folder`,
                ToastAndroid.SHORT,
              );
            }
          })
          .catch(error => {
            console.error('Download failed:', error);
            if (Platform.OS === 'ios') {
              PushNotificationIOS.presentLocalNotification({
                alertBody: 'Download failed!',
                sound: 'default',
              });
            } else {
              ToastAndroid.show('Download failed!', ToastAndroid.SHORT);
            }
          });
      } else {
        if (Platform.OS === 'ios') {
          PushNotificationIOS.presentLocalNotification({
            alertBody: 'File is corrupted or no result provided!',
            sound: 'default',
          });
        } else {
          ToastAndroid.show(
            'File is corrupted or no result provided!',
            ToastAndroid.SHORT,
          );
        }
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      if (Platform.OS === 'ios') {
        PushNotificationIOS.presentLocalNotification({
          alertBody: 'Error downloading file!',
          sound: 'default',
        });
      } else {
        ToastAndroid.show('Error downloading file!', ToastAndroid.SHORT);
      }
    }
  } else {
    console.log('Storage permission denied');
    if (Platform.OS === 'ios') {
      PushNotificationIOS.presentLocalNotification({
        alertBody: 'Storage permission denied!',
        sound: 'default',
      });
    } else {
      ToastAndroid.show('Storage permission denied!', ToastAndroid.SHORT);
    }
  }
}

const sendMessage = async (
  memberToken,
  LoginToken,
  friendId,
  mediaPath,
  media,
) => {
  const formData = new FormData();
  formData.append('messageText', '');
  formData.append('MemberToken', memberToken);
  formData.append('ReceiverID', friendId);
  formData.append('IsCallMsg', false);
  formData.append('EventType', 'Click');
  formData.append('MediaPath', mediaPath);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      MemberToken: memberToken,
      LoginToken: LoginToken,
    },
  };

  try {
    const {data} = await axios.post(
      configURL.sendPrivateMsgURL,
      formData,
      config,
    );
    if (data?.Result?.errorText) {
      setIsMediaUploading(false); 
    } else {
      return true;
    }
  } catch (err) {
    console.log('Failed to send message to the server : ', err);
  }
};

const uploadChatMedia = async (
  MediaPath,
  memberToken,
  LoginToken,
  ReceiverID,
) => {
  const formData = new FormData();
  formData.append('MemberToken', memberToken);
  formData.append('ReceiverID', ReceiverID);
  formData.append('Media', {
    uri: MediaPath.uri?.uri,
    name: MediaPath.uri?.fileName,
    type: MediaPath.uri?.type,
  });
  try {
    const {data} = await axios.post(configURL.sendMediaURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        MemberToken: memberToken,
        LoginToken: LoginToken,
      },
    });
    if (data.Media_Path) {
      await sendMessage(
        memberToken,
        LoginToken,
        ReceiverID,
        data.Media_Path,
        MediaPath,
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(`Error uploading chat media : ${err}`);
  }
};

const uploadDoc = async (MediaPath, memberToken, LoginToken, ReceiverID) => {
  const formData = new FormData();
  formData.append('MemberToken', memberToken);
  formData.append('ReceiverID', ReceiverID);
  formData.append('Media', {
    uri: MediaPath?.uri?.uri,
    name: MediaPath?.uri?.name,
    type: MediaPath?.uri?.type,
  });
  try {
    const {data} = await axios.post(configURL.sendMediaURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        MemberToken: memberToken,
        LoginToken: LoginToken,
      },
    });
    if (data.Media_Path) {
      await sendMessage(
        memberToken,
        LoginToken,
        ReceiverID,
        data.Media_Path,
        MediaPath,
      );
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(`Error uploading chat media : ${err}`);
  }
};

const handleImageResponse = async (response, memberToken, loginToken, ReceiverID, setIsMediaUploading) => {
  setIsMediaUploading(true);
  if (response.didCancel) {
    setIsMediaUploading(false);
    console.log('User cancelled image picker');
    return false;
  } else if (response.error) {
    setIsMediaUploading(false);
    console.log('ImagePicker Error: ', response.error);
    return false;
  } else {
    let source = {uri: response.assets[0]};
    const resp = await uploadChatMedia(source, memberToken, loginToken, ReceiverID);
    setIsMediaUploading(false);
    return resp;
  }
};

const handleDocResponse = async (response, memberToken, loginToken, ReceiverID, setIsMediaUploading) => {
  setIsMediaUploading(true);
  let source = {uri: response[0]};
  if (source) {
    await uploadDoc(source, memberToken, loginToken, ReceiverID);
    setIsMediaUploading(false);
  } else {
    console.log('No document selected');
    setIsMediaUploading(false);
  }
};
export const pickImage = async (memberToken, loginToken, ReceiverID, setIsMediaUploading) => {
  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  if (Platform.OS === 'android') {
    await ImagePicker.launchImageLibrary(options, response => {
     handleImageResponse(response, memberToken, loginToken, ReceiverID, setIsMediaUploading);
    });
  } else {
    await ImagePicker.showImagePicker(options,  response => {
       handleImageResponse(response, memberToken, loginToken, ReceiverID, setIsMediaUploading);
    });
  }
};

export const pickDocument = async (memberToken, loginToken, ReceiverID, setIsMediaUploading) => {
  try {
    const doc = await DocumentPicker.pick();
    handleDocResponse(doc, memberToken, loginToken, ReceiverID, setIsMediaUploading);
  } catch (err) {
    if (DocumentPicker.isCancel(e)) {
      setIsMediaUploading(false);
      console.log('User cancel the upload ', e);
    } else {
      console.log(err);
    }
  }
};