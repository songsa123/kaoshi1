
function Pagination(){}
Pagination.prototype.init = function(){
    // 进度条;
    // this.progress = document.querySelector("#progress-bar");
    this.ul = document.querySelector("#wrap ul");
    // 加载第几页;
    this.page = 0;
    // 是否加载完了;
    this.loaded = false;
    // 绑定事件;
    // 渲染页面;
    this.handleEvent();
    this.loadMsg()
    .then((res)=>{
        // console.log(res);
        res = typeof res == "string" ? JSON.parse(res) : res;
        this.renderPag(res);
    })
}   
Pagination.prototype.handleEvent = function(){
    // 滚动事件判定是否应该加载数据;
    onscroll = this.iflLoad.bind(this);
}
Pagination.prototype.loadMsg = function(){
    // 让进度条归零;
    // this.progress.style.width = 0;
    
    // 请求的加载;
    return new Promise((succ)=>{
        // this => 实例化对象;
        var xhr = new XMLHttpRequest();
        xhr.open("GET","lgw.json");
        xhr.send(null);
        xhr.onload = function(){
            succ(xhr.response);
        }
        xhr.onprogress = (event) => {
            let {loaded,total} = event;
            let prop = loaded / 100;
            // this.progress.style.width = prop * 1130 + "px";
        }

        this.page++;
        // console.log(this.page);

    })
}
Pagination.prototype.renderPag = function(json){
    // console.log(json);
    var list = json;
    var html = "";
    for(var i = 0 ; i < list.length ; i ++){
        html += 
			`<a> 
			<div class="con1 clearfix">
				<img src=${list[i].companyLogo}" alt="">
				<div class="con1-center">
					<a href="http://localhost:8080/list.html" target="_blank">${list[i].companyName}</a>
					<p>${list[i].positionName}[${list[i].city}]</p>
					<h4>${list[i].createTime}</h4>
				</div>
				<div class="con1-right">${list[i].salary}</div>
			</div>
			</a>
				`
    }
    // 把渲染好的字符串放入页面之中;
    this.ul.innerHTML += html;

    // 渲染结束;
    this.loaded = true;
}
Pagination.prototype.iflLoad = function(){
    if(this.loaded == false){
        return 0;
    }
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 显示的高度有多高;
    var showHeight = document.documentElement.clientHeight + scrollTop;
    // 最后一个元素;
    var aLi = document.querySelectorAll("#wrap a");
    var lastLi = aLi[aLi.length - 1];
    if(lastLi.offsetTop <= showHeight + 50){
        // 加载数据
        this.loadMsg()
        .then((res)=>{
            res = typeof res == "string" ? JSON.parse(res) : res;
            this.renderPag(res);
        })
        this.loaded = false;
    }
}
function getName(arr){
    var res = "";
    for(var i = 0 ; i < arr.length ; i ++){
        res += "  " + arr[i].name;
    }
    return res;
}

var pagination = new Pagination();
pagination.init();