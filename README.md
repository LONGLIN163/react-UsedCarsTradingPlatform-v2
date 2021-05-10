
React_used car trading plantform 
===================================
This is a React based MERN project, It is a small vehicle trading platform , simulates more than 30 UX scenarios. Back-end are mongo and node. Front-end covers react(,webpack,redux,saga,dva), jquery, jqueryUI,antd,css/less etc.Focus on optimizing user experience by preload, asynchronous upload and real-time display. Increase visits and use efficiency on clientside by multiple filter techniques, creating backend database by form validation. User registers and submits personal information and uploads their product information.

### Connect to database 

Create an empty database, then open it:

```bash
mongod --dbpath "C:\coolcars"

```
Uninitialized data stored in a json file(init/cardata.json). We need to import this json data to mongo database:

```bash
mongoimport -d coolcars -c restaurants cars xxx/cardata.json --drop
```


### Build 

load node modules
```bash
npm install
```
set up webpack and build the project
```bash
npm install --save-dev webpack-cli 
npm install --save-dev webpack@4.42.0
webpack
```


### Run 

```bash
node app.js

```

