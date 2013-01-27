EasyDiscuss.module("discuss",function($){var module=this;window.isSave=!1;var discuss=window.discuss={location:{remove:function(e){disjax.loadingDialog(),disjax.load("location","removeLocation",e+"")},removeHTML:function(e){$("#location-"+e).remove()}},reply:{clear:function(e){$("textarea[name=dc_reply_content]").val(""),discuss.attachments.clear(),discuss.references.clear(form),$(form).find(".showCoords").removeClass("showCoords"),$(form).find(".locationMap").remove(),$(form).find("[name=latitude]").val(""),$(form).find("[name=longitude]").val("");var t=$(form).find(".polls-tab").controller();t&&$(form).find(".polls-tab").controller().resetPollForm()},submit:function(id){var token=$(".easydiscuss-token").val();action_url=discuss_site+"&view=post&layout=ajaxSubmitReply&format=ajax&tmpl=component&"+token+"=1",form=$("."+id).find("#dc_submit")[0];var replyNotification=$("."+id).find(".replyNotification"),iframe=document.createElement("iframe");iframe.setAttribute("id","upload_iframe"),iframe.setAttribute("name","upload_iframe"),iframe.setAttribute("width","0"),iframe.setAttribute("height","0"),iframe.setAttribute("border","0"),iframe.setAttribute("style","width: 0; height: 0; border: none;"),form.parentNode.appendChild(iframe),window.frames.upload_iframe.name="upload_iframe";var iframeId=document.getElementById("upload_iframe");$(".submit-reply").attr("disabled","disabled");var eventHandler=function(){var content;iframeId.detachEvent?iframeId.detachEvent("onload",eventHandler):iframeId.removeEventListener("load",eventHandler,!1),iframeId.contentDocument?content=iframeId.contentDocument:iframeId.contentWindow?content=iframeId.contentWindow.document:iframeId.document&&(content=iframeId.document),content=$(content).find("script#ajaxResponse").html();var result=$.parseJSON(content);switch(result.type){case"success.captcha":Recaptcha.reload();case"success":discuss.spinner.hide("reply_loading"),replyNotification.html(result.message).removeClass("alert-error").addClass("alert-success"),$(".discussionReplies .empty").hide();var count=$(".replyCount").html();count=parseInt(count)+1,$(".replyCount").html(count);var controller=$(".discussionReplies").controller();controller.addItem(result.html),discuss.attachments.initGallery({type:"image",helpers:{overlay:null}}),result.script!="undefined"&&eval(result.script),form.reset(),discuss.reply.clear(form);break;case"error":discuss.spinner.hide("reply_loading"),$(".submit-reply").removeAttr("disabled"),replyNotification.html(result.message).removeClass("alert-success").addClass("alert-error");break;case"error.captcha":Recaptcha.reload(),discuss.spinner.hide("reply_loading"),$(".submit-reply").removeAttr("disabled"),replyNotification.html(result.message).removeClass("alert-success").addClass("alert-error")}replyNotification.show(),$(".submit-reply").removeAttr("disabled"),setTimeout(function(){$(iframeId).remove()},250)};$(iframeId).load(eventHandler),form.setAttribute("target","upload_iframe"),form.setAttribute("action",action_url),form.setAttribute("method","post"),form.setAttribute("enctype","multipart/form-data"),form.setAttribute("encoding","multipart/form-data"),form.submit(),EasyDiscuss.repliesCount=EasyDiscuss.repliesCount===undefined?1:EasyDiscuss.repliesCount+1},verify:function(){$("#dc_notification .msg_in").html(""),$("#dc_notification .msg_in").removeClass("dc_error dc_success dc_alert"),disjax.loadingDialog(),disjax.load("post","checklogin")},post:function(){$(".submit-reply").attr("disabled","disabled"),$("#dc_notification .msg_in").html(""),$("#dc_notification .msg_in").removeClass("dc_error dc_success dc_alert"),discuss.spinner.show("reply_loading"),discuss.post.validate(!0,"reply")?disjax.load("post","ajaxSubmitReply",disjax.getFormVal("#dc_submit")):(discuss.spinner.hide("reply_loading"),$(".submit-reply").removeAttr("disabled"))},minimize:function(e){$("#dc_reply_"+e).hide(),$("#reply_minimize_msg_"+e).show()},maximize:function(e){$("#dc_reply_"+e).removeClass("is-minimized"),$("#reply_minimize_msg_"+e).hide()},addURL:function(e){var t=$(e).siblings("ul.attach-list").children(":first").clone(),n=$(".remove-url").clone();n.css("display","block"),$(t).find("input").val(""),$(t).find("a").show(),$(e).siblings("ul.attach-list").append(t)},removeURL:function(e){var t=$("ul.attach-list").children();if(t.length==1)return!1;$(e).parents("li").remove()},accept:function(e){disjax.loadingDialog(),disjax.load("post","confirmAccept",e)},reject:function(e){disjax.loadingDialog(),disjax.load("post","confirmReject",e)}},composer:{init:function(e,t){EasyDiscuss.require().script("composer").done(function(){$(e).implement(EasyDiscuss.Controller.Composer,t)})}},filter:function(e,t){EasyDiscuss.ajax("site.views.index.filter",{args:[e,t]},{beforeSend:function(){discuss.spinner.show("index-loading"),$("#dc_list").hide(),$("#dc_pagination").hide(),$("#filter-links").children().removeClass("active")},success:function(e,t,n,r,i,s){e&&$("#dc_featured_list").show(),$("#dc_list").html(t),$("#sort-wrapper").html(),$("#pagination-filter").val(r),$("#pagination-start").val(i),$("#dc_pagination").html(s)},complete:function(){discuss.spinner.hide("index-loading"),$("#dc_list").show(),$("#dc_pagination").show(),$("#filter-links").find("."+e).addClass("active")}})},sort:function(e,t,n){discuss.spinner.show("index-loading"),discuss_featured_style=="2"&&t!="allposts"&&$("#dc_featured_list").hide(),$("#dc_list").hide(),$("#dc_pagination").hide(),$("#sort-links").children().removeClass("active"),$("#sort-links").find("."+e).addClass("active"),disjax.load("index","sort",e,t,n)},references:{clear:function(e){var t=$(e).find(".field-references ul.attach-list"),n=t.children(":first").clone();t.empty().append(n)}},attachments:{initGallery:function(e){$(".attachment-image-link").fancybox(e)},clear:function(){$(".uploadQueue").empty()}},map:{render:function(e,t,n,r){var i=new google.maps.LatLng(t,n),s=new google.maps.Map(document.getElementById(r),{zoom:12,center:i,mapTypeId:google.maps.MapTypeId.ROADMAP}),o=new google.maps.Marker({position:i,center:i,title:e,map:s})}},widget:{init:function(){$(".widget-toggle").click(function(){$(this).parents(".discuss-widget").find(".widget-body").toggle(),$(this).parents(".discuss-widget").toggleClass("is-hidden")})}},post:{move:function(e){disjax.loadingDialog(),disjax.load("post","movePost",e)},mergeForm:function(e){disjax.loadingDialog(),disjax.load("post","mergeForm",e)},feature:function(e){disjax.loadingDialog(),disjax.load("post","confirmFeature",e)},unfeature:function(e){disjax.loadingDialog(),disjax.load("post","confirmUnfeature",e)},submit:function(){if($("#dc_submit #category_id").val()=="0")return disjax.loadingDialog(),disjax.load("index","getTemplate","ajax.selectcategory.php"),!1;$("#createpost").attr("disabled","disabled"),document.dc_submit.submit()},qqSubmit:function(){if($("#category_id").val()=="0")return disjax.loadingDialog(),disjax.load("index","getTemplate","ajax.selectcategory.php"),!1;$("#createpost").attr("disabled","disabled"),document.mod_edqq.submit()},postTopicSubmit:function(){if($("#category_id").val()=="0")return disjax.loadingDialog(),disjax.load("index","getTemplate","ajax.selectcategory.php"),!1;$("#createpost").attr("disabled","disabled"),document.mod_post_topic.submit()},reply:function(){return discuss.post.validate(!0,"reply")&&(finalData=disjax.getFormVal("#dc_submit"),disjax.load("Post","ajaxSubmitReply",finalData)),!1},validate:function(e,t){if(!e)if($("#ez-title").val()==""||$("#ez-title").val()==langPostTitle)return t=="reply"?($("#dc_notification .msg_in").html(langEmptyTitle),$("#dc_notification .msg_in").addClass("dc_error")):($("#dc_post_notification .msg_in").html(langEmptyTitle),$("#dc_post_notification .msg_in").addClass("dc_error")),!1;return!0},del:function(e,t,n){disjax.loadingDialog(),disjax.load("post","deletePostForm",e,t,n)},vote:{add:function(e,t,n){disjax.load("Post","ajaxAddVote",e,t)},check:function(e){disjax.load("Post","ajaxSumVote",e)},view:function(e){disjax.load("Post","ajaxViewVote",e,"")}},lock:function(e){disjax.load("Post","ajaxLockPost",e)},unlock:function(e){disjax.load("Post","ajaxUnlockPost",e)},resolve:function(e){disjax.load("Post","resolve",e)},unresolve:function(e){disjax.load("Post","unresolve",e)},likes:function(e,t,n){disjax.load("Post","ajaxLikes",e,t,n)},replyLikes:function(e,t,n){disjax.load("Post","ajaxReplyLikes",e,t,n)},featured:function(e,t){disjax.load("Post","ajaxFeatured",e,t)},toggleTools:function(e,t,n){e?($(".post_delete_link").show(),$(".likes").show(),$(".comments").show(),$(".vote_up").show(),$(".vote_down").show(),$("#dc_main_reply_form").show()):(discuss.comment.cancel(),n=="1"?$(".post_delete_link").show():$(".post_delete_link").hide(),$(".likes").hide(),$(".comments").hide(),$(".vote_up").hide(),$(".vote_down").hide(),$("#dc_main_reply_form").hide())},attachment:{remove:function(e){$("#button-delete-att-"+e).attr("disabled","disabled"),disjax.load("post","deleteAttachment",e)}}},login:{verify:function(){if(!discuss.post.validate(!1,"reply"))return!1;$("#submit").attr("disabled","disabled"),disjax.loadingDialog(),disjax.load("post","checklogin")},token:"",showpane:function(e){$("#usertype_pane_right").children().hide(),$("#usertype_pane_left").children(),$("#usertype_member").removeClass("active"),$("#usertype_guest").removeClass("active"),$("#discuss_register").removeClass("active"),$("#usertype_twitter").removeClass("active"),$("#usertype_status .msg_in").html(""),$("#usertype_status .msg_in").removeClass("dc_error");switch(e){case"guest":$("#usertype_guest").addClass("active"),$("#usertype_guest_pane_wrapper").show();break;case"register":$("#discuss_register").addClass("active"),$("#discuss_register_pane_wrapper").show();break;case"twitter":$("#usertype_twitter").addClass("active"),$("#usertype_twitter_pane_wrapper").show();break;case"member":default:$("#usertype_member").addClass("active"),$("#usertype_member_pane_wrapper").show()}},submit:{reply:function(e){switch(e){case"guest":$("#edialog-guest-reply").attr("disabled","disabled");var t=$("#discuss_usertype_guest_email").val(),n=$("#discuss_usertype_guest_name").val();disjax.load("post","ajaxGuestReply",t,n);break;case"member":$("#edialog-member-reply").attr("disabled","disabled");var r=$("#discuss_usertype_member_username").val(),i=$("#discuss_usertype_member_password").val(),s=discuss.login.token;disjax.load("post","ajaxMemberReply",r,i,s);break;case"twitter":$("#edialog-twitter-reply").attr("disabled","disabled"),disjax.load("post","ajaxTwitterReply");break;default:}}},getGuestDefaultName:function(){var e=$("#discuss_usertype_guest_email").val();$("#discuss_usertype_guest_name").val(e.split("@",1))},twitter:{signin:function(e,t){e?disjax.load("post","ajaxRefreshTwitter"):alert("failed")},signout:function(){disjax.load("post","ajaxSignOutTwitter")}}},files:{add:function(){jQuery("#file_contents div").before('<input type="file" name="filedata[]" id="filedata" size="50" />')}},pagination:{more:function(e){e=="questions"?disjax.load("index","ajaxReadmore",$("#pagination-start").val(),$("#pagination-sorting").val(),e,$("#discuss_parent").val(),$("#pagination-filter").val(),$("#pagination-category").val(),$("#pagination-query").val()):disjax.load("index","ajaxReadmore",$("#pagination-start").val(),$("#pagination-sorting").val(),e,$("#discuss_parent").val(),$("#pagination-filter").val(),$("#pagination-category").val())},addButton:function(e,t){html='<a href="javascript:void(0);" onclick="discuss.pagination.more( \''+e+"' );\"><span>"+t+"</span></a>",$("#dc_pagination a").length<1&&$("#dc_pagination").prepend(html)}},comment:{save:function(e){discuss.spinner.show("discussSubmitWait"),finalData=disjax.getFormVal("#frmComment"+e),disjax.load("Post","ajaxSubmitComment",finalData)},add:function(e,t){$(t).toggleClass("active"),$("#comment-action-container-"+e).toggle(),$("#err-msg .msg_in").html(""),$("#comment-notification-"+e+" .msg_in").html(""),$("#comment-notification-"+e+" .msg_in").removeClass("alert alert-error success")},clearForm:function(e){$("#comment-err-msg .msg_in").html(""),$("#comment-err-msg .msg_in").removeClass("alert alert-error success"),$("#comment").val(""),$("#comment-action-container-"+e).hide()},cancel:function(e){$("#comment-err-msg .msg_in").html(""),$("#comment-err-msg .msg_in").removeClass("dc_alert dc_error dc_success"),$("#comment-notification-"+e+" .msg_in").html(""),$("#comment-notification-"+e+" .msg_in").removeClass("alert alert-error success"),$("#comment").val(""),$("#comment-action-container-"+e).hide(),$("#comments-button-"+e).show()},remove:function(e){var t="Are you sure?";if(!window.confirm(t))return!1;disjax.load("Post","ajaxCommentDelete",e),EasyDiscuss.commentsCount=EasyDiscuss.commentsCount===undefined?0:EasyDiscuss.commentsCount-1},removeEntry:function(e){$("#comment-"+e).remove()}},reports:{add:function(e){disjax.loadingDialog(),disjax.load("post","reportForm",e)},cancel:function(){disjax.closedlg()},submit:function(){disjax.load("post","ajaxSubmitReport",disjax.getFormVal("#frmReport"))},revertForm:function(e){effect.highlight("#post_content_layout_"+e),setTimeout(function(){discuss.reports.cancel()},4e3)}},element:{focus:function(e){ele="#"+e,$(ele).focus()}},spinner:{show:function(e){var t=new Image;t.src=spinnerPath,t.name="discuss-loading",t.id="discuss-loading",$("#"+e).html(t),$("#"+e).show()},hide:function(e){$("#"+e).hide()}},system:{redirect:function(e){window.location=e},refresh:function(){window.location.reload()}},subscribe:{post:function(e){var t="post",n=$("#subscribe_email").val(),r=$("#subscribe_name").val(),i="instant";discuss.spinner.show("dialog_loading"),disjax.load("post","ajaxAddSubscription",t,n,r,i,e+"")},site:function(){var e="site",t=$("#subscribe_email").val(),n=$("#subscribe_name").val(),r=$("input:radio[name=subscription_interval]:checked").val(),i="0";discuss.spinner.show("dialog_loading"),disjax.load("index","ajaxAddSubscription",e,t,n,r,i+"")},tag:function(e){var t="tag",n=$("#subscribe_email").val(),r=$("#subscribe_name").val(),i=$("input:radio[name=subscription_interval]:checked").val();discuss.spinner.show("dialog_loading"),disjax.load("index","ajaxAddSubscription",t,n,r,i,e+"")},category:function(e){var t="category",n=$("#subscribe_email").val(),r=$("#subscribe_name").val(),i=$("input:radio[name=subscription_interval]:checked").val();discuss.spinner.show("dialog_loading"),disjax.load("index","ajaxAddSubscription",t,n,r,i,e+"")},user:function(e){var t="user",n=$("#subscribe_email").val(),r=$("#subscribe_name").val(),i=$("input:radio[name=subscription_interval]:checked").val();discuss.spinner.show("dialog_loading"),disjax.load("index","ajaxAddSubscription",t,n,r,i,e+"")}},user:{tabs:{show:function(e,t,n){discuss.spinner.show("profile-loading"),$(".user-tabs ul li").removeClass("active"),$(e).parent().addClass("active"),$("#dc_profile .tab-item").hide(),$("#dc_pagination").hide();var r=$("#profile-id").val();n?disjax.load("profile","filter",t,r):$("#dc_profile ."+t).show()}},checkAlias:function(){var e=$("#profile-alias").val();e!=""&&disjax.load("profile","ajaxCheckAlias",e)}},tooltips:{init:function(){},execute:function(e,t){}},notifications:{interval:3e3,monitor:null,count:null,startMonitor:function(){var e=discuss.notifications;e.monitor=setTimeout(e.update,e.interval)},stopMonitor:function(){clearTimeout(discuss.notifications.monitor)},update:function(){var e=discuss.notifications;e.stopMonitor();var t={};t[$(".easydiscuss-token").val()]=1,EasyDiscuss.ajax("site.views.notifications.count",t,{type:"jsonp",success:function(t){t==0&&$("#notification-count").hide();if(t==0||!t)return;e.count!=t&&$("#notification-count").html(t),t>0&&$("#notification-count").show(),e.count=t},complete:function(){e.startMonitor()}})}},conversation:{interval:3e3,monitor:null,count:null,startMonitor:function(){var e=discuss.conversation;e.monitor=setTimeout(e.update,e.interval)},stopMonitor:function(){clearTimeout(discuss.conversation.monitor)},update:function(){var e=discuss.conversation;e.stopMonitor();var t={};t[$(".easydiscuss-token").val()]=1,EasyDiscuss.ajax("site.views.conversation.count",t,{type:"jsonp",success:function(t){t==0&&$("#conversation-count").hide();if(t==0||!t)return;e.count!=t&&$("#conversation-count").html(t),t>0&&$("#conversation-count").show(),e.count=t},complete:function(){e.startMonitor()}})},reply:function(e){EasyDiscuss.ajax("site.views.conversation.reply",{id:e}).done(function(){})},write:function(e){disjax.load("conversation","write",e)},send:function(){var e=$("#conversationMessage").val(),t=$("#recipientId").val();if(!e)return console.log($("#conversationEmptyMessage")),$("#conversationEmptyMessage").show(),!1;disjax.load("conversation","save",e,t)}},polls:{show:function(){$("#discuss-polls").toggle(),$("#discuss-multiple-polls").toggle(),$("#discuss-multiple-polls-title").toggle()},vote:function(e){var t=$(e).val();disjax.load("polls","vote",t)},unvote:function(e){disjax.load("polls","unvote",e)},showVoters:function(e){disjax.load("polls","getvoters",e)}},tabs:{show:function(e,t){$(".form-tab-item").hide(),$(e).parent().siblings().removeClass("active"),$(e).parent().addClass("active"),$(".tab-"+t).show()}},toolbar:{login:function(){$("#dc_toolbar .to_login div.toolbar-note").toggle()}}};window.effect=effect={highlight:function(e){setTimeout(function(){$(e).animate({backgroundColor:"#ffff66"},300).animate({backgroundColor:"transparent"},1500)},500)}},disjax=window.disjax=disjax={http:!1,format:"text",callback:function(e){},error:!1,btnArray:[],getHTTPObject:function(){var e=!1;if(typeof ActiveXObject!="undefined")try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(n){e=!1}}else if(XMLHttpRequest)try{e=new XMLHttpRequest}catch(t){e=!1}this.http=e},load:function(view,method){var callback={};typeof view=="object"&&(callback=view.callback,view=view.view),url=discuss_site,url+="&tmpl=component",url+="&no_html=1",url+="&format=ajax",url+="&uid="+(new Date).getTime();var parameters="";parameters="&view="+view+"&layout="+method;if(arguments.length>2)for(var i=2;i<arguments.length;i++){var myArgument=arguments[i];if($.isArray(myArgument))for(var j=0;j<myArgument.length;j++){var argument=myArgument[j];if(typeof argument=="string"){var expr=/^\w+\(*\)$/,match=expr.exec(argument),arg=argument;match||(arg=escape(arg)),parameters+="&value"+(i-2)+"[]="+encodeURIComponent(arg)}}else{var argument=myArgument;if(typeof argument=="string"){var expr=/^\w+\(*\)$/,match=expr.exec(argument),arg=argument;match||(arg=escape(arg)),parameters+="&value"+(i-2)+"="+encodeURIComponent(arg)}}}var token=$(".easydiscuss-token").val();parameters+="&"+token+"=1",this.getHTTPObject();if(!this.http||!view||!method)return;var ths=this;this.http.open("POST",url,!0),this.http.setRequestHeader("Content-type","application/x-www-form-urlencoded"),this.http.setRequestHeader("Content-length",parameters.length),this.http.setRequestHeader("Connection","close"),this.http.onreadystatechange=function(){if(!ths)return;var http=ths.http;if(http.readyState==4)if(http.status==200){var result="";http.responseText&&(result=http.responseText),result=result.replace(/[\n\r]/g,""),result=eval(result),ths.process(result,callback)}else ths.error&&ths.error(http.status)},this.http.send(parameters)},getFormVal:function(e){var t=[],n=null;return $(":input",$(e)).each(function(){n=this.value.replace(/"/g,"&quot;"),n=encodeURIComponent(n),$(this).is(":checkbox")||$(this).is(":radio")?$(this).attr("checked")&&t.push(this.name+"="+escape(n)):t.push(this.name+"="+escape(n))}),t},process:function(result,callback){if(typeof callback=="function")return callback.apply(this,result);for(var i=0;i<result.length;i++){var action=result[i][0];switch(action){case"script":var data=result[i][1];eval(data);break;case"after":var id=result[i][1],value=result[i][2];$("#"+id).after(value);break;case"append":var id=result[i][1],value=result[i][2];$("#"+id).append(value);break;case"assign":var id=result[i][1],value=result[i][2];$("#"+id).html(value);break;case"value":var id=result[i][1],value=result[i][2];$("#"+id).val(value);break;case"prepend":var id=result[i][1],value=result[i][2];$("#"+id).prepend(value);break;case"destroy":var id=result[i][1];$("#"+id).remove();break;case"dialog":disjax.dialog(result[i][1]);break;case"alert":disjax.alert(result[i][1],result[i][2],result[i][3]);break;case"create":}}delete result},loadingDialog:function(){disjax.dialog({title:$.language("COM_EASYDISCUSS_LOADING"),loading:!0})},dialog:function(e){disjax._showPopup(e)},closedlg:function(){var e=$("#discuss-dialog"),t=$("#discuss-overlay");t.hide(),e.unbind(".dialog").hide(),$(document).unbind("keyup",disjax._attachPopupShortcuts)},_showPopup:function(e){var t={width:"500",height:"auto",type:"dialog",loading:!1},e=$.extend({},t,e),n=$("#discuss-dialog");n.length<1&&(dialogTemplate='<div id="discuss-dialog" class="modal"><div class="modal-header"><a href="javascript:void(0);" aria-hidden="true" onclick="disjax.closedlg();" class="close">x</a><h3 class="modal-title"></h3></div><div class="modal-body"></div><div class="modal-footer"></div>',n=$(dialogTemplate).appendTo("body")),n.fadeOut(0),e.loading?n.addClass("modal-loading"):n.removeClass("modal-loading");var r=n.children(".modal-body");typeof e.title=="string"?n.find("h3.modal-title").html(e.title):n.find("h3.modal-title").html("&nbsp;"),$.isArray(e.buttons)?(n.find(".modal-footer").html("").show(),$(e.buttons).each(function(e,t){var r=t.className,i=t.title,s=t.action,o=t.form,u=$('<a href="javascript:void(0);">').addClass("btn "+r).html(i);s&&$(u).attr("onclick",s),o&&$(u).bind("click",function(){$(o).submit()}),n.find(".modal-footer").append(u)})):n.find(".modal-footer").hide(),r.html(e.content),n.css({width:e.width=="auto"?"auto":parseInt(e.width),height:e.height=="auto"?"auto":parseInt(e.height),margin:0,zIndex:99999}).show(0,function(){var e=function(){n.css({top:($(window).height()-n.height())/2,left:($(window).width()-n.width())/2})},t;$(window).bind("resize.dialog scroll.dialog",function(){clearTimeout(t),t=setTimeout(e,50)}),e()}),$("#edialog-cancel, #edialog-submit").live("mouseup",function(){disjax.closedlg()}),$(document).bind("keyup",disjax._attachPopupShortcuts)},_attachPopupShortcuts:function(e){e.keyCode==27&&disjax.closedlg()}},module.resolve()}),EasyDiscuss.require().library("bootstrap").done(function(e){e("[rel=ed-tooltip]").tooltip({animation:!1,container:"body",template:'<div class="tooltip tooltip-ed"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}),e("[rel=ed-popover]").popover({container:"body",delay:{show:100,hide:100},animation:!1,trigger:"hover"})}),EasyDiscuss.require().script("toolbar","responsive").done(function(e){e("#discuss-wrapper").responsive({at:818,switchTo:"w768"}),e("#discuss-wrapper").responsive({at:600,switchTo:"w600"}),e("#discuss-wrapper").responsive({at:500,switchTo:"w320"}),e(".discuss-searchbar").responsive({at:650,switchTo:"narrow"})});