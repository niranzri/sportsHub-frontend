# SPORTSHUB

MERN Stack application, developed as our final project of the Web Development bootcamp at Ironhack (Remote).

## [Check the deployed App!](https://sports-hub-ironhack.netlify.app/)

![landingpage](./src/pictures/splash.png)

# About

Hello! We are Noe, Hristina and Marine.  <br>
Our final project is an app where the companies can offer their sports activity and users can choose an activity of interested and location preference. 

![allactivities](./src/pictures/allActivities.png)


## Routes
| Route                                  | Privacy         | Renders                      |
| -------------------------------------- | :-------------: | ------------------------     |
| /                                      | public          | HomePage                     |
| /profile                               | private (user)  | Profile Page                 |
| /login                                 | public          | LoginPage                    |
| /signup                                | public          | SignupPage                   |
| /companies/companyId/:activityId        | private (user)  | CompanyActivityDetailsPage   |
| /companies/companyId/createActivity    | private (user)  | CompanyCreateActivityPage    |
| /allActivities                         | public          | AllActivitiesPage            |
| /activityDetails/:activityId           | pablic          | ActivityDetailsPage          |

 
# Tech stack
Frontend: React (hooks) , React Router, CSS frameworks/libraries <br>
Backend: Node.js, Express, MongoDB, JWT Tokens


# Extra Links

## Backend Repo
[Link](https://github.com/niranzri/sportsHub-backend)



