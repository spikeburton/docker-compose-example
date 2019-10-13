const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;
const url = `mongodb://${
  NODE_ENV === 'production' ? 'mongo' : 'localhost'
}:27017`;
const dbName = 'test';

const getUsers = cb => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return client.close();
    }
    console.log('Successfully connected to MongoDB');

    const db = client.db(dbName);
    db.collection('users')
      .find({})
      .toArray((err, data) => {
        cb(err, data);

        client.close();
      });
  });
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    getUsers((err, users) => {
      if (err) {
        console.error(err);
        res.end(`<h1>ERROR</h1>`);
      }

      const listUsers = () => {
        const items = users.map(user => {
          return `
          <li>
            <h2>USER</h2>
            <ul>
              <li>Name: ${user.name}</li>
              <li>Age: ${user.age}</li>
            </ul>
          </li>
          `;
        });
        return `
        <ul>${items.join('')}</ul>
        `;
      };

      res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Document</title>
      </head>
      <body>
        <h1>All Users</h1>
        ${listUsers()}
      </body>
      </html>
      `);
    });
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
