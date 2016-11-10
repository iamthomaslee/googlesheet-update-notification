/*
* Author: Thomas Lee (leez79@gmail.com)
* Date: November 10, 2016
*/

function onEditColumn(e) {
  // variables
  var emailAddress = "leez79@gmail.com";
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
  
  // function
  for (var i = 0; i < checkDefinition.length; i++) {
    if (sheet.getIndex() === checkDefinition[i].sheetIndex) {
      var column = e.range.getColumn();  
      for (var j = 0; j < checkDefinition[i].columnIndex.length; j++) {
        if (checkDefinition[i].columnIndex[j] == column) {
          var row = e.range.getRow();
          var newValue = e.range.getValue();
          var mailSubject = "[Notification] Change on "+sheet.getName()+" of "+docName;
          var mailBody = mailSubject+"\n\n"+"The value of column "+column+", Row "+row+" has changed.\nNew value: "+newValue;
          MailApp.sendEmail(emailAddress,mailSubject,mailBody);
        }
      }      
    }
  }  
}
