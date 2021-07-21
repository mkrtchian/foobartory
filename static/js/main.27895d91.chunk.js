(this.webpackJsonpfoobartory=this.webpackJsonpfoobartory||[]).push([[0],{50:function(t,e,n){},51:function(t,e,n){"use strict";n.r(e);var o,i=n(1),a=n.n(i),r=n(34),s=n.n(r),c=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,74)).then((function(e){var n=e.getCLS,o=e.getFID,i=e.getFCP,a=e.getLCP,r=e.getTTFB;n(t),o(t),i(t),a(t),r(t)}))},u=n(5),h=n(6),l=n(9),b=n(10),m=function(){function t(){Object(l.a)(this,t)}return Object(b.a)(t,[{key:"getCurrentTime",value:function(){return Date.now()}}]),t}(),d=n(11);!function(t){t.MOVING="moving",t.MINING_FOO="mining foo",t.MINING_BAR="mining bar",t.ASSEMBLING="assembling",t.BUYING_ROBOT="buying robot",t.WAITING="waiting"}(o||(o={}));var f,O={actionType:o.MOVING,totalDuration:5e3},g={actionType:o.MINING_FOO,totalDuration:1e3},v={actionType:o.MINING_BAR,randomBetween:[500,2e3]},A={actionType:o.ASSEMBLING,totalDuration:2e3},j={actionType:o.BUYING_ROBOT,totalDuration:0},y={actionType:o.WAITING,totalDuration:0},p={foos:1,bars:1,foobars:0},k={foos:6,bars:0,foobars:3},w=n(23),T=n(25),x=function(){function t(){Object(l.a)(this,t),this.callbacks=void 0,this.callbacks=new Map}return Object(b.a)(t,[{key:"subscribe",value:function(t,e){var n;null===(n=this.callbacks.get(t))||void 0===n||n.push(e)}},{key:"trigger",value:function(t,e){var n=this.callbacks.get(t);n&&n.forEach((function(t){t(e)}))}}]),t}();!function(t){t[t.ROBOT_LOCATION=0]="ROBOT_LOCATION"}(f||(f={}));var _,N=function(t){Object(w.a)(n,t);var e=Object(T.a)(n);function n(){var t;return Object(l.a)(this,n),(t=e.call(this)).callbacks.set(f.ROBOT_LOCATION,[]),t}return n}(x);!function(t){t[t.FOOS_AMOUNT=0]="FOOS_AMOUNT",t[t.BARS_AMOUNT=1]="BARS_AMOUNT",t[t.FOOBARS_AMOUNT=2]="FOOBARS_AMOUNT",t[t.ROBOTS_AMOUNT=3]="ROBOTS_AMOUNT"}(_||(_={}));var M,S=function(t){Object(w.a)(n,t);var e=Object(T.a)(n);function n(){var t;return Object(l.a)(this,n),(t=e.call(this)).callbacks.set(_.FOOS_AMOUNT,[]),t.callbacks.set(_.BARS_AMOUNT,[]),t.callbacks.set(_.FOOBARS_AMOUNT,[]),t.callbacks.set(_.ROBOTS_AMOUNT,[]),t}return n}(x),B=n(13),L=n(35),R=function(){function t(){Object(l.a)(this,t)}return Object(b.a)(t,[{key:"randomPercentageSuccess",value:function(t){if(t<0||t>100)throw new Error("The given percentage has to be between 0 and 100, not ".concat(t,"."));return 100*Math.random()<t}},{key:"randomBetweenTwoValues",value:function(t,e){return t+Math.random()*(e-t)}},{key:"chooseValue",value:function(t){this._checkWeights(t);var e,n=Array.from(t.values()).reduce((function(t,e){return t+e})),o=Math.random()*n,i=t.entries().next().value,a=0,r=Object(L.a)(t);try{for(r.s();!(e=r.n()).done;){var s=Object(B.a)(e.value,2),c=s[0];if(o<=(a+=s[1])){i=c;break}}}catch(u){r.e(u)}finally{r.f()}return i}},{key:"_checkWeights",value:function(t){var e=Array.from(t.values());if(e.some((function(t){return t<0}))){var n=Array.from(t.entries());throw new Error("Negative weights are not allowed. Entries: ".concat(n))}if(e.every((function(t){return 0===t}))){var o=Array.from(t.entries());throw new Error("At least one of the weights has to be > 0. Entries: ".concat(o))}}}]),t}();!function(t){t.FOO_MINE="foo mine",t.BAR_MINE="bar mine",t.ASSEMBLING_FACTORY="assembling factory",t.SHOP="shop",t.TRANSITION="transition"}(M||(M={}));var F,I,E=function(){function t(e,n){Object(l.a)(this,t),this.store=e,this.location=void 0,this.action=void 0,this.randomGenerator=void 0,this.nextLocation=void 0,this.actionStartTime=void 0,this.keepLocation=void 0,this.observable=void 0,this.nextLocation=null,this.keepLocation=!1,this.action=y,this.actionStartTime=null,this.observable=e.getRobotsObservable(),this.store.addRobot(this),this.location=M.SHOP,this.setLocation((null===n||void 0===n?void 0:n.initialLocation)?n.initialLocation:M.SHOP),this.randomGenerator=(null===n||void 0===n?void 0:n.randomGenerator)?null===n||void 0===n?void 0:n.randomGenerator:new R}return Object(b.a)(t,[{key:"tick",value:function(t){if(null!==this.actionStartTime){var e,n,o=t-this.actionStartTime;if("randomBetween"in this.action)e=(n=this.randomGenerator).randomBetweenTwoValues.apply(n,Object(d.a)(this.action.randomBetween));else e=this.action.totalDuration;o>=e&&this._endAction()}}},{key:"_endAction",value:function(){switch(this.action.actionType){case O.actionType:if(!this.nextLocation)throw new Error("The robot can't end its move without a location specified.");this._moveTo(this.nextLocation);break;case g.actionType:this._mineFoo();break;case v.actionType:this._mineBar();break;case A.actionType:this._assemble();break;case j.actionType:this._buyRobot();break;default:throw new Error("There is a start time defined for an action, but the action of the robot is incorrect (".concat(this.action.actionType,")."))}this.action=y,this.actionStartTime=null}},{key:"_moveTo",value:function(t){this.setLocation(t),this.nextLocation=null}},{key:"_mineFoo",value:function(){this.store.setFoosAmount(this.store.getFoosAmount()+1)}},{key:"_mineBar",value:function(){this.store.setBarsAmount(this.store.getBarsAmount()+1)}},{key:"_assemble",value:function(){this.randomGenerator.randomPercentageSuccess(60)?this.store.setFoobarsAmount(this.store.getFoobarsAmount()+1):this.store.setBarsAmount(this.store.getBarsAmount()+1)}},{key:"_buyRobot",value:function(){new t(this.store)}},{key:"startMoving",value:function(t){this.checkAvailable(),this._checkLocationSpecified(),this._checkNotKeepingLocation(),this.setLocation(M.TRANSITION),this.action=O,this.actionStartTime=t}},{key:"startMining",value:function(t){if(this.checkAvailable(),this.location===M.FOO_MINE)this.action=g;else{if(this.location!==M.BAR_MINE)throw new Error("The robot has to be in a mine to mine, here it is in ".concat(this.location,"."));this.action=v}this.actionStartTime=t}},{key:"startAssembling",value:function(t){this.checkAvailable(),this._checkLocation(M.ASSEMBLING_FACTORY),this._checkRessources("To create a foobar the robot needs one foo and one bar",p),this.action=A,this.actionStartTime=t,this.store.setBarsAmount(this.store.getBarsAmount()-1),this.store.setFoosAmount(this.store.getFoosAmount()-1)}},{key:"startBuyingRobot",value:function(t){this.checkAvailable(),this._checkLocation(M.SHOP),this._checkRessources("To buy a new robot, the robot needs 6 foos and 3 foobars",k),this.action=j,this.actionStartTime=t,this.store.setFoobarsAmount(this.store.getFoobarsAmount()-3),this.store.setFoosAmount(this.store.getFoosAmount()-6)}},{key:"_checkLocation",value:function(t){if(t!==this.location)throw new Error("The robot has to be in the ".concat(t,", here it is in ").concat(this.location,"."))}},{key:"_checkLocationSpecified",value:function(){if(!this.getNextLocation())throw new Error("The robot can't start moving without next location specified.")}},{key:"_checkNotKeepingLocation",value:function(){if(this.getKeepLocation())throw new Error("The robot can't start moving while it has been asked to keep its location.")}},{key:"_checkRessources",value:function(t,e){if(!(this.store.getFoobarsAmount()>=e.foobars&&this.store.getFoosAmount()>=e.foos&&this.store.getBarsAmount()>=e.bars))throw new Error("".concat(t,".\n        There are only ").concat(this.store.getFoosAmount()," foos, ").concat(this.store.getBarsAmount()," bars and ").concat(this.store.getFoobarsAmount()," foobars."))}},{key:"checkAvailable",value:function(){if(!this.isAvailable())throw new Error("The robot is not available yet")}},{key:"canAssemble",value:function(){return this._canDoAction(p)}},{key:"canBuyRobot",value:function(){return this._canDoAction(k)}},{key:"_canDoAction",value:function(t){try{this._checkRessources("",t)}catch(e){return!1}return!0}},{key:"isAvailable",value:function(){return this.action===y}},{key:"subscribe",value:function(t,e){this.observable.subscribe(t,e)}},{key:"setNextLocation",value:function(t){this.nextLocation=t}},{key:"getNextLocation",value:function(){return this.nextLocation}},{key:"getLocation",value:function(){return this.location}},{key:"setLocation",value:function(t){this.location=t;var e=[];this.store.getRobots().forEach((function(t){e.push(t.getLocation())})),this.observable.trigger(f.ROBOT_LOCATION,e)}},{key:"getAction",value:function(){return this.action}},{key:"setKeepLocation",value:function(t){this.keepLocation=t}},{key:"getKeepLocation",value:function(){return this.keepLocation}}]),t}(),G=function(){function t(){Object(l.a)(this,t),this.foosAmount=void 0,this.barsAmount=void 0,this.fooBarsAmount=void 0,this.robots=void 0,this.observable=void 0,this.robotsObservable=void 0,this.observable=new S,this.robotsObservable=new N,this.foosAmount=0,this.barsAmount=0,this.fooBarsAmount=0,this.robots=[]}return Object(b.a)(t,[{key:"subscribe",value:function(t,e){this.observable.subscribe(t,e)}},{key:"subscribeToRobots",value:function(t,e){this.robotsObservable.subscribe(t,e)}},{key:"setFoosAmount",value:function(t){this.foosAmount=t,this.observable.trigger(_.FOOS_AMOUNT,this.foosAmount)}},{key:"getFoosAmount",value:function(){return this.foosAmount}},{key:"setBarsAmount",value:function(t){this.barsAmount=t,this.observable.trigger(_.BARS_AMOUNT,this.barsAmount)}},{key:"getBarsAmount",value:function(){return this.barsAmount}},{key:"setFoobarsAmount",value:function(t){this.fooBarsAmount=t,this.observable.trigger(_.FOOBARS_AMOUNT,this.fooBarsAmount)}},{key:"getFoobarsAmount",value:function(){return this.fooBarsAmount}},{key:"addRobot",value:function(t){this.robots.push(t),this.observable.trigger(_.ROBOTS_AMOUNT,this.robots.length)}},{key:"getRobots",value:function(){return this.robots}},{key:"getRobotsObservable",value:function(){return this.robotsObservable}}]),t}(),z=function(){function t(e){Object(l.a)(this,t),this.randomGenerator=void 0,this.automaticMovementProbability=void 0,this.automaticLocationProbabilities=void 0,this.randomGenerator=(null===e||void 0===e?void 0:e.randomGenerator)?e.randomGenerator:new R,this.automaticMovementProbability=25,this.automaticLocationProbabilities=new Map([[M.FOO_MINE,50],[M.BAR_MINE,50],[M.ASSEMBLING_FACTORY,50],[M.SHOP,50]])}return Object(b.a)(t,[{key:"setLocationWeight",value:function(t,e){if(e<0)throw new Error("The assigned weight ".concat(e," has to be greater than 0."));this.automaticLocationProbabilities.set(t,e)}},{key:"getLocationWeight",value:function(t){return this.automaticLocationProbabilities.get(t)}},{key:"setAutomaticMovementProbability",value:function(t){this.automaticMovementProbability=t}},{key:"getAutomaticMovementProbability",value:function(){return this.automaticMovementProbability}},{key:"actOnOneFrame",value:function(t,e){var n=this;e.getRobots().forEach((function(e){(e.tick(t),e.isAvailable())&&(e.getNextLocation()&&!e.getKeepLocation()?e.startMoving(t):n._handleAutomaticActions(e,t))}))}},{key:"_handleAutomaticActions",value:function(t,e){this.randomGenerator.randomPercentageSuccess(this.automaticMovementProbability)&&!t.getKeepLocation()?this._doAutomaticMove(t,e):this._doAutomaticOtherActions(t,e)}},{key:"_doAutomaticMove",value:function(t,e){var n=new Map(this.automaticLocationProbabilities);n.delete(t.getLocation());try{var o=this.randomGenerator.chooseValue(n);t.setNextLocation(o),t.startMoving(e)}catch(i){if(!i.message.includes("At least one of the weights has to be > 0"))throw i}}},{key:"_doAutomaticOtherActions",value:function(t,e){switch(t.getLocation()){case M.FOO_MINE:case M.BAR_MINE:t.startMining(e);break;case M.ASSEMBLING_FACTORY:t.canAssemble()&&t.startAssembling(e);break;case M.SHOP:t.canBuyRobot()&&t.startBuyingRobot(e);break;default:throw new Error("An action has been requested while the robot was the wrong location (".concat(t.getLocation(),")."))}}}]),t}(),P=function(){function t(e,n){Object(l.a)(this,t),this.store=void 0,this.dateTime=void 0,this.strategy=void 0,this.started=void 0,this.store=new G,this.dateTime=(null===n||void 0===n?void 0:n.dateTime)?n.dateTime:new m,this.strategy=e||new z,new E(this.store),new E(this.store),this.started=!1}return Object(b.a)(t,[{key:"start",value:function(){var t=this;this.started=!0;var e=0;!function n(){var o=t.dateTime.getCurrentTime();t.strategy.actOnOneFrame(o,t.store),t.store.getRobots().length<20?e=requestAnimationFrame(n):(cancelAnimationFrame(e),t.started=!1)}()}},{key:"setRobotNextLocation",value:function(t,e){this.store.getRobots()[t].setNextLocation(e)}},{key:"getRobotLocation",value:function(t){return this.store.getRobots()[t].getLocation()}},{key:"getStrategy",value:function(){return this.strategy}},{key:"getStarted",value:function(){return this.started}},{key:"subscribeToAmount",value:function(t,e){this.store.subscribe(t,e)}},{key:"subscribeToRobots",value:function(t,e){this.store.subscribeToRobots(t,e)}}]),t}(),C=a.a.createContext(new P(new z)),U=n(15),V=n(71),D=n(72),H=n(7),W=Object(U.a)(F||(F=Object(u.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem 0;\n"]))),Y=h.a.li(I||(I=Object(u.a)(["\n  ","\n  ","\n"])),W,(function(t){return t.first?"margin-bottom: 2rem;\n        @media (min-width: 950px) {\n          margin-bottom: 0;\n          grid-column: span 2;\n          width: 60%;\n          justify-self: center;\n        }":""})),K=Object(D.a)({root:{'& .MuiSlider-markLabel[data-index="0"]':{transform:"translateX(0%)"},'& .MuiSlider-markLabel[data-index="1"]':{transform:"translateX(-100%)"}}}),q=[{value:0,label:"0%"},{value:100,label:"100%"}];var J,X=function(t){var e=t.id,n=t.text,o=t.defaultValue,i=t.onChange,a=t.first,r=K();return Object(H.b)(Y,{first:a,children:[Object(H.a)("label",{id:e,children:n}),Object(H.a)(V.a,{defaultValue:o,valueLabelDisplay:"auto",onChangeCommitted:i,"aria-labelledby":e,marks:a&&q,className:r.root})]})},Q=n(2),Z=h.a.ul(J||(J=Object(u.a)(["\n  list-style-type: none;\n  padding-left: 0;\n  padding-top: 2rem;\n  border-top: solid 1px #ddd;\n  display: grid;\n\n  @media (min-width: 950px) {\n    flex-basis: 100%;\n    border: none;\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 1.3fr 1fr 1fr;\n    column-gap: 5%;\n  }\n"])));var $=function(){var t=Object(i.useContext)(C).getStrategy();function e(e){return function(n,o){t.setLocationWeight(e,o)}}return Object(Q.jsxs)(Z,{children:[Object(Q.jsx)(X,{id:"movement-probability",text:"Probability to move",defaultValue:t.getAutomaticMovementProbability(),onChange:function(e,n){t.setAutomaticMovementProbability(n)},first:!0}),Object(Q.jsx)(X,{id:"foo-mine-weight",text:"Foo mine weight",defaultValue:t.getLocationWeight(M.FOO_MINE),onChange:e(M.FOO_MINE)}),Object(Q.jsx)(X,{id:"bar-mine-weight",text:"Bar mine weight",defaultValue:t.getLocationWeight(M.BAR_MINE),onChange:e(M.BAR_MINE)}),Object(Q.jsx)(X,{id:"assembling-factory-weight",text:"Assembling factory weight",defaultValue:t.getLocationWeight(M.ASSEMBLING_FACTORY),onChange:e(M.ASSEMBLING_FACTORY)}),Object(Q.jsx)(X,{id:"shop-weight",text:"Shop weight",defaultValue:t.getLocationWeight(M.SHOP),onChange:e(M.SHOP)})]})};function tt(t){var e=t.game,n=t.initialValue,o=t.observed,a=Object(i.useState)(n),r=Object(B.a)(a,2),s=r[0],c=r[1];return Object(i.useEffect)((function(){e.subscribeToAmount(o,c)}),[e,o]),s}var et,nt,ot,it,at,rt,st=n(37),ct=function(t){Object(w.a)(n,t);var e=Object(T.a)(n);function n(){return Object(l.a)(this,n),e.apply(this,arguments)}return Object(b.a)(n,[{key:"increment",value:function(t){this.has(t)&&this.set(t,this.get(t)+1)}},{key:"decrement",value:function(t){this.has(t)&&this.set(t,this.get(t)-1)}}]),n}(Object(st.a)(Map));function ut(t){var e=function(t){var e=t.game,n=t.initialValue,o=t.observed,a=Object(i.useState)(n),r=Object(B.a)(a,2),s=r[0],c=r[1];return Object(i.useEffect)((function(){e.subscribeToRobots(o,c)}),[e,o]),s}({game:t,initialValue:[],observed:f.ROBOT_LOCATION});return{robotsAmountByLocation:Object(i.useMemo)((function(){var t=new ct([[M.FOO_MINE,0],[M.BAR_MINE,0],[M.ASSEMBLING_FACTORY,0],[M.SHOP,0],[M.TRANSITION,0]]);return e.forEach((function(e){t.increment(e)})),t}),[e])}}var ht,lt,bt,mt,dt,ft,Ot,gt=Object(U.a)(et||(et=Object(u.a)(["\n  position: absolute;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n  transition-property: width, height, top, left, font-size;\n  background-color: #333;\n  color: #eee;\n  display: grid;\n  place-content: center;\n"]))),vt=h.a.div(nt||(nt=Object(u.a)(["\n  ","\n  top: 0;\n  left: 0;\n  width: ","rem;\n  height: ","rem;\n  font-size: ","rem;\n"])),gt,(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size/1.5})),At=h.a.div(ot||(ot=Object(u.a)(["\n  ","\n  top: 0;\n  right: 0;\n  width: ","rem;\n  height: ","rem;\n  font-size: ","rem;\n"])),gt,(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size/1.5})),jt=h.a.div(it||(it=Object(u.a)(["\n  ","\n  bottom: 0;\n  left: 0;\n  width: ","rem;\n  height: ","rem;\n  font-size: ","rem;\n"])),gt,(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size/1.5})),yt=h.a.div(at||(at=Object(u.a)(["\n  ","\n  bottom: 0;\n  right: 0;\n  width: ","rem;\n  height: ","rem;\n  font-size: ","rem;\n"])),gt,(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size/1.5})),pt=h.a.div(rt||(rt=Object(u.a)(["\n  ","\n  top: calc(50% - calc(","rem / 2));\n  left: calc(50% - calc(","rem / 2));\n  width: ","rem;\n  height: ","rem;\n  font-size: ","rem;\n"])),gt,(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size}),(function(t){return t.size/1.5})),kt=h.a.ul(ht||(ht=Object(u.a)(["\n  height: 15rem;\n  position: relative;\n  margin: 3rem 0 3.7rem 0;\n  list-style-type: none;\n  padding: 0;\n\n  @media (min-width: 950px) {\n    flex: 1.35;\n    height: 17rem;\n  }\n"]))),wt=Object(U.a)(lt||(lt=Object(u.a)(["\n  position: absolute;\n  font-weight: bold;\n  padding: 0.2rem 0;\n"]))),Tt=h.a.span(bt||(bt=Object(u.a)(["\n  ","\n  top: -2.1rem;\n  left: 0;\n"])),wt),xt=h.a.span(mt||(mt=Object(u.a)(["\n  ","\n  top: -2.1rem;\n  right: 0;\n"])),wt),_t=h.a.span(dt||(dt=Object(u.a)(["\n  ","\n  bottom: -2.2rem;\n  left: 0;\n"])),wt),Nt=h.a.span(ft||(ft=Object(u.a)(["\n  ","\n  bottom: -2.2rem;\n  right: 0;\n"])),wt),Mt=h.a.span(Ot||(Ot=Object(u.a)(["\n  ","\n  transition: all 0.3s ease;\n  transition-property: top, left;\n  color: black;\n  font-size: 1.13rem;\n  bottom: -2rem;\n  left: calc(50% - 2rem);\n"])),wt);var St,Bt,Lt,Rt,Ft=function(){var t=Object(i.useContext)(C),e=ut(t).robotsAmountByLocation,n=t.store.getRobots().length;function o(t){var o=e.get(t);return n&&o?Math.sqrt(o)/Math.sqrt(n)*7:0}return Object(H.b)(kt,{children:[Object(H.b)("li",{children:[Object(H.a)(Tt,{children:"Foo mine"}),Object(H.a)(vt,{size:o(M.FOO_MINE),children:e.get(M.FOO_MINE)})]}),Object(H.b)("li",{children:[Object(H.a)(xt,{children:"Bar mine"}),Object(H.a)(At,{size:o(M.BAR_MINE),children:e.get(M.BAR_MINE)})]}),Object(H.b)("li",{children:[Object(H.a)(_t,{children:"Assembling factory"}),Object(H.a)(jt,{size:o(M.ASSEMBLING_FACTORY),children:e.get(M.ASSEMBLING_FACTORY)})]}),Object(H.b)("li",{children:[Object(H.a)(Nt,{children:"Shop"}),Object(H.a)(yt,{size:o(M.SHOP),children:e.get(M.SHOP)})]}),Object(H.a)("li",{children:Object(H.b)(pt,{size:o(M.TRANSITION),children:[Object(H.a)(Mt,{children:"Moving"}),e.get(M.TRANSITION)]})})]})},It=h.a.ul(St||(St=Object(u.a)(["\n  display: flex;\n  list-style-type: none;\n  padding: 0;\n  justify-content: space-around;\n  background-color: #eee;\n  border-radius: 0.3rem;\n  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);\n  padding: 0.3rem 0;\n\n  @media (min-width: 950px) {\n    flex: 1;\n    margin-right: 7%;\n    flex-wrap: wrap;\n    border-radius: 0.4rem;\n    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);\n  }\n  @media (min-width: 1200px) {\n    margin-right: 6%;\n  }\n"]))),Et=h.a.li(Bt||(Bt=Object(u.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  @media (min-width: 950px) {\n    flex-basis: 50%;\n    justify-content: center;\n  }\n"]))),Gt=h.a.span(Lt||(Lt=Object(u.a)(["\n  font-weight: bold;\n  padding: 0.2rem 0.4rem;\n\n  @media (min-width: 950px) {\n    margin-bottom: 0.3rem;\n  }\n"]))),zt=h.a.span(Rt||(Rt=Object(u.a)(["\n  padding: 0.2rem 0.4rem;\n  font-size: 1.1rem;\n\n  @media (min-width: 500px) {\n    font-size: 1.4rem;\n  }\n  @media (min-width: 950px) {\n    padding-top: 0.3rem;\n    font-size: 1.7rem;\n  }\n"])));var Pt,Ct,Ut,Vt=function(){var t=Object(i.useContext)(C),e=tt({game:t,initialValue:t.store.getFoosAmount(),observed:_.FOOS_AMOUNT}),n=tt({game:t,initialValue:t.store.getBarsAmount(),observed:_.BARS_AMOUNT}),o=tt({game:t,initialValue:t.store.getFoobarsAmount(),observed:_.FOOBARS_AMOUNT}),a=tt({game:t,initialValue:t.store.getRobots().length,observed:_.ROBOTS_AMOUNT});return Object(Q.jsxs)(It,{children:[Object(Q.jsxs)(Et,{children:[Object(Q.jsx)(Gt,{children:"Foos"}),Object(Q.jsx)(zt,{children:e})]}),Object(Q.jsxs)(Et,{children:[Object(Q.jsx)(Gt,{children:"Bars"}),Object(Q.jsx)(zt,{children:n})]}),Object(Q.jsxs)(Et,{children:[Object(Q.jsx)(Gt,{children:"Foobars"}),Object(Q.jsx)(zt,{children:o})]}),Object(Q.jsxs)(Et,{children:[Object(Q.jsx)(Gt,{children:"Robots"}),Object(Q.jsxs)(zt,{children:[a," / ",20]})]})]})},Dt=(n(50),h.a.main(Pt||(Pt=Object(u.a)(["\n  padding: 1rem;\n  display: flex;\n  justify-content: center;\n\n  @media (min-width: 450px) {\n    padding: 1rem 2rem;\n  }\n  @media (min-width: 600px) {\n    padding: 1rem 8%;\n  }\n  @media (min-width: 950px) {\n    padding: 1rem 4rem;\n  }\n"])))),Ht=h.a.div(Ct||(Ct=Object(u.a)(["\n  flex: 1;\n  max-width: 1200px;\n  display: flex;\n  flex-direction: column;\n\n  @media (min-width: 950px) {\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: space-between;\n    align-content: flex-start;\n  }\n"]))),Wt=h.a.h1(Ut||(Ut=Object(u.a)(["\n  @media (min-width: 950px) {\n    flex-basis: 100%;\n  }\n"])));var Yt=function(){var t=Object(i.useRef)(new P(new z));return Object(i.useEffect)((function(){t.current.start()}),[]),Object(Q.jsx)(C.Provider,{value:t.current,children:Object(Q.jsx)(Dt,{role:"main",children:Object(Q.jsxs)(Ht,{children:[Object(Q.jsx)(Wt,{children:"Foobartory"}),Object(Q.jsx)(Vt,{}),Object(Q.jsx)(Ft,{}),Object(Q.jsx)($,{})]})})})};s.a.render(Object(Q.jsx)(a.a.StrictMode,{children:Object(Q.jsx)(Yt,{})}),document.getElementById("root")),c()}},[[51,1,2]]]);
//# sourceMappingURL=main.27895d91.chunk.js.map