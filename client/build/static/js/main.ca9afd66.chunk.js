(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{19:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),c=a(14),r=a.n(c),i=a(4),o=(a(19),a(3)),l=a.n(o),u=a(0);var d=function(e){var t=e.playMove,a=(e.leaveGame,e.setShowRules);return Object(u.jsxs)("div",{id:"play-buttons",children:[Object(u.jsx)("button",{onClick:function(){t("hit")},children:"HIT"}),Object(u.jsx)("button",{onClick:function(){t("stand")},children:"STAND"}),Object(u.jsx)("button",{className:"how-to-play",onClick:function(){a(!0)},children:"HOW TO PLAY"})]})};var j=function(e){var t=e.startGame,a=e.leaveGame,n=e.joinGame;return Object(u.jsxs)("div",{id:"menu-buttons",children:[Object(u.jsx)("button",{onClick:n,children:"JOIN GAME"}),Object(u.jsx)("button",{onClick:t,children:"START GAME"}),Object(u.jsx)("button",{className:"leave-game",onClick:a,children:"LEAVE GAME"})]})};var m=function(e){var t=e.setCurrentView,a=e.setUsername;return Object(u.jsx)("div",{id:"set-user",children:Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),t("join-create"),console.log(e.target[0].value),a(e.target[0].value),console.log("submit pressed")},children:[Object(u.jsxs)("label",{children:["Username:",Object(u.jsx)("input",{type:"text",name:"username"})]}),Object(u.jsx)("input",{type:"submit",value:"Submit"})]})})};var b=function(e){var t=e.findGame,a=e.createGame,n=function(e){e.preventDefault(),console.log(e.target[0].value),console.log(e.target.name),console.log(e),"create"===e.target.name&&a(e.target[0].value),"find"===e.target.name&&t(e.target[0].value)};return Object(u.jsxs)("div",{id:"join-create",children:[Object(u.jsxs)("form",{name:"create",onSubmit:n,children:[Object(u.jsxs)("label",{children:["Create New Game:",Object(u.jsx)("input",{type:"text",name:"username"})]}),Object(u.jsx)("input",{type:"submit",value:"Submit"})]}),Object(u.jsxs)("form",{name:"find",onSubmit:n,children:[Object(u.jsxs)("label",{children:["Find Existing Game:",Object(u.jsx)("input",{type:"text",name:"username"})]}),Object(u.jsx)("input",{type:"submit",value:"Submit"})]})]})};var h=function(e){var t=e.hands,a=e.idx,n=e.players,s=e.isHighlighted,c=n[a],r=!(void 0===c);console.log(c,r);var i=c.wins,o=c.losses,l=c.user_id,d=t[a+1],j=function(e){var t="";if("hidden"===e)t="XX";else{t=e.slice(0,-1);var a=e.slice(-1);"AD"===(t=t+=["S","C","D","H"][["\u2660","\u2663","\u2666","\u2665"].indexOf(a)])&&(t="aceDiamonds")}var n="../images/".concat(t,".png");return console.log(n),Object(u.jsx)("img",{className:"card",src:n,alt:"card"})};return Object(u.jsxs)("div",{className:"player-box-container",children:[s&&Object(u.jsxs)("div",{className:"player-box highlighted",children:[Object(u.jsxs)("span",{className:"user_id",children:["Player: ",l]}),Object(u.jsx)("span",{className:"cards",children:null===d||void 0===d?void 0:d.map(j)}),Object(u.jsxs)("span",{className:"win-loss",children:["Wins: ",i,"Losses: ",o]}),Object(u.jsxs)("i",{children:["It is ",l,"'s turn"]})]}),!s&&Object(u.jsxs)("div",{className:"player-box",children:[Object(u.jsxs)("span",{className:"user_id",children:["Player: ",l]}),Object(u.jsx)("span",{className:"cards",children:null===d||void 0===d?void 0:d.map(j)}),Object(u.jsxs)("span",{className:"wins",children:["Wins: ",i]}),Object(u.jsxs)("span",{className:"losses",children:["Losses: ",o]})]})]})};var g=function(e){var t=e.hands;return Object(u.jsx)("div",{id:"dealer",children:t[0]&&Object(u.jsxs)(u.Fragment,{children:["DEALER: ",t[0].map((function(e){var t="";if("hidden"===e)t="XX";else{t=e.slice(0,-1);var a=e.slice(-1);t=t+=["S","C","D","H"][["\u2660","\u2663","\u2666","\u2665"].indexOf(a)]}var n="../images/".concat(t,".png");return console.log(n),Object(u.jsx)("img",{className:"card",src:n,alt:"card"})}))]})})};var v=function(e){var t=e.gameState,a=e.findGame,s=(t.started,t.hands),c=t.players,r=t.game_id;return t.current_turn,Object(n.useEffect)((function(){setInterval((function(){a(r)}),4e3)}),[]),Object(u.jsxs)("div",{id:"game",children:[Object(u.jsx)(g,{hands:s}),Object(u.jsx)("div",{id:"players",children:c.map((function(e,a){return Object(u.jsx)(h,{hands:s,players:c,idx:a,isHighlighted:a===t.current_turn})}))})]})};var p=function(e){var t=e.username,a=e.currentView,n=e.setCurrentView,s=e.setUsername,c=e.gameState,r=e.findGame,i=e.gameId,o=e.createGame,l=e.joinGame;return Object(u.jsxs)("div",{id:"table",children:["Currently logged in as: ",t,Object(u.jsx)("br",{}),"TABLE VIEW: ",a,Object(u.jsx)("br",{}),"Game ID: ",i,Object(u.jsx)("br",{}),"set-user"===e.currentView&&Object(u.jsx)(m,{setCurrentView:n,setUsername:s}),"join-create"===e.currentView&&Object(u.jsx)(b,{findGame:r,createGame:o,joinGame:l}),"game"===e.currentView&&Object(u.jsx)(v,{gameState:c,findGame:r})]})};var O=function(e){var t=e.onCloseRequest,a=e.children;return Object(u.jsxs)("div",{className:"modal-overlay",children:[Object(u.jsx)("button",{type:"button",className:"close-button",onClick:t,children:"X"}),Object(u.jsx)("div",{className:"modal-content",children:a})]})},x=['1. Set a username by enter it into the provided box and hit "Submit"',"2. Create a new game or find an existing one by typing the game ID into the appropriate box",'2.5. After finding an existing game, hit "Join Game" to actually join as a player','3. If the game isn\'t started, press "Start Game" to initialize the game',"4. On your turn, you can choose to Hit or Stand. The goal is to reach 21 or higher without going over (i.e. going bust).   Numerical cards are worth their face value. Face cards are worth 10. Aces are worth 1 or 11, depending on preference. If you go   bust, your turn is over and you automatically lose.","5. Once everyone has gone, the dealer will automatically play until their hand value is 17 or greater, and then wins/losses will be evaluated.",'6. Once the game is over, you can press the "Start Game" button to start a new game','7. Hit "Leave Game" to leave a game lobby. When all active players leave a game, that lobby will be closed.',"NOTE: After leaving a game, it is recommended to refresh or close the page."];var f=function(){var e="18.118.84.134",t=Object(n.useState)("set-user"),a=Object(i.a)(t,2),s=a[0],c=a[1],r=Object(n.useState)(!1),o=Object(i.a)(r,2),m=o[0],b=o[1],h=Object(n.useState)(""),g=Object(i.a)(h,2),v=g[0],f=g[1],y=Object(n.useState)(""),w=Object(i.a)(y,2),G=w[0],S=w[1],N=Object(n.useState)({players:[],hands:[[]],current_turn:0}),C=Object(i.a)(N,2),_=C[0],A=C[1],E=function(t){l()({method:"post",url:"http://".concat(e,"/api/games/join"),data:{game_id:G,user_id:v}}).then((function(e){console.log(e),c("game"),A(e.data)})).catch((function(e){console.error(e)}))},I=function(){l()({method:"delete",url:"http://".concat(e,"/api/games/leave"),data:{game_id:G,user_id:v}}).then((function(e){console.log(e),c("join-create"),S("")})).catch((function(e){console.error(e)}))};return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("b",{children:"Play Blackjack"})," with a group of up to 4 players online! ",Object(u.jsx)("br",{}),"Click ",Object(u.jsx)("b",{children:"How to Play"})," below for instructions for using this page.",m&&Object(u.jsxs)(O,{onCloseRequest:function(){b(!1)},children:[" ",x.map((function(e){return Object(u.jsx)("div",{className:"rule-line",children:e})}))," "]}),Object(u.jsx)(j,{startGame:function(){l()({method:"post",url:"http://".concat(e,"/api/games/start"),data:{game_id:G}}).then((function(e){console.log(e),A(e.data)})).catch((function(e){console.error(e)}))},leaveGame:I,joinGame:E}),Object(u.jsx)(p,{gameId:G,username:v,currentView:s,setCurrentView:c,setUsername:f,gameState:_,findGame:function(t){var a=t;void 0==t&&(a=G),l()({method:"get",url:"http://".concat(e,"/api/games/state"),headers:{game_id:a}}).then((function(e){console.log(e),S(a),c("game"),A(e.data)})).catch((function(e){console.error(e)}))},createGame:function(t){l()({method:"post",url:"http://".concat(e,"/api/games/create"),data:{game_id:t,user_id:v}}).then((function(e){console.log(e),S(t),c("game"),A(e.data)})).catch((function(e){console.error(e)}))},joinGame:E}),Object(u.jsx)(d,{playMove:function(t){l()({method:"put",url:"http://".concat(e,"/api/games/move"),data:{game_id:G,user_id:v,move:t}}).then((function(e){console.log(e),A(e.data)})).catch((function(e){console.error(e)}))},leaveGame:I,setShowRules:b})]})},y=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,40)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),n(e),s(e),c(e),r(e)}))};r.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(f,{})}),document.getElementById("root")),y()}},[[39,1,2]]]);
//# sourceMappingURL=main.ca9afd66.chunk.js.map