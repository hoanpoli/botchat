//***********************************
//*			Install Modules			*
//*---------------------------------*
//*		Install with command		*
//*									*
//* npm install request				*
//* npm install facebook-chat-api	*
//*									*
//***********************************
// Facebook Chat API By Schmavery
// Git_URL: https://github.com/Schmavery/facebook-chat-api
// Code: Trunghieuth10 - trunghieuth10@gmail.com

// Khai báo
var request = require("request");
var login = require("facebook-chat-api");
var SimsimiAnswered;
var text;
var botkey = "http://www.simsimi.com/getRealtimeReq?uuid=UwmPMKoqosEETKleXWGOJ6lynN1TQq18wwvrmCy6IRt&lc=vn&ft=0&reqText=";
login({
        email: "01688698156",
        password: "Hoanyeuanh28082017"
    },
    function callback(err, api) {
        console.log(api);

        if (err) return console.error(err);

        api.setOptions({ forceLogin: true, selfListen: false, logLevel: "silent" });

        api.listen(function callback(err, message) {
            console.log(message.senderID)
            if (message.body === "thôi" || message.body === "Thôi") {
                api.sendMessage(";) Ok bạn biệt.", message.threadID);
                api.markAsRead(message.threadID);
                return api.logout(err);
            }
            if (message.body === "Getid" || message.body === "getid" || message.body === "get id" || message.body === "Get id") {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Your ID: ", message.threadID);
                api.sendMessage(message.senderID, message.threadID);
                api.markAsRead(message.threadID);
                console.log("Sender ID: " + message.senderID);
            } else if (message.body.match(/.*fb.*/) || message.body.match(/.*face.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Link fb t đây: https://facebook.com/hoanpoli", message.threadID);
                return;
            } else if (message.body.match(/.*abc.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("SĐT mới của tôi là: 0522533196", message.threadID);
                return;
                return;
            } else if (message.body.match(/.*Duy.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Chào Duy, Duy Duy cái cc :v", message.threadID);
                return;
            } else if (message.body.match(/.*dm.*/) || message.body.match(/.*vl.*/) || message.body.match(/.*vcl.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Không chửi bậy nha bạn .", message.threadID);
                return;
            } else if (message.body.match(/.*cc.*/) || message.body.match(/.*đm.*/) || message.body.match(/.*Cc.*/) || message.body.match(/.*Đm.*/) || message.body.match(/.*Vcl.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Thôi nào, đừng chửi bậy bạn.", message.threadID);
                return;
            } else if (message.body.indexOf("stop") === 0 || message.body.indexOf("Stop") === 0) {
                api.sendMessage(";) Ok bạn biệt.", message.threadID);
                return;
            } else if (message.senderID === "100015133422944") {
                if (message.body.match(/.*Hoan.*/) || message.body.match(/.*hoan.*/))
                    api.sendMessage("E gọi tên anh kìa , e thích a rồi phải không? =) ", message.threadID);
                return;
            } else if (message.senderID === "100006692358793") {
                api.sendMessage("Tùng im mồm , đ,m", message.threadID);
                return;
            } else if (message.senderID === "100016566122042") {
                api.sendMessage("Duy im mồm ", message.threadID);
                return;
            } else if (message.body.match(/.*Hoan.*/)) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                api.sendMessage("Chào bạn, mình đang bận ^^~ sẽ trả lời bạn ngay khi đọc được tin nhắn nhé. Vui lòng không nhắn thêm ^^", message.threadID);
                return;
            } else if (message.body) {
                console.log("FormID: " + message.threadID + '->Message: ' + message.body);
                request(botkey + encodeURI(message.body),
                    function(error, response, body) {
                        if (error) api.sendMessage("Tao đang đơ, không trả lời được :)", message.threadID);
                        if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("respSentence") < 0)
                            api.sendMessage("Tôi đang bận, trả lời bạn sau nhé !!");
                        else api.sendMessage("Tôi đang bận, trả lời bạn sau nhé !!");
                        text = JSON.parse(body);
                        if (text.status == "200") {
                            SimsimiAnswered = text.respSentence;
                            if (message.body === text.respSentence) {
                                return;
                            } else
                                SimsimiAnswered = text.respSentence;
                            api.markAsRead(message.threadID);
                            console.log("Answered:" + SimsimiAnswered);
                        }
                    });
            }
        });
    })