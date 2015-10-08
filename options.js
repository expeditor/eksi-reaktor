// Saves options to chrome.storage.sync.
function save_options() {
var sansurle = document.getElementById('sansurle').value;
var solFrame = document.getElementById('solFrame').checked;
var konulu = document.getElementById('konulu').checked;
var youtube = document.getElementById('youtube').checked;
var troll = document.getElementById('troll').checked;
var topBar = document.getElementById('topBar').checked;

chrome.storage.sync.set({
  sansurlenesiKelimeler: sansurle,
  solFrame: solFrame,
  konulu: konulu,
  youtube: youtube,
  troll: troll,
  topBar: topBar
  }, function() {
  // Update status to let user know options were saved.
  var status = document.getElementById('status');
  status.textContent = "Kaydettik, eksisozluk.com'u bi' tazeleyin!";
  setTimeout(function() {
    status.textContent = '';
  }, 2000);
});
}

function restore_options() {
// Use default value color = 'red' and likesColor = true.
chrome.storage.sync.get({
  sansurlenesiKelimeler: '',
  solFrame: true,
  konulu: true,
  youtube: false,
  troll: false,
  topBar: false
}, function(items) {
  console.log(items);
  document.getElementById('sansurle').value = items.sansurlenesiKelimeler;
  document.getElementById('solFrame').checked = items.solFrame;
  document.getElementById('konulu').checked = items.konulu;
  document.getElementById('youtube').checked = items.youtube;
  document.getElementById('troll').checked = items.troll;
  document.getElementById('topBar').checked = items.topBar;
});
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',
  save_options);
