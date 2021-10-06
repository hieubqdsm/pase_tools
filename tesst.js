function update_check_base() {
    //  
    // Raw/Source Data Processing
    var raw_data_sheet = "workplace_lead_data";
    var working_sheet = "WorkplaceTEST";
    const raw_data_table_name = raw_data_sheet;
    const raw_data_table_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(raw_data_table_name);
    const raw_data_lastrow = raw_data_table_data.getLastRow() - 2;
    const raw_data_lastcolumn = raw_data_table_data.getLastColumn();
    const raw_data_arr_data = raw_data_table_data.getRange(3, 1, raw_data_lastrow, raw_data_lastcolumn).getValues();
    const raw_data_pure_array = [];
    var count_row = 0;
    for (var d = 0; d < raw_data_arr_data.length; d++) {
        if (typeof raw_data_arr_data[d][0] !== "undefined") {
            raw_data_pure_array[count_row] = raw_data_arr_data[d];
            count_row++;
        }
    }

    // Lead hiện tại
    var lead_table_name = working_sheet;
    var lead_table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(lead_table_name);
    var lead_lastrow = lead_table.getLastRow();
    var lead_lastcolumn = lead_table.getLastColumn();
    var lead_arr_data = lead_table.getRange(1, 1, lead_lastrow, lead_lastcolumn).getValues();

    var lead_pure_array = [];
    for (var l = 0; l < lead_arr_data.length; l++) {
        lead_pure_array[l] = lead_arr_data[l].toString();
    }
    //Step 1:
    // take email from lead list.
    let lead_email_arr = [];

    for (let i = 1; i < lead_arr_data.length; i++) {
        lead_email_arr.push(lead_arr_data[i][2]);
    }

    // take email from raw data.
    let raw_email_arr = [];

    for (let i = 0; i < raw_data_arr_data.length; i++) {
        raw_email_arr.push(raw_data_arr_data[i][2]);
    }
    // compare raw data one by one with lead.   

    for (let i = 0; i < raw_email_arr.length; i++) {
        if (lead_email_arr.includes(raw_email_arr[i]) == false && raw_email_arr[i].length > 0) {
            //update data moi vao

            if (typeof raw_data_pure_array[i] !== "undefined") {
                var new_data = raw_data_pure_array[i];

                var new_last_row = lead_table.getLastRow();
                var column_array = [8, 1, 2, 4, 5, 3, 6, 7, 13];
                for (var j = 0; j < column_array.length; j++) {
                    var row_range = lead_table.getRange(new_last_row + 1, j + 1, 1, 1);

                    if (new_data[column_array[j]].length > 0) {
                        // Add dòng mới nếu ô không trống

                        row_range.setValue(new_data[column_array[j]].toString());

                    }
                }
                //=============
                // email 
                // const emailAddress = ["hieu.bui@anphabe.com", "thanh.phuong.nguyen@anphabe.com", "huong.ha@anphabe.com", "marketing@anphabe.com"];//
                var emailAddress = ["hieu.bui@anphabe.com"];
                var subject = "Có Lead mới trong " + working_sheet + " từ " + new_data[4] + ' của ' + new_data[5];
                let message = '===========Thông tin chi tiết===========\n';
                message += '- Người liên hệ: ' + new_data[1] + '\n';
                message += '- Email: ' + new_data[2] + '\n';
                message += '- Phone: ' + new_data[3] + '\n';
                message += '- Job Title: ' + new_data[4] + '\n';
                message += '- Công ty: ' + new_data[5] + '\n';
                message += '- Quy mô: ' + new_data[6] + '\n';
                message += '- Nhu cầu: ' + new_data[7] + '\n';
                const mailoptions = { "name": "New Lead Notification" };
                for (let mn = 0; mn < emailAddress.length; mn++) {
                    MailApp.sendEmail(emailAddress[mn], subject, message, mailoptions);
                }
                //=======#Email
            }



        }
    }

}