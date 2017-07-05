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
			// mv搜寻
			$("#query").click(function(){
				let key = $(".mv input").val().trim();
				$.ajax({
					type: 'get',
					url: 'https://api.imjad.cn/cloudmusic',
					data: {
						type: 'mv',
						s: key,
						search_type: 1004
					},
					success: function(data){
						console.log(data);
					}
				})
			})
			// 
			// 
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
							s: key
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

			function music(data,key){
				var songs = data.result.songs;
				console.log(songs);				
				for(let i = 0; i < data.result.songs.length ; i++){
					let html = "<tr>"+
							"<td>" + songs[i].al.name + "</td>"+
							"<td>" + songs[i].name + "</td>"+
							"<td>" + songs[i].ar[0].name + "</td>"+
							"<td> 时间 </td>"+
							"</tr>"
					;
					$("tbody").append(html);
					function source(data){
						let sour0ce = data.data[0].url;
						audio.src = source;
					}
				}
				
				//点击播放
				$("tbody tr").click(function(){
					let size = $(this).index();
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
							play(data,size);
							// 保证ajax按顺序返回 getLyric
							getLyric(size,id);
							//获取第一页评论
							comments(id);
							//翻页评论
							pageComments(id);
						},
						error: function(xhr,status,statusText){
								console.log(xhr.status);
								console.log(xhr.statusText);
						}
					})
				})

				// 获取歌词
				function getLyric(size,id){
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
								 	parseLyric(lyric,size);
								}else{
									console.log('没歌词');
									$('.lrc-show').text('没有歌词');
								}
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
						audio.controls = 'controls';
						img.src = songs[size].al.picUrl;
						$('.lyric').css({'background' : 'url(' + songs[size].al.picUrl + ')'});
						$('.controls').append(img).append(audio);
						$('audio')[0].play();
					}
					// 下载处理
					download(songs[size].name,data.data[0].url);
				}
				
				// 歌词处理	
				function parseLyric(text,size){
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
						console.log(lyric);
						console.log(lyricTime);
						lyricShow(lyric,lyricTime,size);
					}
					
				} 
				
				//歌词展示   ！歌词的各种格式真奇葩!!!!!!!
				function lyricShow(lyric,lyricTime,size){
					$('audio')[0].ontimeupdate = function(){
						let currentTime = this.currentTime;
						let minute = Math.floor(currentTime / 60);
						let seconds = currentTime - 60 * minute;
						minute = minute >= 10 ? "[" + minute +":" : "[0" + minute + ":";
						seconds = Math.floor(seconds * 100) / 100;
						seconds = seconds >=10 ? seconds : "0" + seconds;
						let time = minute + seconds + "]";
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
						// 自动全部播放
						if(currentTime == this.duration){
							size += 1;
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
									$('audio')[0].src = data.data[0].url;
									$('img')[0].src = songs[size].al.picUrl;
									$('.lyric').css({'backgroundImage' : 'url(' + songs[size].al.picUrl + ')'});
									$('audio')[0].play();
								}
							})
							comments(songs[size].id);
							getLyric(size,songs[size].id);
							$('.page li').css({'border':'none'});
						}
					}
					
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
					let touchNum = 8;
					if(pageNum > touchNum){
						let html = "";
						for(let i = 0; i < (touchNum - 2); i++){
							html += '<li>' + (i + 1) + '</li>'; 
						}
						html += '<li>···</li><li>' + pageNum + '</li>'
						$(".page ul").empty().append(html);
						console.log(html);
					}else{
						let html = "";
						for(let i = 0; i < pageNum; i++){
							html += '<li>' + (i + 1) +'</li>';
						}
						$(".page ul").empty().append(html);
					}
					console.log(pageNum);
					console.log(data.total);
				}

				// 评论翻页刷新
				// 
				function refreshComments(data) {
					$(".comments .total").siblings().remove();
					let comments = data.comments;
					for(let i = 0; i < comments.length; i++){
						let li = document.createElement('li');
						if(comments[i].beReplied.length != 0){
							let html = 
								'<div class="avatar">' +
								'<a href="#">' + '<img src="' + comments[i].user.avatarUrl + '">' + '</a>' +
								'</div>' +
								'<div class="comments-right" style="padding-left:15px">'+
									'<div class="content">' +
									'<a href="#">' + comments[i].user.nickname + ':' + '</a>' +
									'<span>' + comments[i].content + '</span>' +
									'</div>' +
										'<div class="reply">'+
										'<a href="#">@' + comments[i].beReplied[0].user.nickname + ':' + '</a>' + 
										'<span>' + comments[i].beReplied[0].content +'<span>' +
									'</div>';

								html+='<div class="time">' + new Date(comments[i].time).toLocaleString()+ '</div>' +
									'<div class="action">' +'<span>喜欢(' +comments[i].likedCount+ ') | <span><span>分享 | </span><span>回复</span>'+'</div>' +
								'</div>'
							;
							$(li).append(html);
						}else{
							let html = 
								'<div class="avatar">' +
								'<a href="#">' + '<img src="' + comments[i].user.avatarUrl + '">' + '</a>' +
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
					let width = $($('.comments li')[0]).width() - $('.comments .avatar').width() - 20;
					$('.comments li .comments-right').css({'width':width + 'px'});	
				}
				
				//翻页评论
				function pageComments(id){
					$('.page').bind('click',function(e){
						let target = e.target;
						if(target.nodeName == 'LI'){
							$('.page li').css({'border':'none'});
							$(target).css({'border':'1px solid #765065'});
							let size = $(".page li:last").text();
							if(size > 8 ){
								if($(target).text() >= 4){
									$($(".page li").eq(1)).text('···');
								}
							}
							let num = Number($(target).text());
							let offset = (num - 1)*100;
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
									refreshComments(data);
								}
							})
						}
					})
				}

				

				//下载处理
				function download(name,href){
					$('.download a').attr({'href' : href , 'download' : name + '.mp3'});
				}
			}

			// 返回页面顶部
			$('.top').click(function(){
				$('html,body').animate({scrollTop:0},200);
			})
			
		})