# NodeJS-FirstProgram
Trying it
cd .. (TO clear one folder from comamnd prompt)
cd .. 
to go C:


cd C:\Program Files\MongoDB\Server\3.4\bin

then run mongod (APPlication no need to add exe)

if there is no data dir exisit in C: drive make it using below code
then makedir (make dir \data\db)
then again run the mongod

then again open new cmd prompt 

go the the mongo db bin folder and run mongo

use sandbox (DB Name)
db.createCollection("test")
db.test.insert({"test" : 1})
db.test.find(())

npm install --save mongoose

npm install

npm start

"userEmail" : "mathan47@gmail.com", "userPassword" : "Mathan"


Set path in environment variable
C:\>npm config get prefix
C:\Users\username\AppData\Roaming\npm

C:\>set PATH=%PATH%;C:\Users\username\AppData\Roaming\npm;
