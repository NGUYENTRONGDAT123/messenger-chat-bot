let Util = {
    get: {
        sheet_details: async (sheet_values) => {
            let data = sheet_values 
            let max_column = 0
            let max_row = data.length
            data.forEach(row => {
                if(row.length > max_column) {
                    console.log(true)
                    max_column = row.length
                }
            });
            console.log(`rows: ${max_row}`)
            console.log(`columns: ${max_column}`)
        }
    }
}

module.exports = { Util }