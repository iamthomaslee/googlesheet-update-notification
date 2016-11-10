/*
* Author: Thomas Lee (leez79@gmail.com)
* Date: November 10, 2016
* Function onEditColumn(e)
*/

function onEditColumn(e) {
  var emailAddress = "your_email@gmail.com";
  var checkDefinition = [
    {
      sheetIndex:1,
      columnIndex: [1, 4]
    },
    {
      sheetIndex:3,
      columnIndex: [2]
    }
  ];
  
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet();   
  var docName = activeSheet.getName();
  var sheet = e.range.getSheet();
  for (var i = 0; i < checkDefinition.length; i++) {
    if (sheet.getIndex() === checkDefinition[i].sheetIndex) {
      var column = e.range.getColumn();  
      for (var j = 0; j < checkDefinition[i].columnIndex.length; j++) {
        if (checkDefinition[i].columnIndex[j] == column) {
          var row = e.range.getRow();
          var newValue = e.range.getValue();
          var mailSubject = "[Notification] Change on "+sheet.getName()+" of "+docName;
          var mailBody = subject+"\n\n"+"The value of column "+column+", Row "+row+" has changed.\nNew value: "+newValue;
          MailApp.sendEmail(emailAddress,mailSubject,mailBody);
        }
      }      
    }
  }  
}