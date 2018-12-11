require(['./js/config.js'],() => {
    require(['jquery',"bscroll"],($,bscroll) => {
        var page = 1,
            page_size = 10,
            type = 1,
            total;

        var scroll = new bscroll(".con",{
            probeType : 2
        })

        var innerCon = document.querySelector(".inner-con")
        scroll.on('scroll',function() {
          
            if(this.y < this.maxScrollY -44) {
                if(page < total) {
                    innerCon.setAttribute("up",'释放加载更多')
                } else {
                    innerCon.setAttribute("up",'没有更多数据')
                }
            }else if(this.y < this.maxScrollY - 22) {
                if(page < total) {
                    innerCon.setAttribute("up",'上拉加载')
                } else {
                    innerCon.setAttribute("up",'没有更多数据')
                }
            }
        })

        scroll.on("touchEnd",() => {
           if(innerCon.getAttribute('up') === "释放加载更多") {
               if(page < total) {
                   page++;
                   getList();
                   innerCon.setAttribute("up","上拉加载")
               } else {
                   innerCon.setAttribute("up",'没有更多数据')
               }
           }
        })

        getList()
        function getList() {
            $.ajax({
                url : '/api/get/list',
                dataType : "json",
                data : {
                    page : page,
                    page_size : page_size,
                    type : type
                },
                success(data) {
                    console.log(data)
                    if(data.code === 1) {
                        renderList(data.data)
                        total = data.total;
                    }
                },
                error(err) {
                    console.warn(err)
                }
            })
        }
        

        function renderList(data) {
            var BaseUrl = 'http://localhost:3000/images/';
            var str = '';
            
            data.forEach((item) => {
                str += `<dl>
                            <dt><img src=${BaseUrl}${item.url} alt=""></dt>
                            <dd>${item.name}</dd>
                        </dl>`
            })

            document.querySelector(".inner-con").innerHTML += str;
            scroll.refresh()
        }

        var navlist = document.querySelector('.nav-list');
        navlist.addEventListener("click",(e) => {
            type = e.target.getAttribute("data-id")
            document.querySelector(".inner-con").innerHTML = '';
            page = 1;
            getList()
        })

    })

    
}) 