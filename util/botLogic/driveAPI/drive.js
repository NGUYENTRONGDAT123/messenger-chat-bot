const {google} = require("googleapis");
const mimeList = require('../../../lib/mimeList.json')
const colors = require('../../../lib/colors.json')
const privatekey = require('./token.json')

let auth = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    ['https://www.googleapis.com/auth/spreadsheets',
     'https://www.googleapis.com/auth/drive']);
//authenticate request
// function jwt_authorize() {
//     return new Promise(resolve => {
//         auth.authorize(function (err, tokens) {
//             if (err) {
//                 console.log(err);
//                 return;
//             } else {
//             }
//         });
//         resolve()
//     })
// }
let drive = google.drive({version: "v3", auth: auth}) 
let googleSheets = google.sheets({version: "v4", auth: auth})

// const auth = new google.auth.GoogleAuth({
//     keyFile: '../token.json',
//     scopes: ['https://www.googleapis.com/auth/spreadsheets',
//             'https://www.googleapis.com/auth/drive'],
// })

// const client = await auth.getClient()

let Sheet = {
    get: {
        row: async (sheet_id, range) => {
            // if(range == 'all') {

            // }
            let data = await googleSheets.spreadsheets.values.get({
                auth: auth,
                spreadsheetId: sheet_id,
                range: 'Test1'
            })
            return data.data
        },
        meta: async (sheet_id) => {
            let data = await googleSheets.spreadsheets.get({
                auth: auth,
                spreadsheetId: sheet_id,
            })
            return data.data.sheets
        }
    },
    update: {
        properties: async () => {
            let data = await googleSheets.spreadsheets.batchUpdate({
                auth: auth,
                spreadsheetId: '1EZHVe7BHbZ24-BfBTPjjI8mH9-4qQzMsXu81p0IDSf4',
                resource: {
                    // valueInputOption: 'RAW',
                    // data: [
                    //     {
                    //         range: 'Trang tính1!A:B',
                    //         majorDimension: 'ROWS',
                    //         values: [
                    //             ['1', '2'],
                    //             ['3', '4'],
                    //         ]
                    //     },
                    // ],
                    requests: [
                        {
                            repeatCell: {
                                range: {
                                    sheetId: 0,
                                    startColumnIndex: 0,
                                    endColumnIndex: 2,
                                    startRowIndex: 0,
                                    endRowIndex: 2,                
                                },
                                cell: {
                                    userEnteredFormat: {
                                        "backgroundColor": {
                                            "red": 0.0,
                                            "green": 200,
                                            "blue": 0.0
                                          },
                                    }
                                },
                                fields: "userEnteredFormat(backgroundColor)"
                            }
                        }
                    ]
                }
            })
            return data.data

        },
        value: async (sheet_id) => {
            let value = []
            for (let i = 0; i < 10; i++) {
                value.push(i)                
            }
            let data = await googleSheets.spreadsheets.values.batchUpdate({
                auth: auth,
                spreadsheetId: sheet_id,
                resource: {
                    valueInputOption: 'RAW',
                    data: [{   
                        range: 'Test1!A5',
                        majorDimension: 'ROWS',
                        values: [
                            // ['1', '2'],
                            // ['3', '4'],
                            value
                        ]
                    }]
                }
            })
            return data.data
        }
    }
}

let Drive = {
    get: {
        sheetid: () => {
            return new Promise(async (resolve) =>{
                await jwt_authorize()
                drive.files.list({
                    auth: auth
                }, function(err, res){
                //error handling
                    if(err) {
                        console.log(`Google API returned error: ${err}`)
                        return;
                    }
                    //Parse files metadata from Drive API
                    let file_meta = res.data.files
                    if(file_meta.length == 0) {
                        console.log('No shared Files/Folders found')
                    }
                    file_meta.forEach(file => {
                        if(file.mimeType == 'application/vnd.google-apps.spreadsheet') {
                            resolve(file.id)
                        }
                    });
                })
            })
        },
        filesList : () => {
            return new Promise( async resolve => {
                drive.files.list({
                    auth: auth
                }, (err, res) => {
                    if(err) {
                        console.log(`Google API returned error: ${err}`)
                        return;
                    }
                    //Parse files metadata from Drive API
                    let file_meta = res.data.files
                    if(file_meta.length == 0) {
                        console.log('No shared Files/Folders found')
                    }
                    resolve(file_meta)
                })
            })
        },
        permission: () => {
            drive.permissions.get({
                auth: auth,
                fileId: '1EZHVe7BHbZ24-BfBTPjjI8mH9-4qQzMsXu81p0IDSf4',
                permissionId: 'me',
            }, (err, res) => {
                if(err) {
                    console.log(`Google API returned error: ${err}`)
                    return;
                }
                console.log(res)
            })
        }
    },
    make: {
        file: (type, fileName, parentFolderId) => {
            
            // To be created folder metadata
            let fileMetaData = {
                name: fileName,
                mimeType: mimeList[type]
            }
            if(parentFolderId) {
                fileMetaData.parents = [parentFolderId]
            }
            return new Promise( resolve => {
                drive.files.create({
                    resource: fileMetaData,
                    fields: 'id'
                }, (err, file) => {
                    if(err){
                        console.log(`Error while creating new folder: ${err}`)
                    } else {
                        console.log('File Data')
                        console.log(file.data)
                        console.log(`New Folder ID: ${file.data.id}`)
                        resolve(file.data.id)
                    }
                })
            })
        }
    },
    remove: {
        folder: (id) => {
            return new Promise( async (resolve) => {
                drive.files.delete({
                    fileId: id
                }, (err, res) => {
                    if(err) {
                        console.log(`Error while deleting folder: ${err}`)
                    } else {
                        console.log(`Folder deleted successfully`)
                        resolve()
                    }
                })
            })
        }
    },
    update: {
        permision: (fileID) => {
            return new Promise(resolve => {
                drive.permissions.update({
                    fileId: fileID,
                    resource: {
                        role: 'writer',
                        type: 'anyone'
                    },
                    fields: 'id'
                }, (err, res) => {
                    if(err) {
                        console.log(`Error while updating permissions: ${err}`)
                    } else {
                        console.log(`Permissions updated successfully`)
                    }
                    resolve()
                })
            })
        }
    }
    
}
module.exports = { Sheet, Drive }
