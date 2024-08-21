in capacitor.config.ts
replace appId and appName by your values

run npm i

in functions/src/models/appInfo.ts
replace PACKAGE and IOS_ID

replace
resources/icon.png
resources/splash.png
by your icon (1024x1024px) and splashscreen (2732x2732px)
(tips: use picture smaller than 1MB to reduce size of your app)
then run
npm run generate-icons
to generate all icons for android ios and PWA

Then go on this link
https://console.firebase.google.com/

Click
Create a project

install firebase globally to your computer
npm i -g firebase
npm i -g firebase-tools
to check if its well installed
firebase --version
( it should return version number)

then go to your project
and run
firebase login
then
firebase projects:list
find the project you created above and copy the "Project Number"
then run (replace the number by your Project number)
firebase use 124513284752
you should see
Now using project 124513284752

translation
https://github.com/ngx-translate/core

ADMOB
https://github.com/capacitor-community/admob
https://apps.admob.com/v2/privacymessaging?pli=1
GDPR > manage > Create message
IDFA > manage > create message be sure its published

You can use same GPDR and IDFA message for all your app, just be sure to add the add once it's created

once app is approved
go to admob
App settings > App store detail > Add
and add your app

android/app/src/main/res/values/strings.xml
<string name="admob_app_id">[APP_ID]</string>
replace [APP_ID] by your app admob id

ios/App/App/Info.plist
<key>GADApplicationIdentifier</key>
<string>[APP_ID]</string>
replace [APP_ID] by your app admob id

PURCHASE
https://github.com/j3k0/cordova-plugin-purchase
if you don't need iap , remove BILLING permission in manifest android
android/app/src/main/AndroidManifest.xml
<uses-permission android:name="com.android.vending.BILLING"/>

be sure android/app/capacitor.build.gradle
implementation "com.android.billingclient:billing:7.0.0"
version is higher than 6.1.1, if not just change it to 7.0.0 ( or your app not gonna be accepted by google)
android studio > File > sync project with gradle files

get json file for google api
create new project
https://console.cloud.google.com/projectcreate
enable this api
https://console.cloud.google.com/marketplace/product/google/androidpublisher.googleapis.com
then go
https://console.cloud.google.com/apis/credentials

be sure the project selected on top left is the same one you created above

then click credentials
then click on manage service account
then click on + create service account
set a name click continue and save

then go back to credential and you should see a new line with 3 vertical dots at the end
click on Manage keys create new key, then select json, save file under functions/files

for IOS
go ( be sure you are login first https://appstoreconnect.apple.com)
https://appstoreconnect.apple.com/access/integrations/api/subs
copy issuer ID at the top and paste it in functions/src/ios_api.ts
const issuerId = "561c3c09-e608-406e-86a9-818ce8d424b3";

Generate In-App Purchase Key
set a name ex "myPurchaseKey"
copy KEY ID and paste it in functions/src/ios_api.ts
const keyId = "HD9ZRUSHXN";
click on downlad key
you should download a file name like something this:
SubscriptionKey_58NCGQ567A.p8
paste it in functions/files
open it and copy all
then paste it in functions/files/apple_private_key.ts inside IOS_PRIVATE_KEY

When created in app purchase don't forget to add a screenshot in review information section or you cannot submit the
product

NOTIFICATIONS
https://capacitorjs.com/docs/apis/push-notifications
ANDROID
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

IOS
go
https://developer.apple.com/account/resources/certificates/list

icon android
firebase rules

first
firebase deploy

git remote remove origin







