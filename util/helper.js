//resolve queueing
function queueTicket() {
    if(State.queue){
        return true
    } else {
        return false
    }
}

function date() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '/' + mm + '/' + yyyy;
    return today
}

module.exports = {queueTicket, date}