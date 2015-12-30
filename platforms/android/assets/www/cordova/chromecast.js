!function(){function e(){function e(e){var n=AppSettings.maxChromecastBitrate();e=$.extend(e,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),maxBitrate:n,receiverName:b.getFriendlyName(),supportsAc3:AppSettings.enableChromecastAc3()}),require(["chromecasthelpers"],function(n){n.getServerAddress(ApiClient).then(function(n){e.serverAddress=n,t(e)})})}function t(e){P.sendText(JSON.stringify(e))}function n(){var e={};return e.playerName=M,e.playableMediaTypes=["Audio","Video"],e.isLocalPlayer=!1,e.appName=M,e.supportedCommands=["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"],e}function a(e){var t=n();return t.name=t.deviceName=e.getFriendlyName(),t.id=e.getId(),t}function o(e){e=(e||"").toLowerCase();var t=[];return t.push("nexusplayer"),t.filter(function(t){return-1!=e.replace(" ","").indexOf(t)}).length>0}function i(){return ConnectSDKHelper.getDeviceList().filter(function(e){return e.hasService(ConnectSDK.Services.Chromecast)||o(e.getModelName())||o(e.getFriendlyName())})}function r(){var e=D.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}function s(e){if("playbackerror"==e.type){var t=e.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+t),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==e.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):e.type&&0==e.type.indexOf("playback")&&Events.trigger(T,e.type,[e.data])}function u(e){s("string"==typeof e?JSON.parse(e):e)}function c(){}function l(e,t){P=e,e.setWebAppSessionListener(),b=t,A=t.getId(),D.lastPlayerData={},MediaController.setActivePlayer(M,a(t)),m()}function d(e,t,n){var a=t.acquire();a.on("message",u),a.on("disconnect",c),n?a.connect().success(function(){l(a,e)}).error(f):l(a,e)}function m(){e({options:{},command:"Identify"})}function f(){p()}function p(){var e=P;e&&(e.off("message"),e.off("disconnect"),e.disconnect(),e.release(),P=null),D.lastPlayerData={}}function y(e){e.getWebAppLauncher().launchWebApp(x).success(function(t){d(e,t,!0)}).error(function(e){})}function g(e,t,n){e.getWebAppLauncher().joinWebApp(x).success(function(t){d(e,t,!1)}).error(function(a){return t?void g(e,!1,!0):void(n&&y(e))})}function v(e){P&&p(),g(e,!1,!0)}function h(e){e.off("ready"),D.lastPlayerData={},v(e)}function I(e,t){var n=P;n&&n.close();var a=b;a&&(e&&a.getWebAppLauncher().closeWebApp(x),a.disconnect()),p(),b=null,t||(A=null)}function S(e,t){var n=i().filter(function(t){return t.getId()==e})[0];n?D.tryPair({id:e}):t&&setTimeout(function(){S(e,!1)},2e3)}function C(){var e=A;e&&setTimeout(function(){S(e,!0)},0)}var P,b,A,D=this,M="Chromecast",x="2D4B1DA3";D.name=M,D.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(n){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){n({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))};var T={};Events.on(T,"playbackstart",function(e,t){var n=D.getPlayerStateInternal(t);Events.trigger(D,"playbackstart",[n])}),Events.on(T,"playbackstop",function(e,t){var n=D.getPlayerStateInternal(t);Events.trigger(D,"playbackstop",[n]),D.lastPlayerData={}}),Events.on(T,"playbackprogress",function(e,t){var n=D.getPlayerStateInternal(t);Events.trigger(D,"positionchange",[n])}),D.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?D.playWithCommand(e,"PlayNow"):D.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,D.playWithCommand(e,"PlayNow")})})},D.playWithCommand=function(t,n){return t.items?(t.items=t.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void e({options:t,command:n})):void ApiClient.getItem(Dashboard.getCurrentUserId(),t.ids[0]).then(function(e){t.items=[e],D.playWithCommand(t,n)})},D.unpause=function(){e({command:"Unpause"})},D.pause=function(){e({command:"Pause"})},D.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){D.playWithCommand({items:[e]},"Shuffle")})},D.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){D.playWithCommand({items:[e]},"InstantMix")})},D.canQueueMediaType=function(e){return"Audio"==e},D.queue=function(e){D.playWithCommnd(e,"PlayLast")},D.queueNext=function(e){D.playWithCommand(e,"PlayNext")},D.stop=function(){e({command:"Stop"})},D.displayContent=function(t){e({options:t,command:"DisplayContent"})},D.mute=function(){e({command:"Mute"})},D.unMute=function(){D.setVolume(r()+2)},D.toggleMute=function(){var e=D.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?D.unMute():D.mute()},D.getTargets=function(){return i().map(a)},D.seek=function(t){t=parseInt(t),t/=1e7,e({options:{position:t},command:"Seek"})},D.setAudioStreamIndex=function(t){e({options:{index:t},command:"SetAudioStreamIndex"})},D.setSubtitleStreamIndex=function(t){e({options:{index:t},command:"SetSubtitleStreamIndex"})},D.nextTrack=function(){e({options:{},command:"NextTrack"})},D.previousTrack=function(){e({options:{},command:"PreviousTrack"})},D.beginPlayerUpdates=function(){},D.endPlayerUpdates=function(){},D.volumeDown=function(){e({options:{},command:"VolumeDown"})},D.setRepeatMode=function(t){e({options:{RepeatMode:t},command:"SetRepeatMode"})},D.volumeUp=function(){e({options:{},command:"VolumeUp"})},D.setVolume=function(t){t=Math.min(t,100),t=Math.max(t,0),e({options:{volume:t},command:"SetVolume"})},D.getPlayerState=function(){return new Promise(function(e){var t=D.getPlayerStateInternal();e(t)})},D.lastPlayerData={},D.getPlayerStateInternal=function(e){return e=e||D.lastPlayerData,D.lastPlayerData=e,e},D.tryPair=function(e){return new Promise(function(t,n){var a=i().filter(function(t){return t.getId()==e.id})[0];a?D.tryPairWithDevice(a,t,n):n()})},D.tryPairWithDevice=function(e){e.on("disconnect",function(){e.off("ready"),e.off("disconnect")}),e.isReady()?h(e):(e.on("ready",function(){h(e)}),e.connect())},D.endSession=function(){D.stop(),setTimeout(function(){I(!0,!1)},1e3)},document.addEventListener("pause",function(){I(!1,!0)},!1),document.addEventListener("resume",C,!1)}MediaController.registerPlayer(new e)}();