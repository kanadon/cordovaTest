$(document).on("pagecreate", "#page_posts", function (event) {
    //$(function (event, data) {
    $.getJSON(encodeURI("http://sbawebdev-dataparser.rhcloud.com/api/get_recent_posts/"), function (data) {
        //$('.result').html('<p>' + data.foo + '</p>'
        //    + '<p>' + data.baz[1] + '</p>');
        $.each(data.posts, function (index, post) {
            var item = document.createElement("li");
            var link = document.createElement("a");
            var text = document.createTextNode(post.title);

            //$.data(link, "id", post.id);
            link.className = "ui-btn ui-btn-icon-right ui-icon-carat-r";
            link.href = "viewpost.html";
            $(link).on("click", function saveCurrentPostID() {
                localStorage.postid = post.id;
            });
            link.appendChild(text);
            item.appendChild(link);
            document.getElementById("list_posts").appendChild(item);
        });
    });
    //});
});

$(document).on("pagecreate", "#page_viewpost", function (event) {
    $.getJSON(encodeURI("http://sbawebdev-dataparser.rhcloud.com/api/get_post/?post_id=" + localStorage.postid), function (data) {
        var h3 = document.createElement("h3");
        var text = document.createTextNode(localStorage.postid);
        h3.appendChild(text);
        var el = document.getElementById("div_viewpost");
        el.appendChild(h3);

        //var p = document.createElement("p");
        text = document.createTextNode(data.post.content);
        //p.appendChild(text);
        $(el).append(text);

    });


});

$(document).on("pagecreate", function(event){
    var $page = $(this);
    $page.css("top", "-1px");
});