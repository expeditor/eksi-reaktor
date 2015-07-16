/*
Sol Frame'i göster/gizle
*/
chrome.storage.sync.get({
  solFrame: true
}, function(items) {
  if (!items.solFrame) {
    var el = document.getElementById('index-section');
    el.style.display = "none";
  }
});

/*
SANSÜR
Kelime sansürleme.
*/

// entry arası reklamı yok et
$('.sponsored').remove();

var sansur;
chrome.storage.sync.get({
  sansurlenesiKelimeler: ''
}, function(items) {
  kelimelerimiz(items.sansurlenesiKelimeler);
});

function kelimelerimiz (sansurluk) {
  // parçala ve boşlukları temizle
  sansur = sansurluk.split(",");
  sansur = $.map(sansur, $.trim);
  sansur = sansur.filter(function(e){return e});

  istibdatDevri();
}


function istibdatDevri(){
  $("ul.topic-list.partial li").each(function(k,v){
    for (j=0; j<sansur.length; j++) {
      var str = $(this).text();
      var subRe = sansur[j].split("/");
      if (subRe[1] == null) subRe[1] = "i";
      var re = new RegExp(subRe[0], subRe[1]);
      var n = str.search(re);
      if (n>=0) {
        $(this).remove();
      } // /if
    } // /for
  });
}

var gozcu = new MutationObserver(function(evrimler) {
  evrimler.forEach(function(evrimlerimiz) {
    istibdatDevri();
  });
});

gozcu.observe(
  document.querySelector('#partial-index'),
  { attributes: true, childList: true, characterData: true }
);


/*
Konulu videolar göster/gizle
*/
chrome.storage.sync.get({
  konulu: true
}, function(items) {
  if (!items.konulu) {
    var el = document.getElementById('videos');
    el.style.display = "none";
  }
});

/*
Konulu videolar'ı youtube ile değiştir
*/
chrome.storage.sync.get({
  youtube: false
}, function(items) {

  if (items.youtube) {
    var search_input = $("#title").text();

    var yt_url =  "https://www.googleapis.com/youtube/v3/search?safeSearch=none&part=snippet&q="+ encodeURIComponent(search_input) +"&relevanceLanguage=tr&maxResults=1&key=AIzaSyBrQhJDh900EamsDLWZH6kQm_9Dc1AqcX8"

    $.ajax({
        type: "GET",
        url: yt_url,
        datatype: "json",
        success: function (response) {
          if (response.items) {
                $.each(response.items, function (i, data) {
                    var video_id = data.id.videoId;
                    var video_frame = "<iframe width='100%' height='360' src='https://www.youtube.com/embed/"+ video_id + "?feature=player_embedded' frameborder='0' allowfullscreen></iframe>";
                    if ($("#videos")) $("#videos").html(video_frame);
                }); //.each
            } //if.response
        } //.sucess
    }); //.ajax
  }//if.itemsyoutube
});

/*
şükela modunu ve badi entrylerini görünür bir yere al
*/

if ($("#in-topic-search-options li a")[2].text == "linkler") {
 $(".sub-title-menu").append("<a href=" + $("#in-topic-search-options li a")[1].href +  ">şükela</a>");
} else {
 $(".sub-title-menu").append("<a href=" + $("#in-topic-search-options li a")[2].href +  ">şükela</a>");
 $(".sub-title-menu").append("<strong><a href=" + $("#in-topic-search-options li a")[0].href +  ">" + $("#in-topic-search-options li a")[0].text + "</a></strong>");
}



/*
Yazarın yanındaki diğerin altına troll butonu.
*/

chrome.storage.sync.get({
  troll: true
}, function(items) {

  // deaktifse süreci durdur
  if (!items.troll) return false;

  //
  $(".info")
      .each(function() {
          var user = $(this).find('.entry-author');
          var parentFooter = $(this).parents('footer');
          var feedBack = parentFooter.find('.feedback');
          var responseArea = $('<span/>');
          responseArea.addClass('response-area');
          var userPage = $(user).attr('href');
          var trollButton = $('<a/>');
          trollButton.attr('title', 'troll');
          trollButton.attr('href', '');
          trollButton.html('troll');
          trollButton.attr('style', 'font-weight:bold;');
          var li = $('<li/>');
          li.append(trollButton);
          $(this).find('.dropdown-menu').append(li);

              trollButton.on('click', function(e) {
                e.preventDefault();

                var $this = $(this);

                $.get(userPage, function(resp) {
                    var html = $.parseHTML(resp);
                    var link = $(html).find('#blocked-link').attr('data-url');

                    if ($this.attr('data-url') === '#') {
                        $this.remove();
                        return false;
                    }

                    $.post(link);
                    responseArea.html('<strong style="color:red;">Kullanıcı engellendi.</strong>');
                    feedBack.append(responseArea);
                    window.setTimeout(function() {
                        $(responseArea).remove();
                    }, 3000);

                  return false;
                }); //.get*/

                $this.remove();

              }); //trollButton.on('click')
      }); //$(".info")

});
