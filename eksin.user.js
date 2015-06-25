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
      if (v.innerHTML.indexOf(sansur[j])>0) {
        $(this).remove();
      }
    }
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
    var keyword = encodeURIComponent(search_input);
    // Youtube API
    var yt_url =  "https://www.googleapis.com/youtube/v3/search?safeSearch=none&part=snippet&q="+ keyword +"&relevanceLanguage=tr&maxResults=1&key=AIzaSyBrQhJDh900EamsDLWZH6kQm_9Dc1AqcX8"

    $.ajax({
        type: "GET",
        url: yt_url,
        datatype: "json",
        success: function (response) {
          if (response.items) {
                $.each(response.items, function (i, data) {
                    var video_id = data.id.videoId;
                    //var video_frame = "<iframe src='https://www.youtube.com/embed/" + video_id + "' width='100%' height='350'  frameborder='0' type='text/html'></iframe>";
                    var video_frame = "<iframe width='100%' height='360' src='https://www.youtube.com/embed/"+ video_id + "?feature=player_embedded' frameborder='0' allowfullscreen></iframe>";
                    if ($("#videos")) $("#videos").html(video_frame); // Result
                }); //.each
            } //if.response
        } //.sucess
    }); //.ajax
  }//if.itemsyoutube
});


/*
Yazar bilgisini altına troll butonu.

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

        $.get(userPage, function(resp) {
            var html = $.parseHTML(resp);
            var link = $(html).find('#blocked-link').attr('data-url');
            trollButton.attr('data-url', link);
            trollButton.on('click', function() {
                var $this = $(this);
                if ($this.attr('data-url') === '#') {
                    $this.remove();
                    return false;
                }

                $.post($(this).attr('data-url'));
                $this.remove();
                responseArea.html('<strong style="color:red;">Kullanıcı engellendi.</strong>');
                feedBack.append(responseArea);
                window.setTimeout(function() {
                    $(responseArea).remove();
                }, 3000);
                return false;
            }); //trollButton.on('click')
        }); //.get
    });
*/
