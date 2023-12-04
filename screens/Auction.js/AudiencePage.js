import React, {useEffect} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {StyleSheet, View, Text} from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  AUDIENCE_DEFAULT_CONFIG,
  ZegoMenuBarButtonName,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import * as ZIM from 'zego-zim-react-native';
import KeyCenter from './KeyCenter';
import {GiftHelper} from './GiftHelper';
import { colors } from '../../styles/colors';

export default function AudiencePage(props) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, liveID} = params;

  useEffect(() => {
    console.log('onLaunch');
  }, []);

  useEffect(() => {
    GiftHelper.onGiftReceived();
  }, []);

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={KeyCenter.appID}
        appSign={KeyCenter.appSign}
        userID={userID}
        userName={userName}
        liveID={liveID}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            props.navigation.navigate('StartAuction');
          },
          topMenuBarConfig: {
            buttons: [
              ZegoMenuBarButtonName.minimizingButton,
              ZegoMenuBarButtonName.leaveButton,
            ],
          },
          bottomMenuBarConfig: {
            audienceButtons: [ZegoMenuBarButtonName.enableChatButton],
            coHostExtendButtons: [<GiftButton onPress={SendGift} />],
            audienceExtendButtons: [
              <GiftButton onPress={SendGift} onShare={SharePressed} />,
            ],
          },
          onWindowMinimized: () => {
            console.log('[Demo]AudiencePage onWindowMinimized');
            props.navigation.navigate('StartAuction');
          },
          onWindowMaximized: () => {
            console.log('[Demo]AudiencePage onWindowMaximized');
            props.navigation.navigate('AudiencePage', {
              userID: userID,
              userName: userName,
              liveID: liveID,
            });
          },
          foregroundBuilder: [<GiftButton onPress={SendGift} />]
        }}
        plugins={[ZIM]}
      />
    </View>
  );

  function SharePressed() {
    console.log('share pressed');
  }

  function SendGift() {
    const url = 'https://zego-virtual-gift.vercel.app/api/send_gift';
    const data = {
      app_id: KeyCenter.appID,
      server_secret: KeyCenter.secret,
      room_id: liveID,
      user_id: userID,
      user_name: userName,
      gift_type: 1001,
      gift_count: 1,
      timestamp: Date.now(),
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        if (data.Code === 0) {
          console.log(`SendGift success, ${JSON.stringify(data)}`);
          Alert.alert('Gift', 'Bid made Successfully');
        }
      })
      .catch(error => {
        console.log(`SendGift failed, ${error}`);
      });
  }
}

const tryNow = ()=>{
  console.log("try")
}

const GiftButton = ({onPress, onShare}) => {
  return (
    <>      
      <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
        <Text style={buttonStyles.buttonText}>{'Bid'}</Text>
      </TouchableOpacity>
    </>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.ORANGE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});

// import React, { useEffect } from 'react';
// import { Alert } from 'react-native';

// import { StyleSheet, View, Text, Button } from 'react-native';
// import ZegoUIKitPrebuiltLiveStreaming, {
//   AUDIENCE_DEFAULT_CONFIG,
//   ZegoMenuBarButtonName,
// } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
// import * as ZIM from 'zego-zim-react-native';
// import KeyCenter from "./KeyCenter";

// export default function AudiencePage(props) {
//   const { route } = props;
//   const { params } = route;
//   const { userID, userName, liveID } = params;

//   return (
//     <View style={styles.container}>
//       <ZegoUIKitPrebuiltLiveStreaming
//         appID={KeyCenter.appID}
//         appSign={KeyCenter.appSign}
//         userID={userID}
//         userName={userName}
//         liveID={liveID}
//         config={{
//           ...AUDIENCE_DEFAULT_CONFIG,
//           onLeaveLiveStreaming: () => {
//             props.navigation.navigate('HomePage');
//           },
//           topMenuBarConfig: {
//             buttons: [ZegoMenuBarButtonName.minimizingButton, ZegoMenuBarButtonName.leaveButton],
//           },
//           onWindowMinimized: () => {
//             console.log('[Demo]AudiencePage onWindowMinimized');
//             props.navigation.navigate('HomePage');
//           },
//           onWindowMaximized: () => {
//               console.log('[Demo]AudiencePage onWindowMaximized');
//               props.navigation.navigate('AudiencePage', {
//                 userID: userID,
//                 userName: userName,
//                 liveID: liveID,
//               });
//           },
//           bottomMenuBarConfig: {
//             coHostExtendButtons: [<GiftButton onPress={SendGift} />],
//             audienceExtendButtons: [<GiftButton onPress={SendGift} />],
//           },
//         }}
//         plugins={[ZIM]}
//       />
//     </View>
//   );
// }

// const GiftButton = ({ onPress }) => {
//   return (
//     <TouchableOpacity
//       style={buttonStyles.button}
//       onPress={onPress}
//     >
//       <Text style={buttonStyles.buttonText}>{'Gift'}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 0,
//   },
//   avView: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//     zIndex: 1,
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     backgroundColor: 'red',
//   },
//   ctrlBar: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     marginBottom: 50,
//     width: '100%',
//     height: 50,
//     zIndex: 2,
//   },
//   ctrlBtn: {
//     flex: 1,
//     width: 48,
//     height: 48,
//     marginLeft: 37 / 2,
//     position: 'absolute',
//   },
// });
