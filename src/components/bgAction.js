import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export default async (message) => {
    console.log(message)
    // try {
    //     const notification = new firebase.notifications.Notification()
    //         .setTitle(message.data.title)
    //         .setBody(message.data.body)
    //         .setData(message.data)
    //         .android.setChannelId('general')
    //     const action = new firebase.notifications.Android.Action('View', 'ic_launcher', 'View');
    //     const action1 = new firebase.notifications.Android.Action('Cancel', 'ic_launcher', 'Cancel');

    //     // Add the action to the notification
    //     notification.android.addAction(action);
    //     notification.android.addAction(action1);
    //     return firebase.notifications().displayNotification(notification)
    // } catch (e) {
    //     return Promise.resolve();
    // }






}