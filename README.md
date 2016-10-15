# state-of-react

- - - - - - - - - - - - - -
A React showcase on frameworks, tools, tests & related stuff
- - - - - - - - - - - - - - 

Boutique site with some views: home, list, detail and a submit page
Uses react-router, Express.js server (for fetching the currently static json file)

Home
-----
A welcome screen with some text and a call to action to display the frameworks list.
There's, of course, a random item as a teaser.

List
-----
A view that lists the summary of the detail of each framework.
Each element has title, desc, link to the detail. Summary of rates.
Enable sorting, search.

Detail
-----
Each detail has title, desc, body, link to GitHub, individual reviews (with its rate, comment and author).

Submit
-----
Must be possible to add frameworks if authenticated.
Think using GitHub APIs.

Shared components
-----
Header with nav and active state.

- - - - - - - - - - - - - -

Todos
-----
1. Views interaction with dummy data to pull from (testing + routers)
2. Median rates 
3. View with editing capabilities (text + rates)
4. Integrate Relay + GraphQL
5. Persistence storage (API)
6. Authentication
7. Server-side rendering
8. Pagination
9. Redux/Redux-saga/Mobix
10. Styling + CSS