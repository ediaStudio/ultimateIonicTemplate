<a id="readme-top"></a>

<div align="center">

  <a href="https://ionicframework.com/docs">
    <img src="https://ionic.io/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fionicframeworkcom%2Fd784b88d-9379-49f6-a7ca-502cfe1ea5f0_ionic%2Blogotype%2Bblue.png&w=640&q=75"
alt="Logo" width="260" height="80">
  </a>

<h3 align="center">
🔥 Ultimate Ionic Template with 7 Must-have Features 🔥
</h3>

  <p align="center">
<b>✅ iOS<b/>
<a href="https://apps.apple.com/app/id6608979195">
App using this template on AppStore
</a>

<br />
<br />
<b>✅ Android<b/>
<a href="https://play.google.com/store/apps/details?id=ai.quiz.infinity">
App using this template on PlayStore
</a>
<br />

[![Angular][Angular.io]][Angular-url]
<br />
<a href="https://youtu.be/Nw1s_7r7hJM">View Demo video</a>
·
<a href="https://github.com/ediaStudio/ultimateIonicTemplate/issues/new?labels=bug">
Report Bug</a>
·
<a href="https://github.com/ediaStudio/ultimateIonicTemplate/issues/new?labels=enhancement">
Request Feature</a>
  </p>
</div>
<br />
<br />

## Video Tutorial

