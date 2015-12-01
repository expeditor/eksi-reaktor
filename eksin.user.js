(function() {
    var noTheme = {
        activate: function() {
            var innocence = document.getElementById('return-to-innocence');
            if (innocence) {
                innocence.click();
            }
        }
    };
    noTheme.activate();
})();


// entry arası reklamı yok et
$('.sponsored').remove();
// üst tarafta ublock tarzı eklentiler kullanırken reklam
// dolayısıyla  çıkan karadeliği yok et
$(".ads").hide();

/* Sol Frame'i göster/gizle */
chrome.storage.sync.get({
  solFrame: true,
  topBar: true,
  konulu: true,
  odaklan: false
}, function(items) {
  if (items.odaklan) {
    odaklan(false, false, true, false);
  } else {
    odaklan(items.konulu, items.solFrame, items.topBar, !items.odaklan);
  }
});

function odaklan(konulu, solFrame, topBar, ustMenu) {
    /* Konulu videolar göster/gizle */
    if (konulu == false) {
      if (document.getElementById('videos')) { //right sidebar
        document.getElementById('videos').style.display = "none";
      }
      if (document.getElementById('video')) { //above entries
        document.getElementById('video').style.display = "none";
      }

    }

    if (solFrame == false) {
      document.getElementById('index-section').style.display = "none";
    }

    /* üst bar toggle */
    if (topBar == true) {
      document.getElementsByTagName("header")[0].style.position = "absolute";
    }

    /* Üst menüdeki zımbırtılar */
    if (ustMenu == false) {
      document.getElementById("sub-navigation").style.display = "none";
      document.getElementById("top-navigation").style.display = "none";
    }

} /* odaklan()

/*
SANSÜR
Kelime sansürleme.
*/
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
        console.log("Başlık sol frame'den çıkarıldı: " + $(this).text());
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
Konulu videolar'ı youtube ile değiştir
*/
chrome.storage.sync.get({
  youtube: false, konulu: false
}, function(items) {

  if (items.konulu && items.youtube) {
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
                    if(video_id){ //undefined check
                      var video_frame = "<h2 id=\"videolar\">konulu youtube</h2><iframe width='100%' height='360' src='https://www.youtube.com/embed/"+ video_id + "?feature=player_embedded' frameborder='0' allowfullscreen></iframe>";
                      var video_upper_frame = "<iframe width='100%' height='315' src='https://www.youtube.com/embed/"+ video_id + "?feature=player_embedded' frameborder='0' allowfullscreen></iframe>";
                      //Convert videos on right side
                      if ($("#videos")) $("#videos").html(video_frame);
                      //Convert videos that appear at top
                      if ($("#video")) $("#video").html(video_upper_frame);
                    }
                }); //.each
            } //if.response
        } //.sucess
    }); //.ajax
  }//if.itemsyoutube
});

/*
şükela modunu ve badi entrylerini görünür bir yere al
*/
if ($("#in-topic-search-options li a")[2] != null) {
  if ($("#in-topic-search-options li a")[2].text == "linkler") {
  	   $(".sub-title-menu").append("<strong><a href=" + $("#in-topic-search-options li a")[0].href +  ">" + $("#in-topic-search-options li a")[0].text + "</a></strong>");
  }
}


/*
sağ kolona araştır
*/
var title = encodeURIComponent(
  $("#title").text().replace(/'/g, "").trim()
);

var arastir = "<a href='https://google.com/search?q="+title+"'>google</a> ";
arastir += "<a href='https://en.wikipedia.org/wiki/"+title+"'>wikipedia</a> ";
arastir += "<a href='https://tr.wikipedia.org/wiki/"+title+"'>vikipedi</a> ";
arastir += "<a href='https://www.youtube.com/results?search_query="+title+"'>youtube</a> ";
arastir += "<a href='https://twitter.com/search?q="+title+"'>twitter</a> ";
arastir += "<a href='http://www.tdk.gov.tr/index.php?option=com_gts&arama=gts&kelime="+title+"'>tdk</a> ";
arastir += "<a href='http://tureng.com/search/"+title+"'>tureng</a> ";
arastir += "<a href='http://www.kubbealtilugati.com/sonuclar.aspx?mi=0&km="+title+"'>etimoloji</a> ";
arastir += "<a href='http://www.etymonline.com/index.php?search="+title+"'>etymonline</a> ";
arastir += "<a href='http://www.imdb.com/find?s=all&q="+title+"'>imdb</a> ";
arastir += "<a href='https://www.google.com/search?tbm=isch&q="+title+"'>görseller</a> ";
arastir += "<a href='http://www.amazon.com/s/?field-keywords="+title+"'>amazon</a> ";

$("#aside").prepend("<h2 id='arastir'>araştır</h2>");
$("#arastir").after(arastir);

/* neler dönmüş serhat */
$("#quick-index-nav > li:nth-child(3)").after("<li><a href='#' id='gununEnCok' title='sadece bugünün en çok entry girilenleri'>24saat</a></li>");

document.getElementById('gununEnCok').addEventListener("click", gununEnPopuleri);

function gununEnPopuleri() {
  var dayNum = (new Date()).getDate() < 10 ? "0" + (new Date()).getDate() : (new Date()).getDate();

  var today = (new Date()).getFullYear() + "-" + ((new Date()).getMonth() +1) + "-" + dayNum;

  $("#searchForm_Keywords").val("");
  $("input#searchForm_When_From").val(today);
  $("input#searchForm_When_To").val(today);
  $("#searchForm_SortOrder").val("Count");
  $("form#advanced-search-form .actions button.primary").click();
}


/*
Yazarın yanındaki diğerin altına troll butonu.
*/

chrome.storage.sync.get({
  troll: true
}, function(items) {

  // deaktifse süreci durdur
  if (!items.troll) return false;

  // here we go
  $(".info")
      .each(function() {
          var user = $(this).find('.entry-author');
          if ($(this).find('.entry-author').text() == $("#top-navigation ul li a").eq(2).attr('title')) { 

          } else {
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
	                }); //.get

	                $this.remove();

	              }); //trollButton.on('click')
            } //.else
      }); //$(".info")

});
