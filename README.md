
# Vaccine Appointment Alert

Get alerts related covid vaccines in India.
This Application uses the [Cowin API](https://apisetu.gov.in/public/api/cowin#/) to get slot updates.

Development URL : https://fir-functions-baeb6.web.app/


#  Packages used
[ReactJS](https://reactjs.org/docs/getting-started.html)
[Chakra UI](https://chakra-ui.com/docs/getting-started)
[Firebase SDK](https://www.npmjs.com/package/firebase-admin)

## Slot Availability Architecture
A cron job runs in google cloud, which checks for slots and when a slot is available it updates the user, either on UI or by Text Message.

[Twilio](https://www.twilio.com/console) is used to send text message to end user.

## Contribution
Clone the repository and run npm install
Contact me for env variables.
Checkout from master and make changes on your local branch.
Raise a PR for merging to master

## Roadmap

 - Add functionality for filtering based on shot 1 or shot 2.
 - Add multi language support and get data from COWIN portal based on language
 - CSS fixes
