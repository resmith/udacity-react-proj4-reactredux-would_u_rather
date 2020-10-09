# Udacity - React

## Redux project

## Would you Rather

by R.E.Smith

[Project Specs](./ProjectSpecs.md)

###### Purpose

Would you Rather?

A polling application demonstrating React & Redux

###### Installation

From a command line terminal

```
1. git clone <this repo>
2. cd to the directory the app is in
3. npm install
4. npm start
```

###### Technology Utilized

- React
- React-Redux
- React State
- Material UI
- Reach-Router (which React-Router will be like in the future)

###### Directory Structure

/src - contains all the app code
/src/components - contains all the components and the overall CSS
/src/actions - the redux actions
/src/middleware - primarly the logger

- Othermiddleware used is Thunk
  /src/reducers
  /src/utils - the data primarily. Also includes constants for the actions and reducers

_Note: The store provider is in Index.js _

###### Redux

The primary redux stores/actions/reducers are:

- questions: A list of polling questions, their text and user responses
- users: list of users, question ids they created and answers to polls
- authedUser (the user logged in)

* Note: Items outside of the src directory \*

###### Components

The application structure is in components

- App: Provides the routing and overall content structure for the app

- Dashboard: Shows the unanwered and answered questions

- Leaderboard: Show users and their questions answered, created and total points

- Logged / Login: Displayed top right of the menu the user logged in and the login / logout button

- New Question - Used to create new questions / polls

- Question Results - after submitting a question, shows the results

- Questions - shows a question and allows the user to submit their answer

- TitleBar - The title bar appears on every page and displays the app name

- TitleMenu - The title menu shows the options for functions (Home, New Question, LeaderBoard)

* Note on Styling \*
  This projects focus was on functionality. The styling was worked on to give the application a professional appearnce, but there are some inconsistencies that were left in place because they were minor, didn't impact functionality and because of the short timeframe needed to complete the course.
