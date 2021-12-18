# course-project-module-2

rename `.env.sample` to `.env` and modify the variables

in order to start the project run script `start:watch` or `start`

## before start

don't forget to modify `.env` and create a database in mongo




# Project's name

Petbook

## Description

Petbook is an app that allows users to keep track of their pets' details (Pet profile) and also access the Zoo (all the pets of all the users).

Pet details:
- name
- owner (slave would be a correct word here)
- sex
- weight
- birthday / age
- color
- breed
- profile photo
- favourite food
- favourite toy
- diseases
- vet visits 
- medication
- friends - pets followed from the Zoo - backlog
- gallery - backlog
- location - backlog


## USER STORIES

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and register buttons

**Register** - As a user I want to register on the webpage so that I can see all the pets and their details

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**User profile** - As a user I want to be able to see my profile and edit it

**Pet profile** - As a user I want to be able to see my pets' profiles and edit it

**Zoo** - As a user I want to be able to see all the pets of all the users

**Add a pet** - As a user I want to be able to add pets to my user profile

**See pet** - As a user I want to be able to see the pets I have in my pets list (The pets I added and the ones I follow (backlog))

**Delete pet** - As a user I want to be able to delete pets from my profile

**Update pet** - As a user I want to be able to update the information of my pets (Edit the pet profile)


## BACKLOG

**Follow** - As a user I want to be able to follow other pets and see them in pets list

**Gallery** - As a user I want to be able to upload more images of my pets, not just a profile picture

**Pet filter** - As a user I want to be able to filter the zoo by animal type (cats, dogs, etc.)

**Pet's localization map** - As a user I want to be able to see in a map where the pets are located


## Routes

| Name                 | Method | Endpoint                      | Description                                      | Body                                  | Redirects               |
| -------------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | ----------------------- |
| Homepage             | GET    | /                             | See the main page                                |                                       |                         |
| Register form        | GET    | /auth/register                | See the form to register                         |                                       |                         |
| Register             | POST   | /auth/register                | Register a user                                  | { mail, password }                    | /user-profile           |
| Log in form          | GET    | /auth/login                   | See the form to log in                           |                                       |                         |
| Log in               | POST   | /auth/login                   | Log in the user                                  | { mail, password }                    | /zoo                    |
| Log out              | POST   | /auth/logout                  | Log out a user                                   |                                       | /                       |
| User profile         | GET    | /user-profile                 | See the profile page with editable form          |                                       |                         |
| User profile edited  | POST   | /user-profile/edit            | Send user's data changed                         | { user_email, password }              | /user-profile           |
| User pets list       | GET    | /user-pets-list               | See user's pets                                  |                                       |                         |
| Zoo                  | GET    | /zoo                          | See all the pets of all users                    |                                       |                         |
| Pet add form         | GET    | /zoo/add                      | See form to upload a new pet                     |                                       |                         |
| Pet add              | POST   | /zoo/add                      | Upload a pet to user's pet's list                | { name, sex, bday, color, etc. }      | /user-pets-list/{petid} |
| Pet profile          | GET    | /zoo/{petid}                  | See the profile page with editable form          |                                       |                         |
| Pet edit form        | GET    | /zoo/{petid}/edit             | See edit form with pet's preloaded information   |                                       |                         |
| Pet edit             | POST   | /{userid}/zoo/{petid}/edit    | Add pet's new information                        | { name, sex, bday, color, etc. }      | /user-pets-list/{petid} |
| Pet delete           | POST   | /{userid}/zoo/{petid}/delete  | Delete pet from user's pets' list                |                                       | /user-pets-list         |
| Pet gallery          | GET    | /zoo/{petid}/gallery          | See the photo gallery of a pet                   |                                       |                         |
| Pets following       | GET    | /user-pets-list/following     | See the pets the user is following               |                                       |                         |


## Models

Pet model

```js
{
    petsName: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    sex: String,
    weight: Number,
    age: Number,
    birthday: Date,
    color: String,
    breed: String,
    profilePhoto: String,
    favouriteFood: String,
    favouriteToy: String,
    diseases: String,
    vetVisits: Date,
    medication: String,
    friends - pets from the catalog - backlog: [String],
    gallery - backlog: [String],
    location - backlog: [String],
}
```


User model

```js
{
    userEmail: String,
    hashedPassword: String,
    name: String,
    age: Number,
    profilePhoto: String,
}
```



## Links

### Petbook project

[Deployed project](...)

### Wireframes

[Balsamiq with Wireframes](https://balsamiq.cloud/sfay0an/pkdw0r4/r2278)                 

### Slides

[Project slides](...)
