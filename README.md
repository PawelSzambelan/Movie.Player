# Recruitment task for Better Software Group company

Project made for the recruitment process for Junior Frontend Developer position.

## Main functionalities

- Login
- Login as anonymous user
- Video lists access
- Pagination through video lists
- Playing video

## Dependencies

The following technologies were used:
- React
- React-DOM
- Router
- Hooks (useState, useEffect, useRef,useHistory)
- Material-UI
- Axios

## Running the project

Running this project locally

###### From the repo:

1. Clone this project locally
2. Run `npm install` in your bash/command line
3. Go to `/bsg_movie_player` directory in your bash/command line and Run `npm start` in your bash/command line

## Problems encountered

1. Due to lack of some data like cover images I used placeholders
2. There was no option for getting MAIN videos, so I hardcode StreamType only for TRIAL versions.


## Things to add

Couple of things that I would like to add:

1. Tests - use Mock Service Worker and write tests for whole code (I only just started it)
2. Registration
3. Token expiration handling (https://www.npmjs.com/package/axios-auth-refresh)
4. Error handling
5. Create Figma designs
6. Responsiveness
7. Logout
8. Back button in player view
9. Add button for playback to decide whether to play video automatically or by pressing play button

