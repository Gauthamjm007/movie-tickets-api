# MOVIE BOOKING API

## Packages Used

mongoose<br/>
express<br/>
bcryptjs<br/>
jsonwebtoken<br/>
dotenv<br/>
nodemailer<br/>
cors<br/>
lodash<br/>

## Features

higly secured pasword saving<br/>
jwt based authentication<br/>
automated mail sending<br/>
book a particular seat<br/>
see unreserved seat<br/>
find movies by name <br/>
find theatres<br/>

### END POINTS

#### User Authentication

For user authentication I have used **JSON Web Token** , for password encryption **bcryptjs** , I have used a 12 length salt value and have hashed the value in one way , the user is safe that nobody can view their password<br/>

The user can register using the given format<br/>

```javascript
{"username":"user123",
"email":"user123@gmail.com",
"password":"secret123",
"role":"Admin",
"phone":"9876543210",
"gender":"Male"}
```

for login<br/>

```javascript
{
"email":"user123@gmail.com",
"password":"secret123"}
```

```javascript
//register user
router.post("/register", usersController.register);
//user login
router.post("/login", usersController.login);
//get user account
router.get("/account", authenticateUser, usersController.account);
//logout user
router.delete("/logout", authenticateUser, usersController.logout);
//deleate user
router.delete("/account/:id", authenticateUser, usersController.destroy);
```

#### Movies CRUD Operation

sample data<br/>

```javascript
 {
 "name":"Arjun reddy"
 "language":"Telugu",
 "release_date":"12 Nov 2019",
 "director":"Sandeep",
 "certification":"U",
 "dimension":"2D",
 "genre":"Romance",
 "cast":["Vijay DK"],
 "poster":"Arjun reddy",
 "duration":180
 }

 {
"name":"Padmavaath",
 "language":"Hindi",
 "release_date":"12 Jan 2019",
 "director":"Sanjay Leela bansali",
 "certification":"U",
 "dimension":"2D",
 "genre":"Romance",
 "cast":["Shahid Kapoor","Ranveer Singh"],
 "poster":"Padmavaath",
 "duration":160
 }

```

```javascript
//get all movies
router.get("/movie", movieController.list);
//get a particular movie
router.get("/movie/:id", movieController.show);
//edit a particular movie by only authorized admin
router.put("/movie/:id", authenticateUser, movieController.update);
//create a  movie by only authorized admin
router.post("/movie", authenticateUser, movieController.create);
//delete a  movie by only authorized admin
router.delete("/movie/:id", authenticateUser, movieController.destroy);
```

#### Theatre CRUD Operation

```javascript
//get all theaters
router.get("/theatre", theatreController.list);
//get details of a particular theaters
router.get("/theatre/:id", theatreController.show);

//edit a particular theatre
router.put("/theatre", authenticateUser, theatreController.update);
//create a theatre
router.post("/theatre", authenticateUser, theatreController.create);
//delete a theare
router.delete("/theatre/:id", authenticateUser, theatreController.destroy);
```

sample data

```javascript
 {
    "name": "PVR Koramangla",
    "no_screens": 4,
    "no_of_seats": 20,
    "address": "The Forum Mall, 21-22, Adugodi Main Road Koramangala, Chikku Lakshmaiah Layout, Adugodi, Bengaluru, Karnataka 560095",
    "location": { "type": "Point", "coordinates": [ 72, 120 ] }
}
```

#### Screens CRUD Operation

```javascript
//get all movies that are playing in different screens
router.get("/screens", screenController.list);

//delete a screen by only authorized users
router.delete("/screens/:id", authenticateUser, screenController.destroy);

//create a screen
router.post("/screens", authenticateUser, screenController.create);

//reserve a seat in a particular screen
router.post(
  "/screens/:screen_id/reserve",
  authenticateUser,
  screenController.reserve
);

//get unreserved seat information : http://localhost:8000/screens/:screen_id/seats?status=unreserved
//get if a particular seat is available or not
//http://localhost:8000/screens/:screen_id/seats?numSeats={no of seats needed}&choice= {row alphabet}
router.get("/screens/:screen_id/seats", screenController.infoseats);
//list all movies by name
router.get("/screens/movie/:id", screenController.listByMovie);
//list all theatre running different movie
router.get("/screens/theatre/:id", screenController.listByTheatre);
```

##### Screen Post

```javascript
{ "movie":"ObjectId of movie",
"theatre":"ObjectId of theatre",
"screen_no":"S1",
"time":"10PM",
"seatInfo": {
 "A": { "numberOfSeats": 10, "aisleSeats": [0, 5 ,6, 9] },
 "B": { "numberOfSeats": 15, "aisleSeats": [0, 5 ,6, 9] }}
```

##### Reserve a seat

```javascript
{ "seats": { "A": [1, 2], "B": [ 3, 4] } }
```

##### get the available seats for a given screen ,Response body (example):

```javascript
{ "seats": { "A": [0, 1 ,2 ,6, 7, 8 , 9], "B": [0, 8 , 9]} }
```

##### API to get information of available tickets at a given position,Response body (example):

```javascript
{ "availableSeats": { "A": [3, 4] } }
```
