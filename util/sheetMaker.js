let max_column

let table = 'ID'
class Foundation {
    headers = ['ID', 'Group Name', 'Sub Group Name', 'Test Case Description', 'Precondition', 'Test Case Procedure', 'Test Data', 'Expected Output', 'Result' , 'Test Date', 'Note']
    max_column = this.headers.length 
    constructor(values){
        if(columns){
            columns.forEach(column => {
                this[column] = {
                    value: [
                         
                    ]
                }
            });
        }
    }
}
let arr = []

let Table = new Foundation()
console.log(Table.max)




