PREREQUIES
Node + npm (https://nodejs.org/en/download/package-manager)
ionic (https://ionicframework.com/docs/intro/cli)
Angular (https://v17.angular.io/guide/setup-local)

run
npm install -g firebase
npm install -g firebase-tools

To check if its installed, in terminal run
node -v
npm -v
ionic -v
ng version
firebase --version

For this tutorial i assume you already have a developer account on google play ( $25 lifetime)
https://support.google.com/googleplay/android-developer/answer/6112435

And if you also want to release your app on iOS ( $99 per year ) + You need a computer apple with xCode on it
https://developer.apple.com/programs/enroll/

First you need to find a package name for your app. Be sure the package is not taken already, you can
replace on this link the package after ?id: by your package name then copy paste on browser and if you see
"We're sorry, the requested URL was not found on this server." it's mean the package name is available.

https://play.google.com/store/apps/details?id=ai.quiz.infinity

Then in capacitor.config.ts
replace appId by your package name and appName by your App Name

in functions/src/models/appInfo.ts
replace PACKAGE by your package name and IOS_ID ( if you don't have IOS_ID yet, just replace by "0000000000" for
example)

run
npm i

then

cd functions
npm i

Then go on this link
https://console.firebase.google.com/
Click
Create a project
Enter a project name (can be anything not really matter)
Continue
Enable Google Analytics
Continue
Select your google analytic account ( or create a new one)
Wait for your firebase project being created then click
Continue

"Get started by adding Firebase to your app" click on "web" icon (</>)
Set an App nickname
( we dont need firebase hosting so leave uncheck)
Click Register App
( firebase must be already installed since we did npm i before)
Then click Continue to console

Then on left panel click on "All products"
Click on Authentication
Get started
in Sign in method tab select
Anonymous
and enable it

on left panel again reclick on "All product"
select Cloud Firestore
Create database
Location > nam5 ( or any other depends on your need)
Next
Select Start in test mode
Create

on Left panel reclick on "All products"
Storage
Get started
Start in test mode
Next
Cloud storage location should be same as the one you choose before
Done

on Left panel reclick on "All products"
select Functions
Upgrade project
Selected plan "Pay as you go Blaze Plan"
Choose Cloud billing account or create one
Set budget amount ($25 but don't worry at the beginning your monthly bill probably gonna be less than 1$ untill you get
thousands of downloads )
Continue
Link Cloud billing account
Done
Get started
( we already installed npm install -g firebase-tools)
Continue
( don't need to init or deploy your project now)
Finish

on Left panel on top next to "Project overview"
click on gear icon > Project settings
Go on tab "Service accounts"
scroll down and click on
Generate new private key
Generate Key
Save this file in
functions/src/files
( file name should look like this: my-first-demo-a7635-firebase-adminsdk-77epm-a65583f68a.json)
then open functions/src/firebaseInit.ts
and replace by your file here
credential: admin.credential.cert("src/files/my-first-demo-a7635-firebase-adminsdk-77epm-a65583f68a.json"),

on Left panel on top next to "Project overview"
click on gear icon > Project settings
scroll down and select Config
copy the Firebase configuration object

then in your project open
functions/src/models/firebase.credentials.ts
and paste the config you just copied
Be sure there is "export":
export const firebaseConfig = ...

then open the file
functions/src/models/general.ts
and replace the region by the one you choose before ( if nam5 you can keep 'us-central1')
export const REGION = 'us-central1';

then go to terminal in your IDE the root of your project and run
firebase login
then
firebase projects:list
find the project you created just before and copy the "Project Number"
then run (replace the number by your Project number)
firebase use 487211203477
you should see
Now using project 487211203477

then go to functions directory to build the backend
cd functions
npm run build

then from the root of the project run
firebase deploy

if everything went fine you must see
✔ Deploy complete!

go on terminal of your IDE on root and run
npm run start
Application should start on  http://localhost:4200/
open it on your browser to see your app

then open a new tab on terminal IDE and run
npm run emulators
you'll get the link to see the log of the backend functions on your browser
http://127.0.0.1:4000/logs

then if you want to release your app on android you need to add android platform
ionic capacitor add android

for iOS
ionic capacitor add ios

then we need to build the front end
npm run build
then
npx cap sync
( to sync all the capacitor package with android and ios file)

UPDATE ICONS
Then replace
resources/icon.png
resources/splash.png
by your icon (1024x1024px) and splashscreen (2732x2732px)
(tips: use picture smaller than 1MB to reduce size of your app)
then run
npm run generate-icons
to generate all icons for android ios and PWA
(docs https://capacitorjs.com/docs/guides/splash-screens-and-icons )

ADMOB
(docs https://github.com/capacitor-community/admob)

ADMOB ANDROID
first go to
https://apps.admob.com/v2/home?pli=1
Create an account if you dont already have one
then from left panel click on
Apps > ADD APP
Platform -> Select Android
Is the app listed on a supported app store? -> No
(if your app is already listed you can select yes)
Continue
Set an App name
Continue
Done

Then
Add ad unit
Banner > Select
set Ad unit name
Create Ad unit
Copy the ad unit id ( it's the second one)
ca-app-pub-5672455571394042/7277193208
Done

Add ad unit
Interstitial > Select
set Ad unit name
Create Ad unit
copy the ad unit id (the second one)
ca-app-pub-5672455571394042/7507357565
Done

Add ad unit
Rewarded > Select
set Ad unit name
copy the ad unit id (the second one)
ca-app-pub-5672455571394042/5771969021

Then on left panel select
App settings
copy App ID
ca-app-pub-5672455571394042/5771969021

open file
android/app/src/main/AndroidManifest.xml
paste
<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="@string/admob_app_id"/>
in <application>

go to
android/app/src/main/res/values/strings.xml
add
<string name="admob_app_id">[APP_ID]</string>
and replace [APP_ID] by your App ID

ADMOB IOS CONFIG
go back to
https://apps.admob.com/v2/home?pli=1
Create another app but this time at the beginning
Platform -> Select iOS

All other steps are same as before.
Then on left panel select
App settings
copy App ID
ca-app-pub-53439385484534033/535242324234

open file
ios/App/App/Info.plist
and paste

replace [APP_ID] by your App ID
<key>GADIsAdManagerApp</key>
<true/>
<key>GADApplicationIdentifier</key>
<string>[APP_ID]</string>
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>
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

more info
https://developers.google.com/admob/ios/privacy/strategies

then open the file
src/app/shared/services/adMob-service.ts
Replace by the id you get before when you create ad Units
bannerId = "ca-app-pub-5672455571394042/7608904697"; // TODO replace by your android banner id
interstitialId = "ca-app-pub-5672455571394042/8659096637"; // TODO replace by your android interstitial id
rewardId = "ca-app-pub-5672455571394042/9110259444"; // TODO replace by your android rewards id

and here

                if (Capacitor.getPlatform() === EPlatform.ios) {
                    this.bannerId = "ca-app-pub-5672455571394042/4719851628"; // TODO replace by your ios banner id
                    this.interstitialId = "ca-app-pub-5672455571394042/3309900750"; // TODO replace by your ios interstitial id
                    this.rewardId = "ca-app-pub-5672455571394042/4707980008"; // TODO replace by your ios rewards id
                }

Then you Need to do this or your app will not be approved by apple because of App Tracking Transparency
https://apps.admob.com/v2/privacymessaging?pli=1
GDPR > manage > Create message
IDFA > manage > create message be sure its published

You can use same GPDR and IDFA message for all your app, just be sure to add the add once it's created

Before deploy your app to the store be sure isTesting = false in src/app/shared/services/adMob-service.ts

    isTesting = false;

Admob may block ads on your app if you dont block sensitive categories. So for it go
https://apps.admob.com/v2/pubcontrols/?pli=1
select Sensitive categories
and block status by switching toggle for these categories
References to Sex
Sexual & Reproductive Health
Alcohol
Gambling & Betting (18+)

once app is approved and availaible on playStore and appstore
go to admob
App settings > App store detail > Add
and add your app

Before continue with notification and in app purchase you need to create your app on apple and google dashboard
For android
Go to
https://play.google.com/console/u/0/developers
select your developer account
Then click on
Create app
Fill App name
Select App or Game
Select Free or paid
Check the Declaration boxes
Click on Create app

For ios
First go
https://developer.apple.com/account/resources/identifiers/list/bundleId
Click + to create new identifier
Select App IDs
Continue
Select App
Continue
Write a description ( it can be just you app name)
Then copy appId from capacitor.config.ts
and paste it in
Bundle ID Explicit
Scroll down to capabilities
Enable Push notification (no need to select broadcast capabilities)
Continue
Register

Then you need to create your app on ios
https://appstoreconnect.apple.com/apps
click on +
New App
Platform iOS
Fill name and Primary language
Bundle ID > select the one you created just above
SKU
You can just use the appId from capacitor.config.ts
User access > Full access
Create

Then you should arrive on your app page
on tab "Distribution", left menu Genera > App informations
Scroll down and copy your Apple ID
then go to
functions/src/models/appInfo.ts
and paste you Apple ID to > IOS_ID

NOTIFICATIONS
https://capacitorjs.com/docs/guides/push-notifications-firebase

That's the longest part of this tutorial. Notification are important if you wants that your user open your app often,
It helps for the rankins of your app on the store. But this is not mandatory.
We need to setup Notification before in app purchase or the app not gonna work.

If you don't need push notification in your app, you can just delete:

src/app/shared/services/notifications.service.ts
then in
capacitor.config.ts
remove
"PushNotifications": {
"presentationOptions": ["badge", "sound", "alert"]
}
and run
npm uninstall @capacitor/push-notifications
npx cap sync

in backend open
functions/src/index.ts
and remove notifications in module.exports
then delete
functions/src/notifications.ts

Then you can go to purchase section

ANDROID
https://console.firebase.google.com/project
open your project
on left panel Project overview >Project settings
Scroll down Add App
add android app on firebase console ( write package name + app name, SHA1 no need)
download the google-services.json and paste it to:
android/app/google-services.json

then select next on firebase console and select Groovy(build.gradle)
then update
android/build.gradle
paste this inside dependencies ( if its not already present)

        classpath 'com.google.gms:google-services:4.4.0'

android/app/build.gradle
add this to the top
plugins {
id 'com.android.application'
id 'com.google.gms.google-services'
}

and this to dependencies

    implementation platform('com.google.firebase:firebase-bom:33.1.2')

then to firebase console click "Next" then "Continue to console"

Ok now let's add notification icon for android
first build your app for android
on terminal go to the root and run
npm run sync-prod

then open Android Studio by running:
ionic cap open android

if you see this error
The project is using an incompatible version (AGP 8.2.1) of the Android Gradle plugin. Latest supported version is AGP
8.1.1

then open file
android/build.gradle
and change the version to 8.1.1 here
classpath 'com.android.tools.build:gradle:8.1.1'
then go an Android Studio
android studio > File > sync project with gradle files

Then on android studio on left panel > project
right click on app > res >  New > Image asset
Icon type >Notification icons
Select clip art or upload your own image ( it must be a black and white picture)
Then click Next
Finish

Then go to
android/app/src/main/AndroidManifest.xml
and paste in <application>

        <!--        For notification icon-->
        <meta-data
                android:name="com.google.firebase.messaging.default_notification_icon"
                android:resource="@drawable/ic_stat_name"
        />

Now lets configure for iOS

https://console.firebase.google.com/project
open your project
on left panel Project overview >Project settings
Scroll down Add App
Select iOS
App Bundle ID > Same as AppId in capacitor.config.ts
App Nickname and App Store ID are optional
Register App
Download GoogleService-Info.plist to ios/App/App/GoogleService-Info.plist
No need to do anything else, just click Next, Next,Continue to console

Then run
ionic cap open ios
it should open Xcode
Then from left panel
Right click on App>App
Add Files to "App"
select ios/App/App/GoogleService-Info.plist
Be sure Add to target: App is checked
Click Add

First you gonna need a certificate Signing Request.
On your mac open Keychain access
On top menu Keychain access >Certificate assistant >Request a certificate from a certificate authority
Request is >Save to disk
Continue
It should download a file
CertificateSigningRequest.certSigningRequest

go
https://developer.apple.com/account/resources/certificates/list
Click on + button to create a new certificate
Scroll down to services and select
Apple Push Notification service SSL (Sandbox & Production)
Continue
App ID: select the app ID you create at the beginning
Continue
Choose file
select the CertificateSigningRequest.certSigningRequest you download above
Continue
(notice the Expiration Date, it can help you to find your certificate later)
Download
It should download one file "aps.cer"
Double click on that file, it should open Keychain access
THen on left menu
Default Keychain > Login
Select tab "My certificates"
and fin the certificate with name like this Apple Push Services: com.edia.template
Check the Expire date, it should be same as the one before
right click on the certificate and select
Export Apple Push Services: com.edia.template
Set a password
It should export a file named Certificates.p12

Then go back to firebase console
Then go to "Cloud Messaging" tab in Project settings
Scroll down to Apple app configuration
on "APNs Certificates" section
You must see 2 upload button, one for development and one for production
Click on upload for development
Select the file Certificates.p12
Write the password you set before
Click Upload

Do same for Production ( Upload, select same file and same password, because when we create the certificate we choose
"Apple Push Notification service SSL (Sandbox & Production" so its same for development and production)
Then click Upload

Then go back on Xcode
Open Pods>Podfile
and update the file like in the documentation
https://capacitorjs.com/docs/guides/push-notifications-firebase
section "Add the Firebase SDK via CocoaPods"
then in the terminal run
npx cap update ios

in XCode open
App/App/AppDelegate.swift
and update the file like in the documentation
https://capacitorjs.com/docs/guides/push-notifications-firebase
Section "Add Initialization Code"

Ok DONE For IOS

To test notification you must use a real device

PURCHASE
https://github.com/j3k0/cordova-plugin-purchase

ANDROID

First you need to upload a first APK to enable the configuration on in app purchase on the dashboard

open
android/app/src/main/AndroidManifest.xml

and be sure there is the permission at the end of file ( just before </manifest>)
<uses-permission android:name="com.android.vending.BILLING"/>

if not add it

on terminal go to the root and run
npm run sync-prod

then open Android Studio by running:
ionic cap open android

if you see this error
The project is using an incompatible version (AGP 8.2.1) of the Android Gradle plugin. Latest supported version is AGP
8.1.1

then open file
android/build.gradle
and change the version to 8.1.1 here
classpath 'com.android.tools.build:gradle:8.1.1'
then go an Android Studio
android studio > File > sync project with gradle files

also be sure on
android/app/capacitor.build.gradle
implementation "com.android.billingclient:billing:7.0.0"
version is higher than 6.1.1, if not just change it to 7.0.0 ( or your app not gonna be accepted by google)
then go an Android Studio
android studio > File > sync project with gradle files

Also go on
Android Studio > File > Project Structure > Modules > Default config
And every time before making a new release be sure to change "Version Code" and "Version name"
(you can just increment by +0.0.1 for each release)

Then click on Play to start the app on the emulator, just to be sure everything is working perfectly before release a
version.
If you got any error, you can check the log on Logcat on android studio

Then on Android Studio top menu go on
Build > Generate signed Bundle / APK(s)
Choose Android App Bundle
Next
Select your Key store path
Write the Key store password + Key alias and Key password
Click Next
select release
Click Create

Wait for the BUILD SUCCESSFUL

Then go back to your app page on google play
https://play.google.com/console/u/0/developers/434342343532424242
From left menu go to
Release > Testing >Internal testing
Click on Create New Release
Click on Choose signing key
You can click on "Use Google-generated key" or you can use another key, up to you
Then scroll down and click on Upload
Select file you just build from Android Studio, it must be
android/app/release/app-release.aab

wait for file to be uploaded then click Next
Click Save and publish

Now you have release your first APK on internal testing channel, you should be able to create your first
in app product.
From left menu go
Monetize>Products>In-app-products
Click "Create product"
set a Product ID ( ex: credits1)

Then in your project go to functions/src/models/transaction.ts
and replace the value of the product by your productID in the enum EPurchaseProducts

get json file for google api
create new project
https://console.cloud.google.com/projectcreate
set name then click Create
then go on
https://console.cloud.google.com/marketplace/product/google/androidpublisher.googleapis.com
be sure the project selected is the one you just created
Click on Enable
then go
https://console.cloud.google.com/apis/credentials

be sure the project selected on top left is the same one you created above

then click credentials on left
then click on manage service account
then click on + create service account
set a Service account ID
CREATE AND CONTINUE
DONE

Then you must see your new service account with status Enabled
On actions column click on 3 vertical dots > Manage keys
ADD KEY > Create new key
select JSON
CREATE

save file in your project under functions/files
( it should look like this functions/src/files/involuted-river-433305-b5-518f1ecbc972.json)

Then open file
functions/src/android_api.ts
and replace the file here by the one you just download
const authClient = new google.auth.JWT({
keyFile: 'src/files/infinity-quiz-431911-00b4571fc53b.json', // Replace key file by the one you download from Private
key
scopes: ["https://www.googleapis.com/auth/androidpublisher"]
});

for IOS

go ( be sure you are login first https://appstoreconnect.apple.com)
https://appstoreconnect.apple.com/access/integrations/api/subs
copy issuer ID at the top and paste it in functions/src/ios_api.ts
const issuerId = "561c3c09-e608-406e-86a9-818ce8d424b3";

From In-App Purchase page
Click to the + next to"Active"
set a name ex "myPurchaseKey"
copy KEY ID and paste it in functions/src/ios_api.ts
const keyId = "HD9ZRUSHXN";

click on downlad key
you should download a file name like something this:
SubscriptionKey_58NCGQ567A.p8
paste it in functions/files
open it and copy all
then paste it in functions/files/apple_private_key.ts inside IOS_PRIVATE_KEY

Then from your app page
https://appstoreconnect.apple.com/apps/6654893890/distribution/info
On left scroll down to Monetization > In-App purchases
Click Create
Select type "Consumable" ( ex: + 100 credits) or "Non-consumable" (ex: Remove ads) depends on what you wanna sell.
Set Reference name
Set Product ID ( i suggest you to use same Product ID as you set on Android if its same product, gonna be easier to
maintain then)

then open functions/src/models/transaction.ts
and update the enum EPurchaseProducts with the product ID value for ios

(PS: When created in app purchase don't forget to add a screenshot in review information section or you cannot submit
the
product)

translation
https://github.com/ngx-translate/core







