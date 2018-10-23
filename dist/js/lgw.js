// $(function(){


function WaterFall(){}
$.extend(WaterFall.prototype,{
    init:function(){
        // 页数;
        this.page = 1;
        // 结构外包围;
        this.main = $("#wrap");
        // 是否在加载中;
        this.loading = false;

        this.loadJson()
        .done(function(res){
            // deferred 的 done 回调 this指向的都是 jquery 对象本身
            // console.log(res,this);
            this.renderPage(res);
        })

        // this.bindEvent();
    },
    loadJson:function(){
        var opt = {
            url:"lgw.json",
            dataType:"jsonp",
            data:{page:this.page},
            // this => 指向实例化对象;
            context:this
        }
        return $.ajax(opt);
    },
    renderPage:function(json){
        // console.log(json);
        var html = "";
        for(var i = 0 ; i < json.length ; i ++){
        // var pro = json[i];
        //     var height = json[i].height / (json[i].width / 220);
        //     if(isNaN(height)) continue; 
            html += `   <div class="con1 clearfix">
                        <img src="img/${json[i].companyLogo}" alt="">
                        <div class="con1-center">
                                <a href="http://localhost:8080/list.html" target="_blank">${json[i].companyName}</a>
                                <p>${json[i].positionName}[${json[i].city}]</p>
                                <h4>${json[i].createTime}</h4>
            </div>
            <div class="con1-right">${json[i].salary}</div>
        </div> -->
                    `
        }

        this.main.html(this.main.html() + html);
        
    },
   
//     bindEvent(){
//         $(window).on("scroll",this.ifLoad.bind(this));
//     },
//     ifLoad(){
//         // console.log(1);
//         // scrollTop ;
//         // 最后一张图片;
//         // 当前屏幕的高度;
//         var scrollTop = $("html,body").scrollTop();
//         var clientHeight = $("html")[0].clientHeight;
//         var lastBox = this.main.children(":last");
//         console.log(scrollTop,clientHeight,lastBox.offset());
//         if(scrollTop + clientHeight > lastBox.offset().top){
//             // 加载数据;
//             if(this.loading){
//                 return 0;
//             }
//             this.loading = true;
//             console.log("加载");
//             this.page ++;
//             this.loadJson()
//             .done(function(res){
//                 // deferred 的 done 回调 this指向的都是 jquery 对象本身
//                 // console.log(res,this);
//                 this.renderPage(res);
//             })
//         }
//     }
})

var waterfall = new WaterFall();
waterfall.init();
// })