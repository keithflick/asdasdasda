$('#tutorial').hide();
MBob = {};
MBob.bestxy = 99999;
MBob.run = 0;
MBob.id = 0;
MBob.blok = "";
MBob.xxxx = 0;
MBob.blokuj = 1;
MBob.checker = 0;
MBob.checker2 = 0;
MBob.interv1 = "";
MBob.interv2 = "";
MBob.interv3 = "";
mAlert = function(a, c, d, b) {};
g.lock.add = function(i) {};
$('<div id="MBob_config">').css({
    position: "absolute",
    left: -148,
    top: -7,
    width: 199,
    height: 100,
    border: "1px gold solid",
    color: "black",
    "background-color": "aqua",
    "font-size": "10px",
}).appendTo("#centerbox2");
MBob_config.innerHTML = '<center><input id="MBob_nazpotwor" placeholder="Nazwy potworów" value="Dżin, Chodzące truchło, Mumia wysokiego kapłana, Pradawna mumia">';
MBob_config.innerHTML = MBob_config.innerHTML + '<br/><br/><center><button onclick="MBob.start1()">START BOT</button>';
MBob_config.innerHTML = MBob_config.innerHTML + '<br/><center><button onclick="MBob.stop1()">STOP BOT</button>';
MBob.drop = function() {
    //if (dropneut.checked == true && (g.bags[0][0] - g.bags[0][1] <= 2)) {
    //    for (var i in g.item) {
    //        if (g.item[i].cl == 15 && g.item[i].pr <= MBob_maxdrop.value) {
    //            _g('moveitem&st=-2&id=' + i);
    //            $('#dropmenu').fadeOut();
    //           break;
    //        }
    //    }
    //}
};
MBob.heal = function() {
    for (var i in g.item) {
        if (g.item[i].cl == 16 && hero.hp <= hero.maxhp * Number(MBob_healerhp.value) / 100 && MBob_healerhp.value != "") {
            $("#item" + i).dblclick();
        }
    }
};
MBob.rel = function() {
    var sukces = false;
    for (var i in g.item) {
        itemek = $("#item" + i);
        if (g.item[i].cl == 21 && itemek.css("top") == "183px" && itemek.css("left") == "92px") {
            var stat = g.item[i].stat;
            var name = g.item[i].name;
            var id = g.item[i].id;
            sukces = true;
            break;
        }
    }
    if (sukces) {
        var nrilosc = stat.indexOf("ammo");
        var ilosc = 51;
        if (nrilosc != -1) {
            ilosc = stat.slice(nrilosc + 5, nrilosc + 9);
            ilosc = parseInt(ilosc);
        }
        if (ilosc < 50) {
            for (var i in g.item) {
                if (name == g.item[i].name && id != g.item[i].id) {
                    _g("moveitem&st=1&id=" + g.item[i].id);
                    break;
                }
            }
        }
    }
};
hero.MBobgo = function(y, w) {
    var x = [],
        t = (hero.opt & 128) ? 8 : 20;
    var l = Math.max(0, Math.min(y, this.x) - t),
        h = Math.min(map.x - 1, Math.max(y, this.x) + t);
    var v = Math.max(0, Math.min(w, this.y) - t),
        u = Math.min(map.y - 1, Math.max(w, this.y) + t);
    for (var q = l - 1; q <= h + 1; q++) {
        x[q] = [];
        for (var p = v - 1; p <= u + 1; p++) {
            x[q][p] = (q >= l && q <= h && p >= v && p <= u && !isset(g.npccol[q + p * 256]) && (!map.col || map.col.charAt(q + p * map.x) == "0")) ? -1 : -2
        }
    }
    x[this.x][this.y] = 0;
    b = -1;
    road = [];
    var s = {
        x: -1,
        y: -1,
        dist: 599
    };
    for (var r = 1; r < h - l + u - v + 3; r++) {
        for (var q = l; q <= h; q++) {
            for (var p = v; p <= u; p++) {
                if (x[q][p] == -1 && ((x[q][p - 1] == r - 1) || (x[q][p + 1] == r - 1) || (x[q - 1][p] == r - 1) || (x[q + 1][p] == r - 1))) {
                    x[q][p] = r
                }
                if (x[y][w] > 0) {
                    q = h + 1;
                    break
                }
                s.dist2 = Math.abs(y - q) + Math.abs(w - p);
                if ((x[q][p] == r) && (s.dist2 < s.dist)) {
                    s.x = q;
                    s.y = p;
                    s.dist = s.dist2
                }
            }
        }
    }
    s.hdist = Math.abs(y - hero.x) + Math.abs(w - hero.y);
    if (x[y][w] > 0 || s.dist < s.hdist) {
        if (x[y][w] < 0) {
            if (y > s.x) {
                b = 2
            } else {
                if (y < s.x) {
                    b = 1
                } else {
                    if (w > s.y) {
                        b = 0
                    } else {
                        if (w < s.y) {
                            b = 3
                        }
                    }
                }
            }
            y = s.x;
            w = s.y;
        }
        road[0] = {
            x: y,
            y: w
        };
        for (var o = x[y][w] - 1, n = y, m = w; o > 0; o--) {
            if (x[n][m - 1] == o) {
                m--
            } else {
                if (x[n][m + 1] == o) {
                    m++
                } else {
                    if (x[n - 1][m] == o) {
                        n--
                    } else {
                        if (x[n + 1][m] == o) {
                            n++
                        } else {
                            o = 0
                        }
                    }
                }
            }
            if (o) {
                road[x[y][w] - o] = {
                    x: n,
                    y: m
                }
            }
        }
    }
    if (road.length > 1 && g.playerCatcher.follow == null) {
        $("#target").stop().css({
            left: y * 32,
            top: w * 32,
            display: "block",
            opacity: 1
        }).fadeOut(1000)
    }
};
var tmpBattleMsg = battleMsg;
battleMsg = function(c, t) {
    MBob.run = 0;
    var ret = tmpBattleMsg(c, t);
    if (c.search(/winner=/) >= 0) {
        
        setTimeout(function() {
            _g("fight&a=quit");
            $('#loots_button').click();
        MBob.drop();
        MBob.rel();
        MBob.heal();
        MBob.run = 0;
        }, 500)
        
    }
    return ret;
};
MBob.func1 = function() {
    if (MBob.run == 0) {
        hero.nextx = '';
        hero.nexty = '';
        MBob.bestxy = 999999;
        for (var i in g.npc) {
            if (MBob_nazpotwor.value.search(g.npc[i].nick) != -1 && MBob.blok.search(i) == -1 && (g.npc[i].type == 2 || g.npc[i].type == 3)) {
                x1 = Math.pow(Math.abs(hero.x - g.npc[i].x), 2);
                y1 = Math.pow(Math.abs(hero.y - g.npc[i].y), 2);
                MBob.bestxy1 = Math.sqrt(x1) + Math.sqrt(y1);
                if (MBob.bestxy1 < MBob.bestxy) {
                    MBob.bestxy = MBob.bestxy1;
                    hero.nextx = g.npc[i].x;
                    hero.nexty = g.npc[i].y;
                    MBob.id = i;
                    MBob.run = 1;
                    MBob.blokuj = 0;
                };
            };
        };
        if (hero.nextx != '' && hero.nexty != '') {
            g.stop = false;
            hero.MBobgo(hero.nextx, hero.nexty);
        }
    }
};
MBob.func2 = function() {
    if (road.length == 0 && MBob.blokuj == 0) {
        if ((Math.abs(hero.rx - g.npc[MBob.id].x) <= 1 && Math.abs(hero.ry - g.npc[MBob.id].y) <= 1) && (g.npc[MBob.id].type == 2 || g.npc[MBob.id].type == 3)) {
            MBob.blokuj = 1;
            _g("fight&a=attack&ff=1&id=-" + MBob.id);
        } else {
            if (MBob.checker2 == 2) {
                MBob.blokuj = 1;
                MBob.blok = MBob.blok + "|" + MBob.id;
                MBob.run = 0;
                MBob.checker2 = 0;
            } else if (MBob.checker2 != 2) {
                MBob.checker2++;
            }
        }
    }
};
MBob.Cum = function() {
    alert("Bot stworzony przez Piootrek G")
};

MBob.func3 = function() {
    if (road.length == 0) {
        if (MBob.checker < 60) {
            MBob.checker++;
        } else if (MBob.checker >= 60) {
            MBob.run = 0;
            MBob.checker = 0;
        }
    } else {
        MBob.checker = 0;
    }
};

MBob.start1 = function() {
    MBob.interv1 = setInterval(MBob.func1, 600);
    MBob.interv2 = setInterval(MBob.func2, 400);
    MBob.interv3 = setInterval(MBob.func3, 100);
};

MBob.stop1 = function() {
    clearInterval(MBob.interv1);
    clearInterval(MBob.interv2);
    clearInterval(MBob.interv3);
    MBob.bestxy = 9999;
    MBob.run = 0;
    MBob.id = 0;
    MBob.blok = "";
    MBob.xxxx = 0;
    MBob.blokuj = 1;
    MBob.checker = 0;
    MBob.checker2 = 0;
    MBob.interv1 = "";
    MBob.interv2 = "";
    MBob.interv3 = "";
    alert("BOT ZATRZYMANY")
};

setInterval(function() {
    MBob.blok = "";
}, 30000)

MBob.start1();