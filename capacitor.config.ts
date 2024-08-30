import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.edia.template', // TODO replace by your package name
    appName: 'templateApp', // TODO replace by your appName
    webDir: 'www',
    plugins: {
        "PushNotifications": {
            "presentationOptions": ["badge", "sound", "alert"]
        }
    }
};

export default config;
