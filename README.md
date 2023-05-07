## 1. Init project

<span style="color: yellow">npm init</span>

## 2. Install DotEnv | Express | Sequelize for Postgres DB | JsonWebToken | Validator Express

<ul>
    <li style="color: yellow">npm install dotenv</li>
    <li style="color: yellow">npm install -g express sequelize pg pg-hstore cors --save</li>
    <li style="color: yellow">npm install jsonwebtoken</li>
    <li style="color: yellow">npm install --save express-validator</li>
    <li style="color: yellow">npm install i18n --save</li>
</ul>

## 3. Tools
<ul>
    <li>1. Express is for building the Rest apis</li>
    <li>2. CORS provides Express middleware to enable CORS with various options.</li>
</ul>
## 4. Install Sequelize Auto Package

<span style="color: yellow">npm install -g sequelize-auto</span>

## 5. Auto Generate Model

<span style="color: yellow">node export_models.js</span>

1. Reference Lib: https://github.com/sequelize/sequelize-auto
2. Reference Source: https://github.com/sequelize/sequelize-auto/blob/master/sample/export.js

## 6. How to run?

<span style="color: yellow">node server.js</span>

### Test API

1. Find http://localhost:8080/api/teachers?teacherName=test

### Reference

<ul>
    <li><span style="color: green">Article: </span> https://www.bezkoder.com/node-express-sequelize-postgresql/ </li>
    <li><span style="color: green">AUTH: </span>https://github.com/MoathShraim/Nodejs-rest-api-project-structure-Express/tree/master/controllers</li>
    <li><span style="color: green">Project Structure: </span>https://www.codemzy.com/blog/nodejs-file-folder-structure</li>
    <li>https://www.freecodecamp.org/news/build-web-apis-with-nestjs-beginners-guide/</li>
    <li>https://github.com/RajaJaganathan/express-error-handling/blob/master/src/lib/api/error/applicationError.js</li>
</ul>
### Project Structure

app/

1. models -> Database models (Table)
1. controller -> Receive request from client and call service here
1. routers -> Mapping url to controller
1. services -> Interative with models layer (database layer)
1. subscribers -> handle async event
1. config -> environment configuration


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