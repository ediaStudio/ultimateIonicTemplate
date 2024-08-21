first
firebase deploy

git remote remove origin

https://github.com/capacitor-community/admob

android/app/src/main/res/values/strings.xml
<string name="admob_app_id">[APP_ID]</string>
replace [APP_ID] by your app admob id

ios/App/App/Info.plist
<key>GADApplicationIdentifier</key>
<string>[APP_ID]</string>
replace [APP_ID] by your app admob id

if you don't need iap , remove BILLING permission in manifest android
android/app/src/main/AndroidManifest.xml
<uses-permission android:name="com.android.vending.BILLING"/>

right click on android folder > Replace in files
And replace the package name by your package name in all the files
then run
npm run build-prod
then go on
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

notifications
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

Notification ios
go
https://developer.apple.com/account/resources/certificates/list

IN APP PURCHASE
When created in app purchase don't forget to add a screenshot in review information section or you cannot submit the
product

icon android
firebase rules

https://apps.admob.com/v2/privacymessaging?pli=1
GDPR > manage > Create message
IDFA > manage > create message be sure its published

You can use same GPDR and IDFA message for all your app, just be sure to add the add once it's created

once app is approved
go to admob
App settings > App store detail > Add
and add your app






