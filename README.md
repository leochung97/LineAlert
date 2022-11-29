# LineAlert

### [LineAlert](https://aa-linealert.onrender.com)

LineAlert is a NYC-based subway alert application where users can create live alerts to notify other users of subway hazards, delays, and other suspicious activity.

## Demo

#### Search for Directions

![Search Directions](https://github.com/leochung97/LineAlert/blob/main/frontend/src/assets/img/search_directions.gif)

#### Create an Alert

![Create Alert](https://github.com/leochung97/LineAlert/blob/main/frontend/src/assets/img/create_alert.gif)

## Background and Overview

LineAlert was inspired by real-world events that occurred during our time at App Academy, a full stack software engineering bootcamp. On our first in-person day, a subway shooting shocked and delayed transit systems in NYC. Our application was designed to possibly prevent users from entering hazardous stations and to avoid delays that frequently occur on NYC subways.

There is currently no such alert system for subway riders in NYC. We wanted to create an application where users can notify others of events that may delay a commute or cause harm.

The team's goals were to:

- Build a database to store NYC subway stations with names, latitude and longitude coordinates, and intersecting lines
- Allow all users to view alerts but only authenticated users to have full CRUD (Create, Read, Update, Destroy) functionality on alerts
- Utilize Google Maps API to design a seamless map with dynamic markers of all stations
- Incorporate Google Directions API as a search feature where users can search their route and view all alerts on a polyline on the map
- Notify users of new alerts through email notifications via NodeMailer, a module used to send alerts

LineAlert is built with the MERN stack, a combination of following four technologies: MongoDB, Express, React, and Node.

## Functionality and MVPs

- Customized map using Google Maps API to only display the subway transit layer; can be toggled on or off by users
- Users can create, read, update, and delete alerts which will be dynamically updated on the map
- Option to view all alerts or click on any markers on the map
- Search feature for directions from an origin to a destination will display a polyline on the map, highlighting any alerts on the route

## Bonus Features

- Option to display another route upon user request
- Increase application functionality to all 5 boroughs of NYC
- Instant message system for users to receive alerts based on their time preference
- Create user preferences menu that can change user's desired alerts / notifications

## Technologies

LineAlert is built on the MERN stack (MongoDB, Express, React, and NodeJS).
LineAlert uses Google Maps and Google Directions API to render a dynamic map of NYC subway stations and their alerts.
The application makes use of the [Downshift](https://github.com/downshift-js/downshift) library for our search routes and station names.

### MERN Stack

Utilizing the MERN stack allowed us to use JavaScript on both the frontend and backend. The user's information and preferences are stored as NoSQL objects in MongoDB.
We used Express for backend routing by connecting routes to display our React frontend components through Axios requests.

### Google Maps API

A customized dynamic map is used to display the visual layer of available transit lines, with the ability to toggle on or off as a preference. Unique color coded markers (depending on hazard level) for alerts are rendered for every station pinpointed to their exact location using lattitude and longitude coordinates.

### Google Directions API

Users are able to search a route based on their input origin and destination. Results will allow users to know the duration of travel, distance, and expected arrival time. Users can also request for the next best route if the current route has alerts on its path. While the JSON object received for this request was useful, it was difficult to parse, as many layers were nested into each other.

### Downshift

Utilized for autocompleting search inputs when users were required to input station names (for creating alerts or searching available routes). There was difficulty implementing a flexible search query for users due to the fact that certain stations have the same names but use different train lines and also the fact that stations can have integer or string names. To simplify this and ensure the least error-prone method, we introduced autocomplete for all forms needing a station name.

### NodeMailer

A module used to send and notify users of new alerts. The initial setup of NodeMailer required strict authorization guidelines to be followed when utilizing Gmail accounts; specifically, O Auth 2. After authorization, the LineAlert team was able to utilize NodeMailer to send out new alert notifications to all users.

## Group Members and Work Breakdown

- Project Lead: [Leo Chung](https://github.com/leochung97)
- Frontend Lead: [Tom Leslie Li](https://github.com/tomleslieli)
- Backend Lead: [Nikhil Kumar](https://github.com/nikumar1206)
- Flex Lead: [Vivian Chen](https://github.com/vnchen92)
