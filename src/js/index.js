require(['./js/config.js'],() => {
    require(['jquery',"bscroll"],($,bscroll) => {
        var page = 1,
            page_size = 10,
            type = 1,
            total;

        var srcoll = new bscroll(".con",{
            probeType : 2
        })

        var innerCon = document.querySelector(".inner-con")
        srcoll.on('srcoll',() => {
            console.log(this.maxScrollY)
            if(this.y < this.maxScrollY -44) {
                innerCon.setAttribute("up",'释放加载更多')
            }
        })

        srcoll.on("touchEnd",() => {

        })
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
        }
    })
}) 