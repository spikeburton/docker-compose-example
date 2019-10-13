# Node.js and MongoDB example using docker-compose
To run the app:
1.  Clone this repo
1.  Run `docker-compose up --build`
1.  Open a shell in the mongo container:
    ```sh
    docker exec -it mongo bash
    mongo
    use test
    db.users.insert({ name: "Your Name", age: "Your Age" })
    ```
1.  Exit from the shell by typing `exit`
1.  Direct your browser to `http://localhost:3000`
