define(["appSettings","datetime","jQuery","emby-slider","emby-button"],function(e,t,a){function i(){var t=e.maxStreamingBitrate(),a={};return a.MaxStreamingBitrate=t,a.MaxStaticBitrate=1e8,a.MusicStreamingTranscodingBitrate=192e3,a.DirectPlayProfiles=[],a.DirectPlayProfiles.push({Container:"m4v,3gp,ts,mpegts,mov,xvid,vob,mkv,wmv,asf,ogm,ogv,m2v,avi,mpg,mpeg,mp4,webm,wtv,dvr-ms",Type:"Video"}),a.DirectPlayProfiles.push({Container:"aac,mp3,mpa,wav,wma,mp2,ogg,oga,webma,ape,opus,flac",Type:"Audio"}),a.TranscodingProfiles=[],a.TranscodingProfiles.push({Container:"mkv",Type:"Video",AudioCodec:"aac,mp3,ac3",VideoCodec:"h264",Context:"Streaming"}),a.TranscodingProfiles.push({Container:"mp3",Type:"Audio",AudioCodec:"mp3",Context:"Streaming",Protocol:"http"}),a.ContainerProfiles=[],a.CodecProfiles=[],a.SubtitleProfiles=[],a.SubtitleProfiles.push({Format:"srt",Method:"Embed"}),a.SubtitleProfiles.push({Format:"subrip",Method:"Embed"}),a.SubtitleProfiles.push({Format:"ass",Method:"Embed"}),a.SubtitleProfiles.push({Format:"ssa",Method:"Embed"}),a.SubtitleProfiles.push({Format:"pgs",Method:"Embed"}),a.SubtitleProfiles.push({Format:"pgssub",Method:"Embed"}),a.SubtitleProfiles.push({Format:"dvdsub",Method:"Embed"}),a.SubtitleProfiles.push({Format:"vtt",Method:"Embed"}),a.SubtitleProfiles.push({Format:"sub",Method:"Embed"}),a.SubtitleProfiles.push({Format:"idx",Method:"Embed"}),a.SubtitleProfiles.push({Format:"smi",Method:"Embed"}),a.ResponseProfiles=[],a}function o(e){var t=i(),a=0;return new Promise(function(i){MediaPlayer.tryStartPlayback(t,e,a,function(t){l(e,t,a).then(i)})})}function l(e,t,a){return Dashboard.hideLoadingMsg(),b=e,y=t,S={PlayState:{}},MediaPlayer.createStreamInfo("Video",e,t,a).then(function(a){var i=a.url,o=getParameterByName("AudioStreamIndex",i);return o&&(S.PlayState.AudioStreamIndex=parseInt(o)),S.PlayState.SubtitleStreamIndex=self.currentSubtitleStreamIndex,S.PlayState.PlayMethod="true"==getParameterByName("static",i)?"DirectStream":"Transcode",S.PlayState.LiveStreamId=getParameterByName("LiveStreamId",i),S.PlayState.PlaySessionId=getParameterByName("PlaySessionId",i),S.PlayState.MediaSourceId=t.Id,S.PlayState.CanSeek=!1,S.NowPlayingItem=MediaPlayer.getNowPlayingItemForReporting(e,t),a})}function r(e){var t=S;return t.PlayState.PositionTicks=Math.round(e),t}function n(){var e=r(),t={ItemId:e.NowPlayingItem.Id,NowPlayingItem:e.NowPlayingItem};t=a.extend(t,e.PlayState),ApiClient.reportPlaybackStart(t),f=setInterval(function(){s(null)},1e4),d(b)}function s(e){var t=r(e),i={ItemId:t.NowPlayingItem.Id,NowPlayingItem:t.NowPlayingItem};i=a.extend(i,t.PlayState),ApiClient.reportPlaybackProgress(i)}function u(e){var t=r(e),a={ItemId:t.NowPlayingItem.Id,MediaSourceId:t.PlayState.MediaSourceId,PositionTicks:t.PlayState.PositionTicks};t.PlayState.LiveStreamId&&(a.LiveStreamId=t.PlayState.LiveStreamId),t.PlayState.PlaySessionId&&(a.PlaySessionId=t.PlayState.PlaySessionId),f&&(clearInterval(f),f=null),setTimeout(function(){ApiClient.reportPlaybackStopped(a)},1e3)}function d(e){require(["jqmpopup","jqmlistview"],function(){a(".externalPlayerPostPlayFlyout").popup("close").remove();var i='<div data-role="popup" class="externalPlayerPostPlayFlyout" data-history="false" data-theme="a" data-dismissible="false">';i+='<ul data-role="listview" style="min-width: 220px;">',i+='<li data-role="list-divider" style="padding: 1em;text-align:center;">'+Globalize.translate("HeaderExternalPlayerPlayback")+"</li>",i+="</ul>",i+='<div style="padding:1.5em;">';var o=e.RunTimeTicks;e.RunTimeTicks&&e.RunTimeTicks>=3e9&&(o=!1,i+='<label for="selectMarkAs" class="selectLabel">'+Globalize.translate("LabelMarkAs")+"</label>",i+='<select id="selectMarkAs">',i+='<option value="0">'+Globalize.translate("OptionWatched")+"</option>",i+='<option value="1">'+Globalize.translate("OptionUnwatched")+"</option>",i+='<option value="2">'+Globalize.translate("OptionInProgress")+"</option>",i+="</select>",i+="<br/>",i+='<div class="fldResumePoint hide">',i+='<p style="margin-top: 0;">'+Globalize.translate("LabelResumePoint")+"</p>",i+='<div class="sliderContainer">',i+='<input type="range" is="emby-slider" pin step=".001" min="0" max="100" value="0" class="playstateSlider"/>',i+="</div>",i+='<div class="sliderValue" style="text-align:center;margin:2px 0 4px;">0:00:00</div>',i+="</div>",i+="<br/>"),i+='<button is="emby-button" type="button" class="block submit btnDone" raised>'+Globalize.translate("ButtonImDone")+"</button>",i+="</div>",i+="</div>",a(document.body).append(i);var l=a(".externalPlayerPostPlayFlyout").popup({}).trigger("create").popup("open").on("popupafterclose",function(){a(this).off("popupafterclose").remove()})[0];a("#selectMarkAs",l).on("change",function(){"2"==this.value?l.querySelector(".fldResumePoint").classList.remove("hide"):l.querySelector(".fldResumePoint").classList.add("hide")}).trigger("change"),a(".btnDone",l).on("click",function(){var t=0,i=a("#selectMarkAs",l).val();if("2"==i){var r=a(".playstateSlider",l).val(),n=.01*e.RunTimeTicks*Number(r);t=n}else o||"0"==i?t=y.RunTimeTicks:"1"==i&&(t=0);u(t),a(".externalPlayerPostPlayFlyout").popup("close").remove()}),a(".playstateSlider",l).on("change",function(){var i=a(this).val(),o=.01*e.RunTimeTicks*Number(i),r=t.getDisplayRunningTime(o);a(".sliderValue",l).html(r)})})}function m(e,t){require(["actionsheet"],function(e){e.show({items:t,callback:function(e){var a=t.filter(function(t){return t.id==e})[0];a&&(window.open(a.url,"_blank"),n())}})})}function c(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){o(e).then(function(t){setTimeout(function(){ExternalPlayer.showPlayerSelectionMenu(e,t.url,t.mimeType)},500)})})}function p(e){var t=[{name:"Vlc",url:"vlc://"+e,id:"vlc",ironIcon:"airplay"}];return Promise.resolve(t)}function P(e,t,a){ExternalPlayer.getExternalPlayers(t,a).then(function(t){m(e,t)})}var y,b,S,f;window.ExternalPlayer={showMenu:c,onPlaybackStart:n,getExternalPlayers:p,showPlayerSelectionMenu:P}});