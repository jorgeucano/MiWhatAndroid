# NativeScript Calendar Plugin

The Calendar plugin allows you to manipulate events in the user's calendar. You can find, create and delete events in either the default or a custom calendar.

If you're looking for an awesome in-app UI for the native calendar, then [check this out](http://docs.telerik.com/devtools/nativescript-ui/Controls/Calendar/calendar-overview).

## Installation
From the command prompt go to your app's root folder and execute:
```
tns plugin add nativescript-calendar
```

## iOS runtime permission reason
You probably have seen a permission popup like this before (this plugin will trigger one as well, automatically):

<img src="ios_permission_custom_reason.png" width="316px" height="180px"/>

iOS 10+ requires not only this popup, but also a _reason_. In this case it's  "Custom message from App_Resources".

You can provide your own reason for accessing the calendar by adding something like this to `app/App_Resources/ios/Info.plist`:

```xml
  <key>NSCalendarsUsageDescription</key>
  <string>My reason justifying fooling around with your calendar</string>
```

_To not crash your app in case you forgot to provide the reason this plugin adds an empty reason to the `.plist` during build. This value gets overridden by anything you specified yourself. You're welcome._

## TypeScript Usage
Of course you can use this plugin with TypeScript, just import the plugin and use
the functions summed up below like this:

```js
import * as Calendar from "nativescript-calendar";

// example for listCalendars:
Calendar.listCalendars().then(/* .. */);
```

## Usage

If you want a quickstart, [clone our demo app](https://github.com/EddyVerbruggen/nativescript-calendar-demo).

### createEvent

```js
  var Calendar = require("nativescript-calendar");

  // Only the `title`, `startDate` and `endDate` are mandatory, so this would suffice:
  var options = {
    title: 'Get groceries',
    // Make sure these are valid JavaScript Date objects.
    // In this case we schedule an Event for now + 1 hour, lasting 1 hour.
    startDate: new Date(new Date().getTime() + (60*60*1000)),
    endDate: new Date(new Date().getTime() + (2*60*60*1000))
  };

  // You can however add lots of properties to enrich the Event:
  options.location = 'The shop';
  options.notes = 'This event has reminders';

  // iOS has a separate 'url' field, but on Android the plugin appends this to the 'notes' field.
  options.url = 'http://my.shoppinglist.com';

  // You can also override the default reminder(s) of the Calendar (in minutes):
  options.reminders = {
    first: 30,
    second: 10
  };

  // You can make this Event recurring (this one repeats every other day for 10 days):
  options.recurrence = {
    frequency: Calendar.RecurrenceFrequency.DAILY, // DAILY|WEEKLY|MONTHLY|YEARLY
    interval: 2, // once in every 2 days
    endDate: new Date(new Date().getTime() + (10*24*60*60*1000)) // 10 days
  };

  // Want to use a custom calendar for your app? Pass in the 'name'.
  // If the name doesn't yet exist the plugin will create it for you.
  options.calendar = {
    name: "NativeScript Cal"
    // the color, in this case red
    color: "#FF0000",
    // Can be used on Android to group the calendars. Examples: Your app name, or an emailaddress
    accountName: "My App Name"
  };

  Calendar.createEvent(options).then(
      function(createdId) {
        console.log("Created Event with ID: " + createdId);
      },
      function(error) {
        console.log("Error creating an Event: " + error);
      }
  );
```

If you want an 'all day event', make sure you set the dates to midnight like this:
```js
  var d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);

  // this will create an 'all day event' for tomorrow
  var startDate = new Date(d.getTime() + (24*60*60*1000));
  var endDate = new Date(d.getTime() + (2*24*60*60*1000));
  // .. now use these properties in the options object
```

### findEvents
```js
  var options = {
    // when searching, dates are mandatory - the event must be within this interval
    startDate: new Date(new Date().getTime() - (50*24*60*60*1000)),
    endDate: new Date(new Date().getTime() + (50*24*60*60*1000))
  };

  // if you know the Event ID, set it here:
  options.id = '123456';

  // you can optionally pass in a few other properties, any event containing these will be returned:
  options.title = 'groceries';
  options.location = 'foo';
  options.notes = 'bar'; // iOS only

  Calendar.findEvents(options).then(
      function(events) {
        console.log(JSON.stringify(events));
      },
      function(error) {
        console.log("Error finding Events: " + error);
      }
  );
```

The returned 'events' object is an array of JSON events with these properties:
```js
id
title
location
notes
url
startDate
endDate
allDay
calendar {id, name}
attendees // iOS only
```

### deleteEvents
Usage is largely the same as findEvents, only the result is a bit different ;)

```js
  var options = {
    // when searching, dates are mandatory - the event must be within this interval
    startDate: new Date(new Date().getTime() - (50*24*60*60*1000)),
    endDate: new Date(new Date().getTime() + (50*24*60*60*1000));
  };

  // if you know the Event ID, set it here:
  options.id = '123456';

  // you can optionally pass in a few other properties, any event containing these will be deleted:
  options.title = 'groceries';
  options.location = 'foo';
  options.notes = 'bar'; // iOS only

  Calendar.deleteEvents(options).then(
      function(deletedEventIds) {
        console.log(JSON.stringify(deletedEventIds));
      },
      function(error) {
        console.log("Error deleting Events: " + error);
      }
  )
```

### listCalendars
```js
  Calendar.listCalendars().then(
      function(calendars) {
        // a JSON array of Calendar objects is returned, each with an 'id' and 'name'
        console.log("Found these Calendars on the device: " + JSON.stringify(calendars));
      },
      function(error) {
        console.log("Error while listing Calendars: " + error);
      }
  )
```

### deleteCalendar

##### TypeScript
```js
  Calendar.deleteCalendar({
    name: "My Calendar name"
  }).then((id) => {
    // id may be null if none was deleted
    console.log("Deleted Calendar with id " + id);
  });
```
