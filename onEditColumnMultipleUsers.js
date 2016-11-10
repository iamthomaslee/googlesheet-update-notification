/*
 * Author: Thomas Lee (leez79@gmail.com)
 * Date: November 10, 2016
 */

function onEditColumnMultipleUsers(e) {
    // variables
    var checkDefinition = [
        {
            sheetIndex:1,
            columnIndexEmails: [
                {
                    columnIndex: 1,
                    emails: [
                        "thomas.lee@silvacom.com",
                        "leez79@gmail.com",
                        "wisetom98@gmail.com"
                    ]
                },
                {
                    columnIndex: 4,
                    emails: ["wisetom98@gmail.com"]
                },
                {
                    columnIndex: 5,
                    emails: ["leez79@gmail.com"]
                }
            ]
        },
        {
            sheetIndex:3,
            columnIndexEmails: [
                {
                    columnIndex: 2,
                    emails: ["thomas.lee@silvacom.com"]
                }
            ]
        }
    ];
    var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
    var docName = activeSheet.getName();
    var sheet = e.range.getSheet();
    var recipientsTO = "";

    // function
    for (var i = 0; i < checkDefinition.length; i++) {
        if (sheet.getIndex() === checkDefinition[i].sheetIndex) {
            for (var j = 0; j < checkDefinition[i].columnIndexEmails.length; j++) {
                var column = e.range.getColumn();
                var columnIndexEmails = checkDefinition[i].columnIndexEmails[j];
                if (column === columnIndexEmails.columnIndex) {
                    var row = e.range.getRow();
                    var newValue = e.range.getValue();
                    for (var k = 0; k < columnIndexEmails.emails.length; k++) {
                        if (k === 0) {
                            recipientsTO = columnIndexEmails.emails[k];
                        } else {
                            recipientsTO = recipientsTO+","+columnIndexEmails.emails[k];
                        }
                    }
                    var mailSubject = "[Notification] Change on "+sheet.getName()+" of "+docName;
                    var mailBody = mailSubject+"\n\n"+"The value of column "+column+", Row "+row+" has changed.\nNew value: "+newValue;
                    MailApp.sendEmail(recipientsTO,mailSubject,mailBody);
                }
            }
        }
    }
}