The video Tutorial - [Video Tutorial](https://www.devaffranchi.com/cadeau-offert)
<br />
<br />

In the video tutorial i'm using WebStorm ( not free ) to open the files, but you can use Visual Studio (which is
free) :
<br />
[Download Visual Studio](https://code.visualstudio.com/Download)

## Table of Contents

* [✨ Features](#features)
* [🔧 Prerequisites](#prerequisites)
  * [Installation](#installation)
* [👨‍💻 Create developers account](#Create-developers-account)
* [🏷️ Package name](#Package-name)
* [🔥 Setup Firebase](#setup-firebase)
  * [Create project](#create-project)
    * [Add web](#add-web)
    * [Authentication](#authentication)
    * [Cloud firestore](#Cloud-firestore)
    * [Storage](#Storage)
    * [Functions](#Functions)
    * [Service account](#Service-account)
    * [Add configuration to app](#add-configuration)
    * [Build & Deploy](#Build-&-Deploy)
* [🏁 Start application](#Start-application)
* [🛠️ Add platforms](#Add-platforms)
    * [Android](#android-platform)
    * [iOS](#ios-platform)
* [🎨 Update icons & splashscreen](#Update-icons-&-splashscreen)
* [💰 Admob](#Admob)
    * [Android Admob](#Android-Admob)
    * [Banner ads](#banner-ads)
    * [Interstitil ads](#interstitial-ads)
    * [Rewards ads](#rewards-ads)
    * [Android admob Config](#Android-admob-config)
    * [iOS Admob](#iOS-Admob)
    * [iOS admob Config](#ios-admob-config)
    * [Admob Important config](#Admob-Important-config)
* [🔨 Build APP](#Build-APP)
    * [Android Build](#Android-build)
    * [iOS Build](#ios-build)
* [📱 Create app on the store](#Create-app-on-the-store)
    * [Android Store](#Android-store)
    * [iOS Store](#iOS-Store)
* [🔔 Notifications](#Notifications)
    * [Remove notifications](#remove-notifications)
    * [Android notifications](#Android-notifications)
    * [iOS notifications](#iOS-notifications)
* [💰 Purchase](#Purchase)
    * [Android purchase](#Android-purchase)
    * [Google API](#Google-API)
    * [iOS API](#iOS-API)

## Features

This template includes all the followings for your mobile hybrid app:

✅ [Translation](https://github.com/ngx-translate/core)
<br/>
Allows you to target a global audience by supporting multiple languages.
<br />
✅ [Dark mode](http://ionicframework.com/docs/theming/)
<br/>
Enhances user experience with theme customization, appealing to users who prefer low-light settings.
<br />
✅ [Share](https://capacitorjs.com/docs/apis/share)
<br/>
Lets users easily share content, increasing app visibility and engagement.
<br />
✅ [In app Review](https://github.com/capacitor-community/in-app-review)
<br/>
Encourages users to leave reviews directly in the app, boosting credibility and app store ranking.
<br />
✅ [AdMob (Banner,Interstitial,Rewards)](https://github.com/capacitor-community/admob)
<br/>
Monetizes the app with multiple ad formats, offering opportunities to increase revenue.
<br />
✅ [In App Purchase](https://github.com/j3k0/cordova-plugin-purchase)
<br/>
Enables seamless in-app purchases, offering users premium features and boosting monetization.
<br />
✅ Daily Reward
<br/>
Increases user retention by rewarding daily logins, encouraging regular app engagement.
<br/>
✅ [Push Notification](https://capacitorjs.com/docs/guides/push-notifications-firebase)
<br/>
Keeps users engaged with real-time updates, reminders, and offers, driving app usage.
<br />
✅ [Firebase Auth](https://firebase.google.com/docs/auth/web/anonymous-auth)
<br/>
Provides secure, easy login options, enhancing user convenience with anonymous or registered sign-ins.
<br />
✅ [Firebase Functions (Backend)](https://firebase.google.com/docs/functions)
<br/>
Scales backend logic effortlessly, enabling complex app functionalities without maintaining a server.
<br />
✅ [Cloud Firestore (Database)](https://firebase.google.com/docs/firestore)
<br/>
Provides real-time data syncing and storage, ensuring quick and reliable access to user data.
<br />
✅ [Firebase storage](https://firebase.google.com/docs/storage)
<br/>
Offers secure, scalable file storage, perfect for managing user-generated content.
<br />
✅ [iOS + Android](https://ionicframework.com/docs/cli/commands/capacitor-add)
<br/>
Targets both major mobile platforms, maximizing the app's potential audience reach.
<br />

## Prerequisites

- Node + npm [Install node](https://nodejs.org/en/download/package-manager)
- ionic [Install ionic](https://ionicframework.com/docs/intro/cli)
- Angular [Install Angular](https://v17.angular.io/guide/setup-local)
- Firebase [Install Firebase](https://www.npmjs.com/package/firebase)

### Installation

To install firebase run:

```bash
npm install -g firebase
```

You also need to install firebase-tools:

```bash
npm install -g firebase-tools
```

To check if its installed, in terminal run

```bash
node -v
```

```bash
npm -v
```

```bash
ionic -v
```

```bash
ng version
```

```bash
firebase --version
```

## Create developers account

For this tutorial, it's assumed that you already have a developer account on Google Play ($25 lifetime fee).\
[Create developer account on Android](https://support.google.com/googleplay/android-developer/answer/6112435)

If you also want to release your app on iOS, you'll need a developer account on the Apple Store ($99 per year)
and a Mac with Xcode installed.\
(you don't need to pay right now, you can still follow this tutorial for iOS without paying, everything gonna work)\
[Create developer account on iOS](https://developer.apple.com/programs/enroll/)

## Package name

First, you need to find a package name for your app.\
Ensure the package name is not already taken. You can replace the package name
in the link below after ?id= with your desired package name, then copy
and paste the link into your browser. \
If you see `We're sorry, the requested URL was not found on this server.`, it means the package name is available.

[https://play.google.com/store/apps/details?id=ai.quiz.infinity](https://play.google.com/store/apps/details?id=ai.quiz.infinity)

Then in `capacitor.config.ts`\
replace `appId` by your package name and `appName` by your App Name

```ts
appId: 'com.edia.template', // TODO replace by your package name
    appName
:
'templateApp', // TODO replace by your appName
```

in `functions/src/models/appInfo.ts`\
replace `PACKAGE` by your package name and `IOS_ID` ( if you don't have IOS_ID yet, just replace by `0000000000` for
example)

```ts
export const PACKAGE = 'com.edia.template'; // TODO replace by your android package name
export const IOS_ID = '6654893890'; // TODO replace by your ios Apple ID
```

run

```bash
npm i
```

then

```bash
cd functions
npm i
```

## Setup Firebase

### Create project

- Then go on this link
  [Firebase console](https://console.firebase.google.com/)
- Click Create a project
- Enter a project name (can be anything not really matter)
- Continue
- Enable Google Analytics
- Continue
- Select your google analytic account ( or create a new one)
- Wait for your firebase project being created then click
- Continue

### Add web

- `Get started by adding Firebase to your app` click on "web" icon (</>)
- Set an App nickname ( we dont need firebase hosting so leave uncheck)
- Click Register App ( firebase must be already installed since we did npm i before)
- Then click Continue to console

### Authentication

- Then on left panel click on `All products`
- Click on Authentication
- Get started
- in Sign in method tab select `Anonymous` and enable it

### Cloud firestore

- on left panel again reclick on `All product`
- select `Cloud Firestore`
- Create database
- `Location > nam5` ( or any other depends on your need)
- Next
- Select `Start in test mode`
- Create

### Storage

- on Left panel reclick on `All products`
- Storage
- Get started
- `Start in test mode`
- Next
- Cloud storage location should be same as the one you choose before
- Done

### Functions

- on Left panel reclick on "All products"
- select Functions
- Upgrade project
- Selected plan "Pay as you go Blaze Plan"
- Choose Cloud billing account or create one
- Set budget amount ($25 but don't worry at the beginning your monthly bill probably gonna be less than 1$ untill you
  get
  thousands of downloads )
- Continue
- Link Cloud billing account
- Done
- Get started
  ( we already installed npm install -g firebase-tools)
- Continue
  ( don't need to init or deploy your project now)
- Finish

### Service account

- on Left panel on top next to "Project overview"
- click on gear icon > Project settings
- Go on tab "Service accounts"
- scroll down and click on
- Generate new private key
- Generate Key
- Save this file in
- `functions/src/files`
  ( file name should look like this: `my-first-demo-a7635-firebase-adminsdk-77epm-a65583f68a.json`)
- then open `functions/src/firebaseInit.ts`
- and replace by your file here

```bash
credential: admin.credential.cert("src/files/my-first-demo-a7635-firebase-adminsdk-77epm-a65583f68a.json")
```

### Add configuration

- on Left panel on top next to "Project overview"
- click on gear icon > Project settings
- scroll down and select Config
- copy the Firebase configuration object

- then in your project open
  `functions/src/models/firebase.credentials.ts`
- and paste the config you just copied
- Be sure there is "export":

```ts
 export const firebaseConfig =
```

- then open the file
  `functions/src/models/general.ts`
- and replace the region by the one you choose before ( if nam5 you can keep 'us-central1')

```ts
export const REGION = 'us-central1';
```

### Build & Deploy

- then go to terminal in your IDE the root of your project and run

```bash
firebase login
```

- then

```bash
firebase projects:list
```

- find the project you created just before and copy the "Project Number"
- then run (replace the number by your Project number)
-

```bash
firebase use 487211203477
```

- you should see
- Now using project 487211203477

then go to functions directory to build the backend

```bash
cd functions
npm run build
```

then from the root of the project run

we need to init firebase first

```bash
firebase init
```

select firestore, functions, storage (watch the video)
When it ask to overwrite , choose No (press N)

```bash
firebase deploy
```

if everything went fine you must see

```bash
✔ Deploy complete!
```

## Start application

go on terminal of your IDE on root and run

```bash
npm run start
```

Application should start on
[localhost](http://localhost:4200/)
open it on your browser to see your app

then open a new tab on terminal IDE and run

```bash
npm run emulators
```

you'll get the link to see the log of the backend functions on your browser
[Emulator UI](http://127.0.0.1:4000/logs)

## Add platforms

### Android platform

```bash
ionic capacitor add android
```

### iOS platform

```bash
ionic capacitor add ios
```

then we need to build the front end

```bash
npm run build
```

then

```bash
npx cap sync
```

( to sync all the capacitor package with android and ios file)

## Update icons & splashscreen

Then replace
resources/icon.png
resources/splash.png
by your icon (1024x1024px) and splashscreen (2732x2732px)
(tips: use picture smaller than 1MB to reduce size of your app)
then run

```bash
npm run generate-icons
```

to generate all icons for android ios and PWA
docs [docs](https://capacitorjs.com/docs/guides/splash-screens-and-icons)

## Admob

docs [Admob docs](https://github.com/capacitor-community/admob)

### Android Admob

first go to

- [Admob](https://apps.admob.com/v2/home?pli=1)
- Create an account if you dont already have one
- then from left panel click on
- Apps > ADD APP
- Platform -> Select Android
- Is the app listed on a supported app store? -> No
  (if your app is already listed you can select yes)
- Continue
- Set an App name
- Continue
- Done

### Banner ads

Then

- Add ad unit
- Banner > Select
- set Ad unit name
- Create Ad unit
- Done

### Interstitial ads

- Add ad unit
- Interstitial > Select
- set Ad unit name
- Create Ad unit
- Done

### Rewards ads

- Add ad unit
- Rewarded > Select
- set Ad unit name

### Android Admob Config

- Then on left panel select
- App settings
- copy App ID
  `ca-app-pub-5672455571394042/5771969021`

- open file
  `android/app/src/main/AndroidManifest.xml`
- paste ( in <application>)

```xml

<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id"/>
```

in <application>

- go to
  `android/app/src/main/res/values/strings.xml`
- add

```xml

<string name="admob_app_id">[APP_ID]</string>
```

and replace [APP_ID] by your App ID

### iOS Admob

- go back to
  [Admob](https://apps.admob.com/v2/home?pli=1)
- Create another app but this time at the beginning
- Platform -> Select iOS

All other steps are same as before.

### iOS Admob Config

- Then on left panel select
- App settings
- copy App ID
  ca-app-pub-53439385484534033/535242324234

- open file
  ios/App/App/Info.plist
- and paste

replace [APP_ID] by your App ID

```xml

<key>GADApplicationIdentifier</key>
<string>[APP_ID]</string>
<key>GADIsAdManagerApp</key>
<true/>
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>
```

- also add these line to optimize ads displayed on iOS.
  More info:
  [Admob strategies](https://developers.google.com/admob/ios/privacy/strategies)

```xml

<key>SKAdNetworkItems</key>
<array>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cstr6suwn9.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4fzdc2evr5.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4pfyvq9l8r.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>2fnua5tdw4.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ydx93a7ass.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>5a6flpkh64.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>p78axxw29g.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v72qych5uu.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ludvb6z3bs.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>cp8zw746q7.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3sh42y64q3.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>c6k4g5qg8m.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>s39g8k73mm.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3qy4746246.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>f38h382jlk.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>hs6bdukanm.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v4nxqhlyqp.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>wzmmz9fp6w.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>yclnxrl5pm.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>t38b2kh725.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>7ug5zh24hu.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>gta9lk7p23.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>vutu7akeur.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>y5ghdn5j9k.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>n6fk4nfna4.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>v9wttpbfk9.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>n38lu8286q.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>47vhws6wlr.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>kbd757ywx3.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>9t245vhmpl.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>eh6m2bh4zr.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>a2p9lx4jpn.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>22mmun2rn5.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4468km3ulz.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>2u9pt9hc89.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>8s468mfl3y.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>klf5c3l5u5.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ppxm28t8ap.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>ecpz2srf59.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>uw77j35x4d.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>pwa73g5rt2.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>mlmmfzh3r3.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>578prtvx9j.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>4dzt52r2t5.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>e5fvkxwrpn.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>8c4e2ghe7u.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>zq492l623r.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3rd42ekr43.skadnetwork</string>
</dict>
<dict>
    <key>SKAdNetworkIdentifier</key>
    <string>3qcr597p9d.skadnetwork</string>
</dict>
</array>
```

- then open the file
  `src/app/shared/services/adMob-service.ts`
- Replace by the id you get before when you create ad Units
  (it should look like this)
  `ca-app-pub-5672455571394042/5771969021`

```ts
bannerId = "ca-app-pub-5672455571394042/7608904697"; // TODO replace by your android banner id
interstitialId = "ca-app-pub-5672455571394042/8659096637"; // TODO replace by your android interstitial id
rewardId = "ca-app-pub-5672455571394042/9110259444"; // TODO replace by your android rewards id
```

and here

```ts
if (Capacitor.getPlatform() === EPlatform.ios) {
    this.bannerId = "ca-app-pub-5672455571394042/4719851628"; // TODO replace by your ios banner id
    this.interstitialId = "ca-app-pub-5672455571394042/3309900750"; // TODO replace by your ios interstitial id
    this.rewardId = "ca-app-pub-5672455571394042/4707980008"; // TODO replace by your ios rewards id
}
```

### Admob Important config

⚠️ You need to do this or your app will not be approved by apple because of App Tracking Transparency:
[Admob](https://apps.admob.com/v2/privacymessaging?pli=1)

- Go to https://admob.google.com/v2/privacymessaging
- GDPR > manage > Create message
- IDFA > manage > create message be sure its published

You can use same GPDR and IDFA message for all your app, just be sure to add the add once it's created

Before deploy your app to the store be sure
in `src/app/shared/services/adMob-service.ts`

```ts
isTesting = false;
```

Admob may block ads on your app if you dont block sensitive categories. So for it go
[Admob Categories](https://apps.admob.com/v2/pubcontrols/?pli=1)

- select Sensitive categories
- and block status by switching toggle for these categories
- References to Sex
- Sexual & Reproductive Health
- Alcohol
- Gambling & Betting (18+)

once app is approved and availaible on playStore and appstore

- go to admob
- App settings > App store detail > Add
- and add your app

## Build APP

### Android build

Go to the root of your project

```bash
npm run sync-prod
```

- then open Android Studio by running:

```bash
ionic cap open android
```

if you see this error

```bash
The project is using an incompatible version (AGP 8.2.1) of the Android Gradle plugin. Latest supported version is AGP
8.1.1
```

- then open file
  `android/build.gradle`
- and change the version to `8.1.1` here

```gradle
classpath 'com.android.tools.build:gradle:8.1.1'
```

- then go an Android Studio
  `android studio > File > sync project with gradle files`

### iOS build

Go to the root of your project

```bash
npm run sync-ios-prod
```

- then open Xcode by running:

```bash
ionic cap open ios
```

At that step you should already be able to test your app on the emulators on Xcodoe or Android Studio, or on real device
if you plug it with the cable.

## Create app on the store

Before continue with notification and in app purchase you need to create your app on apple and google dashboard

### Android store

- Go to
  [Google play](https://play.google.com/console/u/0/developers)
- select your developer account
- Then click on Create app
- Fill App name
- Select App or Game
- Select Free or paid
- Check the Declaration boxes
- Click on Create app

### iOS Store

- First go
  [Developer apple Identifiers](https://developer.apple.com/account/resources/identifiers/list/bundleId)
- Click + to create new identifier
- Select App IDs
- Continue
- Select App
- Continue
- Write a description ( it can be just you app name)
- Then copy appId from `capacitor.config.ts`
  and paste it in
- Bundle ID Explicit
- Scroll down to capabilities
- Enable Push notification (no need to select broadcast capabilities)
- Continue
- Register

Create app On Appstoreconnect

- Then you need to create your app on ios
  [Appstoreconnect](https://appstoreconnect.apple.com/apps)
- click on +
- New App
- Platform iOS
- Fill name and Primary language
- Bundle ID > select the one you created just above
- SKU
  You can just use the appId from `capacitor.config.ts`
- User access > Full access
- Create

- Then you should arrive on your app page
  on tab "Distribution", left menu Genera > App informations
- Scroll down and copy your Apple ID
- then go to
  `functions/src/models/appInfo.ts`
- and paste you Apple ID to > IOS_ID

## Notifications

[Push notifications firebase](https://capacitorjs.com/docs/guides/push-notifications-firebase)

That's the longest part of this tutorial. Notification are important if you wants that your user open your app often,
It helps for the rankins of your app on the store. Even if it's not mandatory, i highly suggest you to implement it.
We need to setup Notification before in app purchase or the app not gonna work.

### Remove notifications

If you don't need push notification in your app, you can just:

delete

`src/app/shared/services/notifications.service.ts`

then in `src/app/app.component.ts`

delete

```ts
`private notificationsService: NotificationsService,`
```

also delete

```ts
setTimeout(() => {
  this.notificationsService.manageNotifications();
}, 5000)
```

then in `src/app/home/home.component.ts`

delete

```ts
    `private notificationsService: NotificationsService,`
```

delete

```ts
async
testNotification()
{
  await this.miscService.presentLoadingWithOptions();
  try {
    await this.notificationsService.testNotificationCall();
  } catch (e: any) {
    this.miscService.displayError(e);
  }
  this.miscService.dismissLoading();
}
```

in `src/app/home/home.component.html`

delete

```html

<ion-button (click)="testNotification()"
            class="ion-margin-top"
            color="secondary"
            expand="full"
            shape="round">
  Test Notification
</ion-button>
```

- then in
  `capacitor.config.ts`
- remove

```bash
"PushNotifications": {
"presentationOptions": ["badge", "sound", "alert"]
}
```

and run

```bash
npm uninstall @capacitor/push-notifications
```

```bash
npx cap sync
```

- in backend open
  `functions/src/index.ts`
- and remove notifications in

```ts
module.exports
```

- then delete
  `functions/src/notifications.ts`

Then you can go to purchase section [💰 Purchase](#Purchase)

### Android notifications

[Console Firebase](https://console.firebase.google.com/project)

- open your project
- on left panel Project overview >Project settings
- Scroll down Add App
- add android app on firebase console ( write package name + app name, SHA1 no need)
- download the `google-services.json` and paste it to:
  `android/app/google-services.json`

- then select next on firebase console and select Groovy(build.gradle)
- then update
  `android/build.gradle`
- paste this inside dependencies ( if its not already present)

```gradle
        classpath 'com.google.gms:google-services:4.4.0'
```

- add this to the top of `android/app/build.gradle

```gradle
plugins {
id 'com.android.application'
id 'com.google.gms.google-services'
}
```

- and this to dependencies in `android/app/build.gradle`

```gradle
    implementation platform('com.google.firebase:firebase-bom:33.1.2')
```

- then to firebase console click "Next", "Next" then "Continue to console"

Ok now let's add notification icon for android

- first build your app for android: on terminal go to the root and run

```bash
npm run sync-prod
```

- Then on android studio on left panel > project
- right click on `app > res >  New > Image asset`
- `Icon type >Notification icons`
- Select clip art or upload your own image ( it must be a black and white picture)
- Then click Next
- Finish

- Then go to
  `android/app/src/main/AndroidManifest.xml`
  and paste in <application>

```xml
        <!--        For notification icon-->
<meta-data
        android:name="com.google.firebase.messaging.default_notification_icon"
        android:resource="@drawable/ic_stat_name"
/>
```

### iOS notifications

- Go to [Console firebase](https://console.firebase.google.com/project)
- open your project
- on left panel `Project overview >Project settings`
- Scroll down Add App
- Select iOS
- App Bundle ID > Same as AppId in `capacitor.config.ts`
- App Nickname and App Store ID are optional
- Register App
- Download `GoogleService-Info.plist` to `ios/App/App/GoogleService-Info.plist`
- No need to do anything else, just click Next, Next,Continue to console

- Then run

```bash
ionic cap open ios
```

it should open Xcode

- Then from left panel
- Right click on `App>App`
- Add Files to "App"
- select `ios/App/App/GoogleService-Info.plist`
- Be sure Add to target: App is checked
- Click Add

First you gonna need a certificate Signing Request.

- On your mac open Keychain access
- On top menu Keychain access >Certificate assistant >Request a certificate from a certificate authority
- Request is > Save to disk
- Continue
  It should download a file
  `CertificateSigningRequest.certSigningRequest`

- go [Apple developer certificates](https://developer.apple.com/account/resources/certificates/list)
- Click on + button to create a new certificate
- Scroll down to services and select `Apple Push Notification service SSL (Sandbox & Production)`
- Continue
- App ID: select the app ID you create at the beginning
- Continue
- Choose file
- select the `CertificateSigningRequest.certSigningRequest` you download above
- Continue
  (notice the Expiration Date, it can help you to find your certificate later)
- Download
  It should download one file `aps.cer`
- Double click on that file, it should open Keychain access
- Then on left menu
- Default `Keychain > Login`
- Select tab "My certificates"
  and fin the certificate with name like this `Apple Push Services: com.edia.template`
- Check the Expire date, it should be same as the one before
- Right click on the certificate and select
  `Export Apple Push Services: com.edia.template`
- Set a password
- It should export a file named `Certificates.p12`

- Then go back to firebase console
- Then go to `Cloud Messaging tab in Project settings
- Scroll down to Apple app configuration
  on `APNs Certificates` section
  You must see 2 upload button, one for development and one for production
- Click on upload for development
- Select the file `Certificates.p12`
- Write the password you set before
- Click Upload

- Do same for Production ( Upload, select same file and same password, because when we create the certificate we choose
  "Apple Push Notification service SSL (Sandbox & Production" so its same for development and production)
- Then click Upload

- Then go back on Xcode
- Open `Pods>Podfile`
- and update the file like in the documentation
  [Firebase push notifications](https://capacitorjs.com/docs/guides/push-notifications-firebase)
  section `Add the Firebase SDK via CocoaPods`
- then in the terminal run

- Then go to `signing & Capabilities`
- Click on +
- And double click on `Push notifications`

```bash
npx cap update ios
```

- in XCode open
  `App/App/AppDelegate.swift`
- and update the file like in the documentation
  [Push notifications firebase](https://capacitorjs.com/docs/guides/push-notifications-firebase)
- Section `Add Initialization Code`

Then on Xcode go to
Signing & Capabilities
Click on + Capability
Select Push notification by double click on it

DONE For IOS

To test notification you must use a real device, you can just plug a cable and then on Xcode select your real device
And to test notification click on the button "Test Notification" on the app home page

## Purchase

For the purchase i use: [Cordova plugin purchase](https://github.com/j3k0/cordova-plugin-purchase)

### Android purchase

First you need to upload a first APK to enable the configuration on in app purchase on the dashboard

- open
  `android/app/src/main/AndroidManifest.xml`

and be sure there is the permission at the end of file ( just before </manifest>)

```xml

<uses-permission android:name="com.android.vending.BILLING"/>
```

if not add it

- on terminal go to the root and run

```bash
npm run sync-prod
```

- then open Android Studio by running:

```bash
ionic cap open android
```

Be sure on
`android/app/capacitor.build.gradle`

```gradle
implementation "com.android.billingclient:billing:7.0.0"
```

version is higher than 6.1.1, if not just change it to 7.0.0 ( or your app not gonna be accepted by google)

- then go an Android Studio
  `android studio > File > sync project with gradle files`

- Also go on
  `Android Studio > File > Project Structure > Modules > Default config`
- And every time before making a new release be sure to change "Version Code" and "Version name"
  (you can just increment by +0.0.1 for each release)

- Then click on Play to start the app on the emulator, just to be sure everything is working perfectly before release a
  version.
  If you got any error, you can check the log on Logcat on android studio

- Then on Android Studio top menu go on
  `Build > Generate signed Bundle / APK(s)`
- Choose Android App Bundle
- Next
- Select your Key store
  path ( [Generate Keystore](https://stackoverflow.com/questions/3997748/how-can-i-create-a-keystore))
- Write the Key store password + Key alias and Key password
- Click Next
- select release
- Click Create

Wait for the BUILD SUCCESSFUL

- Then go back to your app page on google play
  [Google play console](https://play.google.com/console/u/0/developers/434342343532424242)
- From left menu go to
  `Release > Testing >Internal testing`
- Click on Create New Release
- Click on Choose signing key
  You can click on "Use Google-generated key" or you can use another key, up to you
- Then scroll down and click on Upload
- Select file you just build from Android Studio, it must be
  `android/app/release/app-release.aab`

wait for file to be uploaded then click Next

- Click Save and publish

Now you have release your first APK on internal testing channel, you should be able to create your first
in app product.

- From left menu go
  `Monetize>Products>In-app-products`
- Click "Create product"
- set a Product ID ( ex: credits1)

Then in your project go to `functions/src/models/transaction.ts`
and replace the value of the product by your productID in the enum EPurchaseProducts

### Google API

- create new project
  [Google cloud console](https://console.cloud.google.com/projectcreate)
- set name then click Create
- then go on
  [Google cloud console](https://console.cloud.google.com/marketplace/product/google/androidpublisher.googleapis.com)
  be sure the project selected is the one you just created
- Click on Enable
- then go
  [Google cloud credentials](https://console.cloud.google.com/apis/credentials)

be sure the project selected on top left is the same one you created above

- then click credentials on left
- then click on manage service account
- then click on + create service account
- set a Service account ID
- CREATE AND CONTINUE
- DONE

Then you must see your new service account with status Enabled

- On actions column click on 3 vertical dots > Manage keys
- ADD KEY > Create new key
- select JSON
- CREATE

save file in your project under functions/files
( it should look like this `functions/src/files/involuted-river-433305-b5-518f1ecbc972.json`)

- Then open file
  `functions/src/android_api.ts`
- and replace the file here by the one you just download

```ts
const authClient = new google.auth.JWT({
    keyFile: 'src/files/infinity-quiz-431911-00b4571fc53b.json', // Replace key file by the one you download from Private
    key
    scopes: ["https://www.googleapis.com/auth/androidpublisher"]
});
```

### iOS API

- go [Appstoreconnect](https://appstoreconnect.apple.com/access/integrations/api/subs)
- copy issuer ID at the top and paste it in `functions/src/ios_api.ts`

```ts
const issuerId = "561c3c09-e608-406e-86a9-818ce8d424b3";
```

- From In-App Purchase page
- Click to the + next to"Active"
- set a name ex "myPurchaseKey" then Generate
- copy KEY ID and paste it in `functions/src/ios_api.ts`

```ts
const keyId = "HD9ZRUSHXN";
```

- click on downlad key
- you should download a file name like something this:
  `SubscriptionKey_58NCGQ567A.p8`
- paste it in functions/files
- open it and copy all
- then paste it in `functions/files/apple_private_key.ts` inside IOS_PRIVATE_KEY

- Then from your app page
  [Appstoreconnect](https://appstoreconnect.apple.com/apps/6654893890/distribution/info)
- On left scroll down to Monetization > In-App purchases
- Click Create
- Select type "Consumable" ( ex: + 100 credits) or "Non-consumable" (ex: Remove ads) depends on what you wanna sell.
- Set Reference name
- Set Product ID ( I suggest you to use same Product ID as you set on Android if its same product, gonna be easier to
  maintain then)
- (⚠️ When created in app purchase don't forget to add a screenshot in review information section or you cannot submit
  the
  product)

- then open `functions/src/models/transaction.ts` and update the enum EPurchaseProducts with the product ID value for
  ios

Then you can test your app on emulators, the in app purchase should appears.

⚠⚠⚠ IMPORTANT ⚠⚠⚠

in `src/app/shared/services/adMob-service.ts`
don't forget to set

```ts
isTesting = false;
```

before build and deploying your app to the store, or user gonna see the tests ads, and it not gonna make any money

Also don't forget to update the status of your app on Admob after it's approved by Google & Apple

- go to admob
- App settings > App store detail > Add
- and add your app

❤️❤️❤️❤️
I've spent time creating this template and the tutorial video, and I'm giving them to you for free.
This is the same template I use in my own apps.

If you'd like to support me and show your appreciation, I’m not asking for money.

But if you have a moment, you can leave a review for my app, it really helps me with rankings.

If you have an app of your own, I’d be happy to return the favor by downloading and rating it on both Android and iOS.

It's a Quiz game using AI to test your knowledge:

iOS ➡️ [AppStore link](https://apps.apple.com/app/id6608979195)
<br/>
<br/>
Android ➡️ [PlayStore link](https://play.google.com/store/apps/details?id=ai.quiz.infinity)

<!-- LICENSE -->

## License

Distributed under the MIT License.


<!-- CONTACT -->

## Contact

Email - contact@ediastudio.com

My Youtube channel - [https://www.youtube.com/@devaffranchi](https://www.youtube.com/@devaffranchi)

My Instagram - [https://www.instagram.com/devaffranchi/](https://www.instagram.com/devaffranchi/)

<p align="right">(<a href="#readme-top">back to top ⬆️</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white

[Angular-url]: https://angular.io/
