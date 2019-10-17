var express = require('express');//เรียกใช้งาน express
var app = express();//สร้าง object ที่ชื่อว่า app
var fs = require("fs");//อ่านไฟล์ user.json //ใช้ http methot ดูข้อมูลว่ามีใครบ้าง

//GET method ดึงข้อมูลของ user มาทั้งหมด
app.get('/getUsers', function(req,res){ //ทำก่อน get ข้อมูลผ่าน /getUsers
    fs.readFile( __dirname + "/" + "user.json",'utf8',function(err,data)//เข้ารหัสผ่าน utf8
    {
        console.log( data );// data ก้อนข้อมูลของ user
        res.end( data);// ส่งข้อมูลกลับ let spont
    });
});

//GET method ดึงข้อมูลของ user แบบมีเงื้อนไข //เช่น 2 = users["user2"]
app.get('/getUsers/:id', function(req,res){ //ทำก่อน get ข้อมูลผ่าน /getUsers
    fs.readFile( __dirname + "/" + "user.json",'utf8',function(err,data)//เข้ารหัสผ่าน utf8 //err ไว้ตรวจสอบว่ามีอะไรพิดพลาดหรือเปร่า
    {
        var users = JSON.parse(data);//แปลงข้อมูลให้เป็นก้อน ผู้ใช้ทั้งหมดเลยยย
        var user = users["user" + req.params.id]//เพิ่มเงื่อนไข
        console.log( user );// data ก้อนข้อมูลของ user
        res.end(JSON.stringify(user));// ส่งข้อมูลกลับ let spont โดยรูปแบบ JSON แบบ string
    });
});

//เช่น 3 = users["user3"]
app.delete('/delUser/:index', function(req,res){ //ทำก่อน get ข้อมูลผ่าน /getUsers
    fs.readFile( __dirname + "/" + "user.json",'utf8',function(err,data)//เข้ารหัสผ่าน utf8 //err ไว้ตรวจสอบว่ามีอะไรพิดพลาดหรือเปร่า
    {
        data = JSON.parse(data);//แปลงข้อมูลให้เป็นก้อน ผู้ใช้ทั้งหมดเลยยย
        delete data["user" + req.params.index]//ลบข้อมูล
        res.end(JSON.stringify(data));//update ใหม่// ส่งข้อมูลกลับ let spont โดยรูปแบบ JSON แบบ string
    });
});

/////////////////////////////// POST DATA ///////////////////////////////////////////
var user =
{
    "user4":{
        "name" : "maroom5",
        "password" : "7777",
        "occupation" : "singer",
        "id": 4
    }
}

app.post('/addUser', function(req,res) { //ทำก่อน get ข้อมูลผ่าน /getUsers
    fs.readFile( __dirname + "/" + "user.json",'utf8',function(err,data)//เข้ารหัสผ่าน utf8 //err ไว้ตรวจสอบว่ามีอะไรพิดพลาดหรือเปร่า
    {
        data = JSON.parse(data);//
        data["user4"]=user["user4"];//เพิ่มข้อมูลใหม่เข้าไปต่อข้อมูลเดิม
        console.log( data );// data ก้อนข้อมูลของ user ที่ update มาใหม่
        res.end(JSON.stringify(data));// ส่งข้อมูลกลับ let spont โดยรูปแบบ JSON แบบ string
    });
});

//////////////////////////////// Accept http method ///////////////////////////////////////////// 

var server = app.listen(8081, function()//นำ object ของ app มา import ผ่าน 8081
{
    var host = server.address().address //
    var port = server.address().port
    console.log("Application Run At http://%s:%s", host, port)
});

