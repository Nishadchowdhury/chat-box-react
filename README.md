<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img src="https://avatars.githubusercontent.com/u/83539433?v=4" alt="Logo" width="80" height="80" />
    <h3 align="center"><a href="https://nishadchowdhury.vercel.app/">Check Out Developer</a></h3>
</p>

# Project Plan - Chat Application with RTK Query

## Requirement Analysis

[Advance usage of redux & RTKq](#-advance-rtkq)

1. user can register. after registering, user will be automatically logged in, we will store login info to localStorage (for login persistance) and redirected to inbox page

2. user can login and after login we will save the login information in localStorage (for login persistance) and redirect user to inbox

3. load sidebar messages from conversation API and implement load more feature

4. load specific conversation messages when user clicks on it and implement load more feature

5. when user sends message,
   a) if conversation id is present, update conversation table and also inserts into messages table
   b) if conversation id is missing, get conversation id using filter
   _ if conversation id exists, then update that conversation and add to messages table
   _ if conversation id is missing, insert that conversation and add to messages table

6. sidebar conversation list scroll - sort by latest first and when user loads more, bring previous "10 conversations sorted by latest first" and pushed into the conversations array

7. messages list scroll - bring "10 latest messages per request sorted by oldest first". when user loads more, "bring previous 10 messages sorted again by oldest first" and unshift into the array

## Required APIs

1. register
2. login
3. get list of users other than requesting user
4. update conversation
5. insert conversation
6. find conversation
7. list conversation
8. list messages by conversation id
9. send message (insert messages into messages table)

## Advance usage of redux & RTKq

1.  initial setup done but we won't write all the endpoints in the single file, instead we'll create individual files-in-folders for
    each api endpoints .
    1. eg:- _auth>authApi.js_ for all the api related work. and for the common actions of RTK we'll use _auth>authSlice.js_ file.
    2. connecting with the base _apiSlice.js_ file:- we'll import the apiSlice and inject the endPoints into it _apiSlice.injectEndpoints({ endpoints: (builder) => ({ // endpoints }), })_ because this is the mother of all queries.
    3. work flow:- create folders named as features and create files as featureApi.js, featureSlice.js. Import the mother object and push.
2.  after logging in we'll get an access token that will help us to re-auth if the user return back to the browser within an hour.
    So access token must be stored in local storage beside keeping in redux state and this operation can be done after awaiting from frontend but this time we'll set it in from the endpoints.
    1. when an endpoint runs it also calls an async function "onQueryStarted" we can overwrite it hence that will let us know whenever the query is accomplished but it be called when the request starts to go. provides us a few things in the parameters (arg, {queryFulfilled, dispatch}) and we can know when the request end by awaiting "queryFulfilled". after getting the result we can do-some and also dispatch any actions. It's good to manage all the business logic out from the frontend.
3.  it's time to make requests with some common headers such as tokes that is common for all the requests so we need to place
    it in a common place. and the common of all apis is baseQuery's option "prepareHeaders" _apiSlice.js_ file.
4.  as we lost all the states after reloading the page of store. we have to persist the token to re auth and we did in localStorage.
    so we need to check is there any token in localStorage in the root of the app hence we can access the token from anywhere of the app. so we decide "app.js" we'll check the states from here and update the redux state.

