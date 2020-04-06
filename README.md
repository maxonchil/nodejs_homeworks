# How to set up and launch my 'semi-uber' *(NodeJS homework#3)* project
\(All project is in > nodejs_homeworks >> homework3 >>>semi-uber)

1. Create account at service [Cloudinary](https://cloudinary.com/) for upload and download user profile photo

2. ```git clone https://github.com/maxonchil/nodejs_homeworks.git ```

3. In folder **Server** of **semi-uber** use  ```npm i```

4. At file **default.json** set up your settings of your environment

specifically:
  - At *webServer* - set your local port and host to run a project
  - At *dataBase* - set your local port,name\(of db),host
  - At *JWT* - set you secret word to sign and verify token
  - At *cloudinary* - set your personal settings of cloundinary accout
  - At *nodemailer* - choose and set the service of your mailbox, default subject of letter and also your login and password of email account 
  - At *saltRounds* - choose appropriate number of salt rounds to hash user password

5.In file **environment.ts** \(Folder **UI/environment** of **semi-uber** ) - set your local host to run Angular app

6. In folder \(terminal) **Server** print -  ```npm start```

7. In folder \(terminal) UI print - ```ng serve``` \(*your node version should be >=12.0*)
