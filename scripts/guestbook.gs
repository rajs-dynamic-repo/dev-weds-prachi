/**
 * Guestbook for the wedding site.
 *
 * 1. Create a blank Google Sheet.
 * 2. Extensions → Apps Script, replace the sample with this file, and save.
 * 3. Click Run on doGet and allow access when Google asks.
 * 4. Deploy → New deployment → Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 5. Copy the URL that ends in /exec into wishesUrl in src/content/wedding.ts.
 *
 * New wishes are added as rows. Delete a row in the sheet to remove it from the page.
 */

var WISH_HEADERS = ['id', 'name', 'message', 'createdAt']

function wishSheet_() {
  var book = SpreadsheetApp.getActive()
  var sheet = book.getSheetByName('Wishes')
  if (!sheet) {
    sheet = book.insertSheet('Wishes')
    sheet.appendRow(WISH_HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

function plain_(value) {
  var text = String(value == null ? '' : value).trim()
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

function doGet() {
  var values = wishSheet_().getDataRange().getValues()
  var wishes = []
  for (var index = values.length - 1; index >= 1 && wishes.length < 80; index -= 1) {
    var row = values[index]
    var name = String(row[1] || '').replace(/^'/, '').trim()
    var message = String(row[2] || '').replace(/^'/, '').trim()
    if (!name || !message) continue
    var created = row[3]
    wishes.push({
      id: String(row[0] || Utilities.getUuid()),
      name: name.slice(0, 60),
      message: message.slice(0, 280),
      createdAt: created instanceof Date ? created.toISOString() : String(created || ''),
    })
  }
  return json_({ wishes: wishes })
}

function doPost(event) {
  var data = {}
  try {
    data = JSON.parse(event.postData.contents)
  } catch (error) {
    return json_({ error: 'The wish could not be read.' })
  }
  var name = String(data.name || '').trim().slice(0, 60)
  var message = String(data.message || '').trim().slice(0, 280)
  if (!name || !message) return json_({ error: 'A name and a wish are required.' })
  var wish = {
    id: Utilities.getUuid(),
    name: name,
    message: message,
    createdAt: new Date().toISOString(),
  }
  wishSheet_().appendRow([wish.id, plain_(wish.name), plain_(wish.message), wish.createdAt])
  return json_({ wish: wish })
}
