# LineAlert

### [LineAlert](https://aa-linealert.herokuapp.com/)

LineAlert is a NYC subway alert application where users can create live alerts as they see them, notifying anyone who uses the application.

## Background and Overview

There is currently no alert system for anyone using the subway system in NYC. We want to create an application where users can notify others, of any suspicious events at the current station and anything that might cause delays to their commute. This would be beneficial to all residents who use the subway system as well as tourists alike.

We will need to:
* Build a database to store NYC subway stations with names, lattitude and longitude, and all intersecting lines
* Allow all users to view alerts but only authenticated users to have full CRUD functionality
* Utilize Google Maps API to design a seamless map with dynamic markers of all stations
* Include a search feature where users can create their path and view all alerts on that path

LineAlert is built with the MERN stack, a combination of following four technologies: MongoDB, Express, React, and Node.

## Functionality and MVP

- [ ] Customized map using Google Maps API to display only transit layer, can be toggled on or off
- [ ] Dynamic color coded markers (depending on hazard level) will pop up as alerts are created
- [ ] Option to view all alerts on right navigation or on-click on any markers on the map
- [ ] Search feature for directions from an origin to a destination will display a polyline on the map, also showing where alerts are on the route

## Bonus Features

- [ ] Route rerouting when there are alerts on the route
- [ ] Increase application functionality to all 5 boroughs of NYC
- [ ] Instant message system for users to receive alerts based on their time preference

## Technologies and Technical Challenges

LineAlert is built with the MERN stack (MongoDB, Express, React, and NodeJS).

### MERN Stack

Utilizing the MERN stack allowed us to use JavaScript on both the front and back end. The user's information and preferences are stored as NoSQL objects in MongoDB. We used Express for back end routing purposes and connected them to display our React front end components by making Axios requests.

### Google Maps API

A customized dynamic google map is used to display the visual layer of available transit lines, with the ability to toggle on or off as preference. Unique color coded markers (depending on hazard level) for alerts are rendered for every station pinpointed to their exact location using lattitude and longitude.

### Google Directions API

Users are able to search a route based on their input origin and destination. Results will allow users to know duration of route, distance of route, and expected arrival time. Users can also search next best route if current route has too many alerts on its path. While the JSON object received for this request was useful, it was difficult to parse, as many layers were nested into each other.

### Downshift

Utilized for autocomplete when users need to input station names. There was difficulty implementing a flexible search query for users due to the fact that certain stations have the same names but use different train lines and also the fact that stations can have integer or string names, both used interchangeably. To simplify this and ensure the least error-prone method, we introduced autocomplete for all forms needing a station name.

## Group Members and Work Breakdown

Project Lead: Leo Chung  
Frontend Lead: Tom Leslie Li  
Backend Lead: Nikhil Kumar  
Project Flex: Vivian Chen  
