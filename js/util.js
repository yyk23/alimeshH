function hex2a  (hexx)  {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; (i < hex.length); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str.toString(2);
}
function methodNoTimeout  (methodName, params, success, failMsg) {
    window.WindVane.call('WVBluetooth',methodName,params,success,function (e) {
        weui.alert(failMsg+JSON.stringify(e));
    })
}
function getBtState  ()  {
        methodNoTimeout('requestAuthorization',{},function (e) {
            var state = e.state.toString();
            switch (state){
                case 'unsupported':
                    weui.alert('此手机不支持蓝牙', function(){ window.WindVane.call('AppModel','goBack',{}) });
                    return false;
                    break;
                case 'unauthorized':
                    weui.alert('没有手机蓝牙权限', function(){ window.WindVane.call('AppModel','goBack',{}) });
                    return false;
                    break;
                case 'poweredOff':
                    weui.alert('请检查手机蓝牙是否开启', function(){ window.WindVane.call('AppModel','goBack',{}) });
                    return false;
                    break;
                case 'poweredOn':
                    console.log("蓝牙已开启");
                    setTimeout(function () {
                         scanDevice();
                    },100);
                    break;
                case 'unknown':
                    weui.alert('这个设备的蓝牙状态未知', function(){ window.WindVane.call('AppModel','goBack',{}) });
                    return false;
                    break;
                default :
                    break
            }
        },"获取蓝牙权限失败");
}
function  base64ToBase16 (base64) {
    return window.atob(base64)
        .split('')
        .map(function (char) {
            return ('0' + char.charCodeAt(0).toString(16)).slice(-2);
        }).join('').toUpperCase();
}
function int2HexStr  (data)  {
    var first = "";
    var second = "";
    if (data / 16 < 10) {
        first = "" + Math.floor(data / 16);
    } else {
        switch (Math.floor(data / 16)) {
            case 10:
                first = "A";
                break;
            case 11:
                first = "B";
                break;
            case 12:
                first = "C";
                break;
            case 13:
                first = "D";
                break;
            case 14:
                first = "E";
                break;
            case 15:
                first = "F";
                break;
        }
    }
    if ((data % 16) < 10) {
        second = "" + (data % 16);
    } else {
        switch (data % 16) {
            case 10:
                second = "A";
                break;
            case 11:
                second = "B";
                break;
            case 12:
                second = "C";
                break;
            case 13:
                second = "D";
                break;
            case 14:
                second = "E";
                break;
            case 15:
                second = "F";
                break;
        }
    }
    return first + second;
}
function hex2dec (str)  {
    var result = "";
    var i = 0;
    var length = str.length;
    var temp = "";
    while (i < length) {
        temp = parseInt(str.substring(i, i + 2), 16).toString();
        result += temp;
        i += 2;
    }
    return result;
}
function dec2hex(data){
    var result = "";
    result = data.toString(16).toLocaleUpperCase();
    if(result.length == 1){
        result="000"+result;
    }else if(result.length == 2){
        result="00"+result;
    }else if(result.length == 3){
        result="0"+result;
    }
    return result;
}