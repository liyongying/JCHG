var game = {
    getArr: function(){
        var arr = [];
        while (arr.length < 16) {
            var num = parseInt((Math.random() * 16)+1);
            for (var i = 0; i < arr.length; i++) {
                if (num == arr[i]){break;}
            }
            if (i == arr.length) {
                arr.push(num)
            }
        }
        return arr;
    },
    reset:function(){
        var data = this.getArr();
        var html = '';
        for(var i=0; i< data.length;i++){
            html+='<li><img src="https://raw.githubusercontent.com/liyongying/JCHG/master/img/p'+data[i]+'.png" width="100px" data-position="'+(Number(i)+1) +'" draggable="true"/></li>'
        }
        $("ul").html(html);
    },
    open:function(){
        $("ul li").click(function(){
            $(this).find("img").css("opacity","1")
        });
    },



    go:function(){
        var self = this;
        var $object1=$("ul li img");
        var $object2=$("ul li");
        for(var i=0;i<$object1.length;i++){
            var o1=$object1[i];
            o1.ondragstart=function(e){
                $(this).css("border","1px solid yellow");
                e.dataTransfer.setData("Text", $(e.target).attr("src"));
                self.currentImg = $(e.target);

            };
            o1.ondrag=function(){
                $(this).css("","");
            };
            o1.ondragend=function(e){

            };
        }

        for(var i=0;i<$object2.length;i++){
            var o2=$object2[i];
            o2.ondragenter=function(){

            };
            o2.ondragover=function(e){
                e.preventDefault();
            };
            o2.ondragleave=function(){

            };
            o2.ondrop=function(e){
                e.preventDefault();
                var currentIndex = parseInt(self.currentImg.attr("src").slice(5,7));
                if(e.target.tagName == 'LI'){
                    var imgEl = $(e.target).find("img");
                } else {
                    var imgEl = $(e.target);
                }
                var index = parseInt(imgEl.attr("src").slice(5,7));
                if (currentIndex != index ) {
                    var src = e.dataTransfer.getData("Text");
                    imgEl.attr('src',src);
                    self.currentImg.attr("src", "");
                }

            };
        }
    },


    agree:function(){
        $("#peace").click(function(){
            window.location.reload();
        })
    },
    begin:function(){
        this.currentImg = null;
        this.reset();
        this.open();
        this.go();
        this.agree();
    }
}
game.begin();



