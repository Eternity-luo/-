var allShareCodes = [];
var removedShareCodes = [];
var chetou_number = process.env.CHETOU_NUMBER ? process.env.CHETOU_NUMBER : 0
var fair_mode = process.env.FAIR_MODE ? true : false
var precode_mode = process.env.PRECODE_MODE ? false : true

exports.ModCK = function(cks) {
    console.log(`您${fair_mode ? "有" : "没有"}设置雨露均沾模式。`)
    console.log(`您设置了${chetou_number}个车头。`)
    if (cks.length <= chetou_number || !fair_mode) {
        return cks
    }
    var sck = []
    var eck = []
    for (var i = 0; i < cks.length; i++) {
        if (i <= chetou_number - 1) {
            sck.push(cks[i])
        } else {
            eck.push(cks[i])
        }
    }
    eck.sort(function() {
        return Math.random() - 0.5;
    })
    console.log(`已对${eck.length}个ck做了随机处理。`)
    for (var i = 0; i < eck.length; i++) {
        sck.push(eck[i])
    }
    if (!precode_mode) {
        if (sck.length >= 2) {
            sck.push(sck[0])
        }
        if (sck.length >= 3) {
            sck.push(sck[1])
        }
        if (sck.length >= 4) {
            sck.push(sck[2])
        }
        if (sck.length >= 5) {
            sck.push(sck[3])
        }
        if (sck.length >= 6) {
            sck.push(sck[4])
        }
    }
    return sck
}

//var fenduan_number = process.env.FENDAUN_NUMBER ? process.env.FENDAUN_NUMBER : 0
var break_mode = process.env.BREAK_MODE ? true : false

exports.BreakCK = function(break_num,fenduan_number,cks) {
    console.log(`您${break_mode ? "有" : "没有"}设置CK分段模式。`)
    console.log(`您设置了${fenduan_number}个分段。`)
    if (cks.length <= fenduan_number || !break_mode) {
        return cks
    }
    var sck = []
	var start=0;
	var end = 0;
	
	if(break_num === 1)
	{
		start = 0;
	}
	else
	{
		start=(cks.length/fenduan_number)*(break_num-1)+1
		
	}
	if(break_num === fenduan_number)
	{
		end = cks.length
	}
	else
	{
		end=(cks.length/fenduan_number)*break_num;
	}
	start=parseInt(start)
	end=parseInt(end)
	console.log(`当前第${break_num}个分段,从${start} - ${end}`)
    for (var i = start; i < end; i++) {
            sck.push(cks[i])
    }
    return sck
}

exports.setDefaultShareCodes = function(str) {
    if (!str) {
        return
    }
    var shareCodes = str.split("@")
    console.log(`您提供了${shareCodes.length}个账号的助力码\n`);
    if (shareCodes && shareCodes.length) {
        for (var shareCode of shareCodes) {
            if (shareCode && shareCode != "undefined" && allShareCodes.indexOf(shareCode) == -1) {
                allShareCodes.push(shareCode)
            }
        }
    }
}

exports.addShareCode = function(shareCode) {
    if (shareCode && allShareCodes.indexOf(shareCode) == -1) {
        allShareCodes.push(shareCode)
    }
}

exports.removeShareCode = function(shareCode) {
    removedShareCodes.push(shareCode)
}

exports.forEachShareCode = function(func) {
    for (var shareCode of allShareCodes) {
        if (removedShareCodes.indexOf(shareCode) == -1) {
            if (func(shareCode)) {
                break
            }
        }
    }
}

exports.getShareCodes = function() {
    var shareCodes = []
    for (var shareCode of allShareCodes) {
        if (removedShareCodes.indexOf(shareCode) == -1) {
            shareCodes.push(shareCode)
        }
    }
    return shareCodes
}

exports.getAllShareCodes = function() {
    return allShareCodes
}