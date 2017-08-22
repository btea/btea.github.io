		// API
		// https://api.imjad.cn/bilibili/index.html
		// 
		$(function(){
			// $.ajax({
			// 	type: "GET",
			// 	// url: './proxy.php?aid=170001&page=1&quality=2',   //服务器端的代理程序
			// 	url: './proxy.php',
			// 	data: {
			// 		aid: '170001',
			// 		page: '1',
			// 		quality: '2'
			// 	},
			// 	success: function(data){
			// 		console.log(data);
			// 		// show(data);
			// 	}
			// })


			// 网易云
			// $.ajax({
			// 	type: 'get',
			// 	url: 'https://api.imjad.cn/cloudmusic/?type=song&id=440240201&br=128000',
			// 	success: function(data){
			// 		console.log(data);
			// 	}
			// })
			// 
			// 
			// 页面滚动添加效果
			// $(window).scroll(function(){
			// 	let offset = $('.comments').offset().top;
			// 	console.log(offset);
			// 	1295
			// 	1195
			// 	console.log($(window).scrollTop());
			// })
			// 
			// 创建歌单   未完成
			// 
			var like = [];
			$(".addLike").click(function(){
				let src = $("audio")[0].src;
				// like.push(src);
				console.log($("audio")[0]); 
			})

			function operate(){
				let rate = 0.5;
				let step = 0.25;
				$(".speed").click(function(){
					rate += step;
					if(rate > 1.5){
						step = -0.25;
					}else if (rate < 0.5){
						step = 0.25;
					}
					$("audio")[0].playbackRate = rate;
					console.log(rate);
				});
				$(".language").toggle(
					function(){
						$($("audio")[0]).attr({'lang': 'zh-cmn'});
					},
					function(){
						$($("audio")[0]).attr({'lang': 'yue'});
					},
					function(){
						$($("audio")[0]).attr({'lang': 'wuu'});
					}
				);
				// 字体切换
				$(".typeface").toggle(function(){
						// 繁体中文
						$(".lrc-show").attr({'lang': 'zh-cmn-Hans'});
					},
					function(){
						// 简体中文
						$(".lrc-show").attr({'lang': 'zh-cmn-Hant'});
					}
				)
				
			}
			operate();
			// audio lang = zh-cmn  以国语演唱
			// audio lang = yue 以粤语演唱
			// audio lang = wuu 以沪语演唱
			// lang = zh-cmn-Hans 简体中文
			// lang = zh-cmn-Hant 繁体中文
			// 
			
			   
                
			// 随着鼠标移动，显示鼠标所在位置的时间	
			function thetime(){
				$(".progress .show").mouseenter(function(){
					$(this).mousemove(function(e){
						let x = e.offsetX;
						let width = $(this).width();
						let percentage = x / width;
						let currentTime = $("audio")[0].duration *  percentage;
						let minu = Math.floor(currentTime / 60);
						let second = Math.round(currentTime - minu *60);
						minu = minu >= 10 ? minu : '0' + minu;
						second = second >= 10 ? second :　'0' + second;
						let text = minu + ':' +second;
						$(".thetime").show().text(text).css({'position': 'absolute','left' : x + 'px','top' :'-20px'});
					})
				})
				$(".progress .show").mouseleave(function(){
					$(".thetime").hide();
				})
			}
			




			// 自定义进度条
			// 鼠标在进度条上点击的位置 定点播放
			$(".progress .show").click(function(e){
				let x = e.offsetX;
				time(x);
			})

			
				// 播放/暂停按钮图标切换  上一首，下一首
			$(".control .left div").click(function(){
				let index = $(this).index();
				if(index == 1){
					let i =	$(this).children().children()[0]
					let cl = i.classList;
					if(cl[1] == 'fa-play'){
						// 暂停
						$(i).attr({'class': 'fa fa-pause fa-2x'});
						$("#waves li span").css({'animation-play-state': 'running'});
						$("audio")[0].play();
					}else{
						// 播放
						$(i).attr({'class': 'fa fa-play fa-2x'});
						$("#waves li span").css({'animation-play-state': 'paused'});
						$("audio")[0].pause();
						
					}
				}else if(index == 0){
					// 上一首
					
				}else if(index == 1){
					// 下一首
					
				}
			})

			// 声音切换  音量调节
 			$(".control .right").delegate('div','click',function(){
 				let that = this;
 				let index = $(this).index();
 				if(index == 0){
 					// 随机播放
 				}else if(index == 1){
 					//音量/静音切换  获取当前音量大小
 					// let volume = $("audio")[0].volume;
 					let child = $(this).find('i')[0];
 					let classList = child.classList;
 					console.log(child);
 					if(classList[0] == 'czs-volume-l'){
 						$(child).attr({'class': 'czs-volume-x-l'});
 						// audio静音
 						$("audio")[0].volume = 0;
 					}else{
 						$(child).attr({'class': 'czs-volume-l'});
 						// audio 音量恢复到静音之前的大小
 						
 					}
 					
 				}
 			})

 			// 定时定点播放
			function time(len){

				let width = $(".progress").width();
				let percen = len/width;
				let progWidth = width * percen;
				$(".prog").css({'width': progWidth +'px'});
				let totalTime = $("audio")[0].duration;
				let progTime = totalTime * percen;
				$("audio")[0].currentTime = progTime;
				// 缓冲时间
				// 属性
				// audioTracks 返回表示可用音频轨道的AudioTrackList对象
				// buffered 返回表示音频已缓冲部分的TimeRanges对象
				// controller 返回表示音频当前媒体控制器的MediaController对象
				// crossOrigin 设置或返回音频的CORS设置
				// controls 设置或返回音频是否显示控件（比如播放/暂停等）
				// defaultPlaybackRate 设置或返回音频的默认播放速度
				// ended 返回音频的播放是否已经结束
				// networkState 返回音频当前网络状态
				// playbackRate 设置或返回音频播放速度
				// volume 设置/返回音频的音量 最大值为1
				// muted 设置是否应该静音
				// readyState 返回音频当前就绪状态
				// ....
				// 
				// 方法
				// addTextTracks 向音频添加新的文本轨道
				// canPlayType() 检查浏览器是否能够播放指定的音频类型
				// fastSeek() 在音频播放器中指定播放时间
				// getStartDate() 返回新的Date对象，表示当前时间线偏移量
				// load() 重新加载音频元素
				// play() 开始播放音频
				// pause() 暂停当前播放的音频
				let audioTracks,buffered,controller,crossOrigin,defaultPlaybackRate,networkState,playbackRate;
				let that = $("audio")[0];
				buffered = that.buffered.end(0);
				audioTracks = that.audioTracks;
				controller = that.controller;
				crossOrigin =  that.crossOrigin;
				defaultPlaybackRate = that.defaultPlaybackRate;
				networkState = that.networkState;
				// that.playbackRate = 1.5;
				playbackRate = that.playbackRate;
				volume = that.volume;
				console.log('networkState: ' + networkState);
				console.log('buffered: ' + buffered);
				console.log('audioTracks: ' + audioTracks);
				console.log('defaultPlaybackRate: ' + defaultPlaybackRate);
				console.log('controller: ' + controller);
				console.log('crossOrigin: ' + crossOrigin);
				console.log('playbackRate: ' + playbackRate);
				console.log('volume:' + volume);
				console.log('readyState:' + readyState);
				// seeked事件  当用户已跳跃到音频/视屏新位置时
				// seeking事件 当用户开始跳跃到音频/视屏新位置时
				// volumechange事件 当音量已更改时
				// waiting事件 当视屏由于需要缓冲下一帧而停止时
				$("audio")[0].onseeked = function(){
					console.log('已跳转到新的播放位置');
				}
				

				// console.log(totalTime);
				// console.log(currentTime);
			}

			// 
			// 快捷键
			// 
			$(document).keyup(function(e){
				if(e.keyCode == 13){
					$("#search").click();
				}
			})

			// 搜索
			$("#search").click(function(){
				$('tbody').empty();
				var key = $('.kuang input').val().trim();
				if(key){
					$.ajax({
						type: 'get',
						url: 'https://api.imjad.cn/cloudmusic/',
						data: {
							type: 'search',
							s: key,
							limit: 50
							// limit  没有设置的时候，默认是20
						},
						success: function(data){
							console.log(data);
							// data.result.songCount   搜索到的歌曲总数
							music(data,key);
						}
					})
				}else{
					alert('请输入内容');
				}
				
			})



			// 搜索歌曲展示
			function music(data,key){
				$("table").show();
				var songs = data.result.songs;
				// console.log(songs);			
				for(let i = 0; i < songs.length ; i++){
					// 时间
					let dtime = songs[i].dt;
					let minute = Math.floor(dtime / 1000 / 60);
					// 秒数四舍五入取整
					let sec = Math.round((dtime - minute*60*1000) / 1000);
					minute = minute < 10 ? '0' + minute : minute;
					sec = sec < 10 ? '0' + sec : sec;
					let time = minute + ':' + sec;
					let html = "<tr>"+
							"<td>" + songs[i].al.name + "</td>"+
							"<td>" + songs[i].name + "</td>"+
							"<td>" + songs[i].ar[0].name + "</td>"+
							"<td>" + time + "</td>"+
							"</tr>"
					;
					$("tbody").append(html);
					// function source(data){
					// 	let source = data.data[0].url;
					// 	audio.src = source;
					// }
				}

				//点击播放
				$("tbody tr").click(function(){
					let size = $(this).index();
					let name = $(this).children()[1].innerText;
					title(name);
					let id = songs[size].id;
					let thisTotal = $(this).children()[3].innerText;
					$.ajax({
						type: 'get',
						url: 'https://api.imjad.cn/cloudmusic',
						data: {
							type: 'song',
							id: id,
							br: '128000'
						},
						success: function(data){
							play(data,size);
							// 保证ajax按顺序返回 getLyric
							getLyric(size,id,thisTotal);
							//获取第一页评论 comments
							comments(id);
							//翻页评论 pageComments
							pageComments(id);


							thetime();
						},
						error: function(xhr,status,statusText){
								console.log(xhr.status);
								console.log(xhr.statusText);
						}
					})
				})
				// 标题展示
				function title(name){
					$(".title").show();
					$(".title em").text(name);
				}
				// 获取歌词
				function getLyric(size,id,thisTotal){
						// lyric
						$.ajax({
							type: 'get',
							url: 'https://api.imjad.cn/cloudmusic/',
							data: {
								type: 'lyric',
								search_type: '1006',
								id: id
							},
							success: function(data){
								// console.log(data);
								if(data.lrc){
								 	let lyric = data.lrc.lyric;
								 	parseLyric(lyric,size,thisTotal);
								}else{
									console.log('没歌词');
									$('.lrc-show').text('没有歌词');
								}
								$(".lyric").show();
							},
							error: function(xhr,status,statusText){
								console.log(xhr.status);
								console.log(xhr.statusText);
							}
						})
				}
				
				// 点击播放
				function play(data,size){
					if($('audio').length > 0){
						$('audio')[0].src = data.data[0].url;
						$('img')[0].src = songs[size].al.picUrl;
						$('.lyric').css({'background' : 'url(' + songs[size].al.picUrl + ')'});
						$('audio')[0].play();
					}else{
						var audio = document.createElement('audio');
						var img = document.createElement('img');
						audio.src = data.data[0].url;
						img.src = songs[size].al.picUrl;
						$('.lyric').css({'background' : 'url(' + songs[size].al.picUrl + ')'});
						$('.control .avatar a').append(img).attr({'href': songs[size].al.picUrl,'target': '_blank'});
						$(".control").append(audio);
						$("audio")[0].play();
					}
					// 下载处理
					download(songs[size].name,data.data[0].url);
				}
				
				// 歌词处理	
				function parseLyric(text,size,thisTotal){
					// let lyric = text.split('\r\n');  //读取的是本地的lrc文件时先按行分割
					// 剪切时间
					let lyricTime = text.match(/\[(\d{2}:\d{2}((\.|\:)\d{2,}))\]/g) || text.match(/\[\d{2}:\d{2,}\]/g);
					// console.log(lyricTime);
					// 剪切歌词
					var lyric = text.split(/(\[\d{2}:\d{2}\.\d{2,}\])/);
					if(lyric.length > 1){
						lyric = text.split(/(\[\d{2}:\d{2}\.\d{2,}\])/);
					}else{
						// 另外一种歌词格式，秒之后无小数点   （言和天路）
						lyric = text.split(/(\[\d{2}:\d{2}\])/);
					}
						
					// 去掉歌词中空格和换行符
					for(let i = 0; i < lyric.length ; i++){
						if(lyric[i] == "" || typeof lyric[i] == "undefined" || lyric[i] == "\n"){
							lyric.splice(i,1);
						}
					}
					// 深度克隆  clone()只适用DOM元素
					// $.extend() 第一个参数表示是否进行深度拷贝  $.extend 合并，将第三个参数后的对象合并到第二个对象之中
					let clone = $.extend(true,[],lyric);
					// 先判断歌词之中有没有时间存在
					if(!lyricTime){
						//歌词静态显示，不滚动
						// console.log(lyric);
						let lyricCut = text.split(/\s/);
						var lyricStatic = [];
						for(let i = 0; i < lyricCut.length; i++){
							if(lyricCut[i] != ""){
								lyricStatic.push(lyricCut[i]);
							}
						}
						// 静态歌词的处理
						// 
						for(let i = 0; i < lyricStatic.length; i++){
							$('.lrc-show').append('<p>' +lyricStatic[i]+ '</p>');
						}
						// 
						// 
						// 
						// 
						// 
						// 
						// 
						// 
						// 
						// console.log(lyricStatic);
					}else{
						// 将歌词中的时间剪除，只余纯歌词
						for(let i = 0;i < lyricTime.length; i++){
							if(lyric.indexOf(lyricTime[i]) != -1){
								lyric.splice(lyric.indexOf(lyricTime[i]),1);
							}
						}
						// 剪除歌词开始反的无用数据
						// [by:箐谷霙][ti:][ar:][al:][by:九九Lrc歌词网～www.99Lrc.net]
						// console.log(clone.indexOf(lyric[0]));
						if(clone.indexOf(lyric[0]) == 0){
							lyric.splice(0,1);
						}
						// 去掉没有对应歌词的时间
						// ????????????????   给空余时间一个空的歌词对应？？？？？？？？
						// 
						// 
						// 
						// 
						// 
						Array.prototype.insert=function(index,item){
							this.splice(index,0,item);
						}
						for(let i = 0; i < lyricTime.length; i++){
							// 逻辑  首先，判断元素是否存在lyric之中，如果存在，继续判断在lyric当前元素的下一个元素是否存在于lyricTime之中，如果存在，就属于空闲时间，将之删除
							if(lyricTime.indexOf(clone[clone.indexOf(lyricTime[i])  + 1]) != -1){
								lyric.insert(i , '');
								// lyricTime.splice(i,1);
							}
						}
						// console.log(clone);
						// console.log(lyric);
						// console.log(lyricTime);
						lyricShow(lyric,lyricTime,size,thisTotal);
					}
					
				} 
				
				//歌词展示   ！歌词的各种格式真奇葩!!!!!!!
				function lyricShow(lyric,lyricTime,size,thisTotal){
					$('audio')[0].ontimeupdate = function(){
						// 播放时间
						let playTime;
						let currentTime = this.currentTime;
						let minute = Math.floor(currentTime / 60);
						let seconds = currentTime - 60 * minute;
						minute = minute >= 10 ? "[" + minute +":" : "[0" + minute + ":";
						seconds = Math.floor(seconds * 100) / 100;
						seconds = seconds >=10 ? seconds : "0" + seconds;
						let time = minute + seconds + "]";
						let duration = this.duration;
						for(let i = 0; i < lyricTime.length ; i++){
							if(lyricTime[i] == '[00:00.00]'){
								$(".lrc-show").text(lyric[i]);
							}else if(lyricTime[i] < '[00:01.00]' && lyricTime[i] > '[00:00.00]'){
								$(".lrc-show").text(lyric[i]);
							}
							else if(time >= lyricTime[i]){
								// console.log('123');
								// console.log(lyric[i]);
								if(time < lyricTime[i+1]){
									$(".lrc-show").empty().text(lyric[i]);
								}else{
									// 最后一句歌词
									$(".lrc-show").empty().text(lyric[i]);
								}
							} 
						}
						// console.log(time);
						// currentTime(currentTime);
						

						// console.log(duration);
						// 自动全部播放
						// if(currentTime == duration){
						if($("audio")[0].ended){
							size += 1;
							// songs函数顶端获取
							let id = songs[size].id;
							$.ajax({
								type: 'get',
								url: 'https://api.imjad.cn/cloudmusic',
								data: {
									type: 'song',
									id: id,
									br: '128000'
								},
								success: function(data){
									console.log('播放下一首');
									title(songs[size].name);
									$('audio')[0].src = data.data[0].url;
									$('img')[0].src = songs[size].al.picUrl;
									$('.lyric').css({'backgroundImage' : 'url(' + songs[size].al.picUrl + ')'});
									$("audio")[0].play();
									
									testtest(time.substring(1,time.length - 1).substring(0,5));
									// 	$('audio')[0].play();
									// 	let audio = $("audio")[0];
									// 	let duration = audio.duration;
									// 	let minute = Math.floor(duration / 60);
									// 	let minutes = minute < 10 ? '0' + minute :  minute;
									// 	let second = Math.round(duration - 60*minute);
									// 	let seconds = second < 10 ? '0' + second : second;
									// 	thisTotal = minutes + '/' + seconds;
									// 	console.log(thisTotal);
									
								}
							})
							


							comments(songs[size].id);
							getLyric(size,songs[size].id);
							$('.page li').css({'border':'none'});
						}
						// 
						// buffer缓冲长度 单位s
						let buffer = this.buffered.end(0);
						progress(buffer,currentTime,duration);
						// 总时长和当前播放时长显示
						playTime = time.substring(1,time.length - 1).substring(0,5);
						// thisTotal
						$(".right .this-time").text(playTime + '/' + thisTotal);
					}
					
				}
				
				function testtest(playTime){
					$('audio')[0].play();
					let audio = $("audio")[0];
					let duration = audio.duration;
					console.log(duration);
					let minute = Math.floor(duration / 60);
					let minutes = minute < 10 ? '0' + minute :  minute;
					let second = Math.round(duration - 60 * minute);
					let seconds = second < 10 ? '0' + second : second;
					let thisTotal = minutes + ':' + seconds;
					console.log(thisTotal);
				}


				// 绘制缓冲条和进度条
				function progress(buffer,current,duration){
					let percentage = buffer / duration;
					let percentage1 = current /duration;
					let width = $(".show").width() * percentage;
					let width1 = $(".show").width() * percentage1;
					$(".buffer").css({'width': width + 'px'});
					$(".prog").css({'width': width1 + 'px'});
				}







				// 获取评论
				function comments(id){
					// comments
					$.ajax({
						type: 'get',
						url: 'https://api.imjad.cn/cloudmusic/',
						data: {
							type: 'comments',
							id: id, 
							limit: '100',
							offset: '0'
						},
						success: function(data){
							// console.log('comments:',data);
							commentShow(data);
						}
					})
				}
				

				// 评论处理展示
				function commentShow(data){
					$(".comments").show();
					$(".comments .total").siblings().remove();
					let comments = data.comments;
					$(".comments .total").text('最新评论' +data.total+ '条');
					refreshComments(data);
					
					// 页数生成
					let pageNum = Math.ceil(data.total / comments.length);
					// 允许点击切换的按钮个数
					let touchNum = 9;
					if(pageNum > touchNum){
						let html = "";
						for(let i = 0; i < (touchNum - 2); i++){
							html += '<li>' + (i + 1) + '</li>'; 
						}
						html += '<li>···</li><li>' + pageNum + '</li>'
						$(".page ul").empty().append(html);
					}else{
						let html = "";
						for(let i = 0; i < pageNum; i++){
							html += '<li>' + (i + 1) +'</li>';
						}
						$(".page ul").empty().append(html);
					}
					// 默认时第一页显示
					$(".page ul li:first").addClass('active');
					// console.log(pageNum);
					// console.log(data.total);
				}

				
				// 评论翻页刷新
				// 
				function refreshComments(data,num) {
					$(".comments .total").siblings().remove();
					let comments = data.comments;
					// 判断，当点击显示评论时展示热评，当点击第一页时显示热评
					if(num == 1 || num == undefined){
						let hotComments = data.hotComments;
						$(".comments ul").append('<span class="title">精彩评论</span><hr>')
						commentsList(hotComments);
						$(".comments ul").append('<span class="title">最新评论</span><hr>');
					}
					commentsList(comments);
					// 循环评论列表
					function commentsList(comments){
						for(let i = 0; i < comments.length; i++){
							let li = document.createElement('li');
							if(comments[i].beReplied.length != 0){
								let html = 
									'<div class="avatar">' +
									'<a href="' + comments[i].user.avatarUrl+ '" target="_blank">' + '<img src="' + comments[i].user.avatarUrl + '">' + '</a>' +
									'</div>' +
									'<div class="comments-right" style="padding-left:15px">'+
										'<div class="content">' +
										'<a href="#">' + comments[i].user.nickname + ':' + '</a>' +
										'<span>' + comments[i].content + '</span>' +
										'</div>' +
											'<div class="reply">'+
											'<a href="#">@' + comments[i].beReplied[0].user.nickname + ':' + '</a>' + 
											'<span>' + (comments[i].beReplied[0].content || '此评论已被删除') +'<span>' +
										'</div>';

									html+='<div class="time">' + new Date(comments[i].time).toLocaleString()+ '</div>' +
										'<div class="action">' +'<span>喜欢(' +comments[i].likedCount+ ') | <span><span>分享 | </span><span>回复</span>'+'</div>' +
									'</div>'
								;
								$(li).append(html);
							}else{
								let html = 
									'<div class="avatar">' +
									'<a href="' + comments[i].user.avatarUrl+ '"target="_blank">' + '<img src="' + comments[i].user.avatarUrl + '">' + '</a>' +
									'</div>' +
									'<div class="comments-right" style="padding-left:15px">'+
										'<div class="content">' +
										'<a href="#">' + comments[i].user.nickname + ':' + '</a>' +
										'<span>' + comments[i].content + '</span>' +
										'</div>' +
										'<div class="time">' + new Date(comments[i].time).toLocaleString()+ '</div>' +
										'<div class="action">' +'<span>喜欢(' +comments[i].likedCount+ ') | <span><span>分享 | </span><span>回复</span>'+'</div>' +
									'</div>'
								;
								$(li).append(html);
							}
							$('.comments ul').append(li);
						}
					}
					
					let width = $($('.comments li')[0]).width() - $('.comments .avatar').width() - 30;
					$('.comments li .comments-right').css({'width':width + 'px'});
				}
				
				//翻页评论
				function pageComments(id){
					$('.page').bind('click',function(e){
						let target = e.target;
						if(target.nodeName == 'LI'){
							if($(target).text() != '···'){
								$(".page li").removeClass('active');
								let size = $(".page li:last").text();
								let num = Number($(target).text());
								let offset = (num - 1)*100;
								if(size > 9 ){
									// 当总页数超过9页，点击的页数大于等于5时
									if(num >= 5){
										if(num > size - 5){
											if(num < size - 3){
												$(".page li").eq(2).text(size - 6);
												$(".page li").eq(3).text(size - 5);
												$(".page li").eq(4).text(size - 4);
												$(".page li").eq(5).text(size - 3);
												$(".page li").eq(6).text(size - 2);
												$(".page li").eq(7).text('···');
												$(".page li").eq(8).text(size);
											}else{
												$(".page li").eq(1).text('···');
												$(".page li").eq(2).text(size - 6);
												$(".page li").eq(3).text(size - 5);
												$(".page li").eq(4).text(size - 4);
												$(".page li").eq(5).text(size - 3);
												$(".page li").eq(6).text(size - 2);
												$(".page li").eq(7).text(size - 1);
												$(".page li").eq(8).text(size);
											}
										}else{
											$($(".page li").eq(1)).text('···');
											$(".page li").eq(4).text(num);
											$(".page li").eq(3).text(num - 1);
											$(".page li").eq(2).text(num - 2);
											$(".page li").eq(5).text(num + 1);
											$(".page li").eq(6).text(num + 2);
										}
										
										$(".page li").each(function(){
											let text = Number($(this).text());
											if(text == num){
												let index = $(this).index();
												$($(".page li").eq(index)).addClass('active');
											}
										})
									}else{
										$(".page li").eq(1).text('2');
										$(".page li").eq(2).text('3');
										$(".page li").eq(3).text('4');
										$(".page li").eq(4).text('5');
										$(".page li").eq(5).text('6');
										$(target).addClass('active');
									}
									// 当总页数少于9页的时候，点击哪一页，就给哪一页添加样式
								}else{
									$(target).addClass('active');
								}

								$.ajax({
									type: 'get',
									url: 'https://api.imjad.cn/cloudmusic/',
									data: {
										type: 'comments',
										id: id, 
										limit: '100',
										offset: offset
									},
									success: function(data){
										refreshComments(data,num);
									}
								})
							}
						}
					})
				}
				//下载处理
				function download(name,href){
					$('.download a').attr({'href' : href , 'download' : name + '.mp3'});
				}
			}
			// 单曲循环
			$(".loop").click(function(){
				if($("audio")[0].loop){
					$("audio")[0].loop = false;
					$(this).css({'color':'#000'}).text('单曲循环');
				}else{
					$("audio")[0].loop = 'loop';
					$(this).css({'color':'#6cf'}).text('取消单循');
				}
				
			})
			// 返回页面顶部
			$('.top').click(function(){
				$('html,body').animate({scrollTop:0},200);
			})
			


			// setInterval(function(){
				// console.log(new Date().getSeconds());
			// },1000);
		})