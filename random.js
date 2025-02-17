$(function () {
    var run = 0,
        heading = $("h1"),
        timer,
        list = [];

    var listFile = new XMLHttpRequest();
    listFile.onreadystatechange = function () {
        if (listFile.readyState == 4) {
            if (listFile.status == 200) {
                list = listFile.responseText.trim().split("\t");
                console.log(list);
            }
            else {
                alert(`读入列表失败: ${listFile.status}`);
                list = $("#list").val().replace(/ +/g, " ").replace(/^ | $/g, "").split(" ");
            }
        }
    };
    listFile.open("GET", "list.tsv", true);
    listFile.send();

    $("#start").click(function () {
        if (!run) {
            heading.html(heading.html().replace("吃这个！", "吃什么？"));
            $(this).val("停止");
            timer = setInterval(function () {
                var r = Math.ceil(Math.random() * list.length),
                    food = list[r - 1];
                $("#what").html(food);
                var rTop = Math.ceil(Math.random() * $(document).height()),
                    rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
                    rSize = Math.ceil(Math.random() * (37 - 14) + 14);
                $("<span class='temp'></span>").html(food).hide().css({
                    "top": rTop,
                    "left": rLeft,
                    "color": "rgba(0,0,0,." + Math.random() + ")",
                    "fontSize": rSize + "px"
                }).appendTo("body").fadeIn("slow", function () {
                    $(this).fadeOut("slow", function () {
                        $(this).remove();
                    });
                });
            }, 50);
            run = 1;
        } else {
            heading.html(heading.html().replace("吃什么？", "吃这个！"));
            $(this).val("不行，换一个");
            clearInterval(timer);
            run = 0;
        };
    });

    document.onkeydown = function enter(e) {
        var e = e || event;
        if (e.keyCode == 13) $("#start").trigger("click");
    };
});