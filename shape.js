function shape(canvas,cobj,xpc){
	this.canvas=canvas;
	this.xpc=xpc;
  console.log(typeof(this.xpc))
	this.cobj=cobj;
	this.history=[];
	this.fillStyle="red";
	this.strokeStyle="red";
	this.lineWidth=1;
	this.style="stroke";
	this.type="line";
	this.isback=true;
	this.bianNum=5;
	this.jiaoNum=5;
	this.xpsize=10;
}
shape.prototype={
	init:function(){
		this.cobj.fillStyle=this.fillStyle;
		this.cobj.strokeStyle=this.strokeStyle;
		this.cobj.lineWidth=this.lineWidth;
    this.isback=true;
    xpc.style.display="none";
	},
	draw:function(){
		var that=this;
		that.canvas.onmousedown=function(e){
			that.init();
			var e=e||window.event;
			var ox=e.offsetX;
			var oy=e.offsetY;
			that.canvas.onmousemove=function(e){
			var moveX=e.offsetX;
			var moveY=e.offsetY;
			that.cobj.clearRect(0,0,that.canvas.offsetWidth,that.canvas.offsetHeight);
			if (that.history.length!=0) {
				that.cobj.putImageData(that.history[that.history.length-1],0,0);

			}
			that[that.type](ox,oy,moveX,moveY);
		    }
		    that.canvas.onmouseup=function(){
			that.history.push(that.cobj.getImageData(0,0,that.canvas.offsetWidth,that.canvas.offsetHeight));
			that.canvas.onmousemove=null;
			that.canvas.onmouseup=null;
		    }
		}
	},
  pen:function(){
      var that=this;
      that.canvas.onmousedown=function(e){
      that.init();
      var e=e||window.event;
      var ox=e.offsetX;
      var oy=e.offsetY;
      that.cobj.beginPath();
      that.cobj.moveTo(ox,oy);
      that.canvas.onmousemove=function(e){
      var moveX=e.offsetX;
      var moveY=e.offsetY;
      that.cobj.lineTo(moveX,moveY);
      that.cobj.stroke();
      that[that.type](ox,oy,moveX,moveY);
      }
      that.canvas.onmouseup=function(){
      that.history.push(that.cobj.getImageData(0,0,that.canvas.offsetWidth,that.canvas.offsetHeight));
      that.canvas.onmousemove=null;
      that.canvas.onmouseup=null;
      }
    }
  },
	line:function(x,y,x1,y1){
       this.cobj.beginPath();
       this.cobj.moveTo(x,y);
       this.cobj.lineTo(x1,y1);
       this.cobj.stroke();
	},
	rect:function(x,y,x1,y1){
       this.cobj.beginPath();
       this.cobj.rect(x,y,x1-x,y1-y);
       this.cobj[this.style]();
    },
  circle:function(x,y,x1,y1){
       var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
       this.cobj.beginPath();
       this.cobj.arc(x,y,r,0,2*Math.PI);       //参数分别代表 圆心 半径 开始的角度 结束的角度
       this.cobj[this.style]();
  },
  bian:function(x,y,x1,y1){
     var a=360/this.bianNum*Math.PI/180;
       var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
       this.cobj.beginPath();
       for(var i=0;i<this.bianNum;i++){
         this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
       }
       this.cobj.closePath();
       this.cobj[this.style]();

  },
  jiao:function(x,y,x1,y1){
       var a=360/(this.jiaoNum*2)*Math.PI/180;
       var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
       var r1=r/3;
       this.cobj.beginPath();
       for(var i=0;i<this.jiaoNum*2;i++){
       	if (i%2==0) {
       		this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
       	}
       	else{
       		this.cobj.lineTo(x+r1*Math.cos(a*i),y+r1*Math.sin(a*i))
       	}
       }
       this.cobj.closePath();
       this.cobj[this.style]();
    },
  clear:function(){
    	var that=this;
    	that.canvas.onmousemove=function(e){
    		var moveX=e.offsetX;
    		var moveY=e.offsetY;
    		var left=moveX-that.xpsize/2;
        var top=moveY-that.xpsize/2+40;
    		if (left<0) {
    			left=0
    		}
    		if (left>that.canvas.offsetWidth-that.xpsize) {
    			left=that.canvas.offsetWidth-that.xpsize;
    		};
    		if (top<0) {
    			top=0;
    		};
    		if (top>that.canvas.offsetHeight-that.xpsize) {
    			top=that.canvas.offsetHeight-that.xpsize
    		};
    		xpc.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
    	}
    	that.canvas.onmousedown=function(){
    		that.canvas.onmousemove=function(e){
    			          var movex= e.offsetX;
                    var movey= e.offsetY;
                    var left=movex-that.xpsize/2;
                    var top=movey-that.xpsize/2+40;
                    if(left<0){
                        left=0;
                    }
                    if(left>that.canvas.offsetWidth-that.xpsize){
                        left=that.canvas.offsetWidth-that.xpsize
                    }
                    if(top<0){
                        top=0;
                    }
                    if(top>that.canvas.offsetHeight-that.xpsize){
                        top=that.offsetHeight-that.xpsize
                    }
                   xpc.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";

                    that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
    		}
        that.canvas.onmouseup=function(){
          that.history.push(that.cobj.getImageData(0,0,that.canvas.offsetWidth,that.canvas.offsetHeight))
          that.canvas.onmousemove=null;
          that.canvas.onmouseup=null;
          that.clear();
        }
    	}
    }
}
