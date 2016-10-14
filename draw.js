$(function(){
	var canvas=document.querySelector("canvas");
	var type_li=$(".type li");
	var style_li=$(".style li");
	var strokeColor=$(".strokeColor");
	var fillColor=$(".fillColor");
	var hidden=$(".hidden");
	var back=$(".back");
	var getLine=$(".getLine");
	var lineWidth=$(".lineWidth");
	var xpc=$("#xpc");
	var cobj=canvas.getContext("2d");
	var obj=new shape(canvas,cobj);
	back.click(function(){
		if(obj.history.length==0){
				 obj.cobj.clearRect(0,0,canvas.width,canvas.height);
				 alert("不能后退");
				 return;
		}
		if (obj.isback) {
				if (obj.history.length==1) {
					obj.history.pop();
					obj.cobj.clearRect(0,0,canvas.width,canvas.height);
				}
				else{
					obj.history.pop();
                    obj.cobj.putImageData(obj.history.pop(),0,0);
				}
		}
		else{
                obj.cobj.putImageData(obj.history.pop(),0,0);
            }
            obj.isback=false;
	})
	type_li.hover(function(){
		var index=$(this).index();
		$(this).css("background","#747474");
		hidden.eq(index).css("opacity","1");
	},function(){
        var index=$(this).index(type_li);
        $(this).css("background","#ccc");
        hidden.css("opacity","0");
	})
	type_li.click(function(){
		var index=$(this).index;
		obj.draw();
		obj.type=$(this).attr("data-role");
	})
	type_li.eq(3).click(function(){
		obj.draw();
		obj.type=$(this).attr("data-role");
		obj.bianNum=prompt("请输入边数",5);
	})
	type_li.eq(4).click(function(){
		obj.draw();
		obj.type=$(this).attr("data-role");
		obj.jiaoNum=prompt("请输入角数",5);
	})
	var flag2=true;
	type_li.eq(5).click(function(){
		if (flag2) {
		obj.draw();
		obj.type=$(this).attr("data-role");
		$(".xpHidden").css("display","block");
		$(".icon-xiangpica").css("display","none");
		flag2=false;
		}
		else{
			obj.draw();
		obj.type=$(this).attr("data-role");
		$(".xpHidden").css("display","none");
		$(".icon-xiangpica").css("display","block");
          flag2=true;
		}
		
		// xpc.css("display","block");
	})
	type_li.eq(6).click(function(){
		obj.pen();
		obj.type=$(this).attr("data-role");
	})
	type_li.eq(8).click(function(){
		if(obj.history.length>0){
			location.href=canvas.toDataURL().replace("image/png","stream/octet");
		}
		else{
			alert("画板为空！");
		}
	})
	type_li.eq(9).click(function(){
		if(obj.history.length>0){
			var yes=confirm("是否保存");
			if (yes==true) {
				location.href=canvas.toDataURL().replace("image/png","stream/octet");
				obj.history=[];
				obj.cobj.clearRect(0,0,canvas.width,canvas.height);
			}
			else{
                obj.history=[];
				obj.cobj.clearRect(0,0,canvas.width,canvas.height);
			}
		}
	})
	$(".li").click(function(){
		var index=$(this).index(".li");
		$(".li").css({"color":"#000","background":"#ccc"}).eq(index).css({"color":"red","background":"#e1e2e4"});
	})
	style_li.click(function(){
		obj.style=$(this).attr("data-role");
		obj.draw();
	})
	strokeColor.change(function(){
		obj.strokeStyle=$(this).val();
	    obj.draw();
	})
	fillColor.change(function(){
		obj.fillStyle=$(this).val();
	    obj.draw();
	})
	lineWidth.change(function(){
		getLine.html($(this).val());
	    obj.lineWidth=$(this).val();
        obj.draw();
	})
	$(".xpHidden").change(function(){
		obj.xpsize=$(this).val();
		obj.draw();
	})
	var flag=true;
    $(".widthLine").click(function(){
        	if(flag){
        		$(".menu").css({display:"block",zIndex:"888"});
        		flag=false;
        	}
        	else{
        		$(".menu").css("display","none");
        		flag=true;
        	}
           
     })
    $(".start").click(function(){
    	$(".type").css({
    		height:135,
    		visibility:"visible"
    	})
    	$(".type li").each(function(index,obj){
    		$(obj).css("transition","all 0.4s ease "+index*0.2+"s");
    	}).css({
                opacity:1,
                transform:"rotateY(0deg) scale(1,1)"
            });
    	$(this).css("display","none");
    	$(".close").css("display","block");
    })
    $(".close").click(function(){
    	
    	if(obj.history.length>0){
			var yes=confirm("是否保存");
			if (yes==true) {
				location.href=canvas.toDataURL().replace("image/png","stream/octet");
				obj.history=[];
				obj.cobj.clearRect(0,0,canvas.width,canvas.height);
				$(".type").css({
    			height:0,
    			visibility:"hidden"
    			})
		    	$(".type li").each(function(index,obj){
		    		$(obj).css("transition","all 0.4s ease "+index*0.2+"s");
		    	}).css({
		                opacity:0,
		                transform:"rotateY(60deg) scale(1,0.3)"
		            });
		    	$(this).css("display","none");
		    	$(".start").css("display","block");
			}
			else{
                obj.history=[];
				obj.cobj.clearRect(0,0,canvas.width,canvas.height);
				$(".type").css({
		    	height:0,
		    	visibility:"hidden"
		    	})
		    	$(".type li").each(function(index,obj){
		    		$(obj).css("transition","all 0.4s ease "+index*0.2+"s");
		    	}).css({
		                opacity:0,
		                transform:"rotateY(60deg) scale(1,0.3)"
		            });
		    	$(this).css("display","none");
		    	$(".start").css("display","block");
			}
		}
		else{
			$(".type").css({
		    	height:0,
		    	visibility:"hidden"
		    	})
		    	$(".type li").each(function(index,obj){
		    		$(obj).css("transition","all 0.4s ease "+index*0.2+"s");
		    	}).css({
		                opacity:0,
		                transform:"rotateY(60deg) scale(1,0.3)"
		            });
		    	$(this).css("display","none");
		    	$(".start").css("display","block");
		}
    })
				
  
})