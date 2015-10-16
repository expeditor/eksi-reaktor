/*
Sağ click menü'ye ekşi'de aramak için seçenek
*/
var title = "Ekşi Sözlük: '%s'";
var id = chrome.contextMenus.create({
  "title": title,
  "contexts": ["selection"],
  "onclick": searchSelected
});

function searchSelected(info, tab) {
  var url = 'https://eksisozluk.com/?q=' + info.selectionText;
  chrome.tabs.create({
    'url': url
  }, function(tab) {});
}
