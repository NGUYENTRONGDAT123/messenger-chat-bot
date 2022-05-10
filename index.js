const MongoClient = require('mongodb').MongoClient;
const Mess = require('./util/Mess.js')

//global page object
// let page
Promise.all([]).then(() => {

})
(async () => {
	await Mess.LogIn({
		cron: true,
		driveAPI: true,
		music: true,
		joke: true
	})
})();

MongoClient.connect(url_europe, async function (err, db) {
    if (err)
        throw err;
    let dbo = db.db('jev');
    app.use(require('express-status-monitor')());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(cors({
        origin: [origin_site, 'http://localhost:5000']
    }));
    app.listen(PORT, () => {
        console.log(`server running on port: ${PORT}`);
    });

    app.get('/mongo', async (req, res) => {
        let check = req.query.local_onEdit;
       
        dbo.collection('jaen_re_mock').find({ done: false }).limit(10).toArray(function (err, en_data) {
            if (err) {
                res.status(500).send({ message: 'At /mongo / MongoDB failed to give new EN word' });
                return;
            }
            if (en_data.length != 0) {
                let c = 0;
                for (let i = 0; i < en_data.length; i++) {
                    if (onEdit.includes(en_data[i].id) == false) {
                        console.log(en_data[i].id);
                        let query = {};
                        if (en_data[i].k_ele) {
                            query = { "k_ele.0.keb": en_data[i].k_ele[0].keb[0] };
                        }
                        else {
                            query = { $and: [{ "r_ele.0.reb.0": en_data[i].r_ele[0].reb[0] },
                                    { "k_ele": { $exists: false } }] };
                        }
                        dbo.collection('javi_re_mock').findOne(query, async (err, vi_data) => {
                            if (err) {
                                res.status(500).send({ message: 'At /mongo / MongoDB failed to give new VI word' });
                                return;
                            }
                            if (vi_data == null) {
                                vi_data = JSON.parse(JSON.stringify(en_data[i]));
                                let concat = '';
                                for (let k = 0; k < vi_data.sense.length; k++) {
                                    for (let j = 0; j < vi_data.sense[k].gloss.length; j++) {
                                        let gloss = vi_data.sense[k].gloss;
                                        if (gloss[j]._) {
                                            concat += gloss[j]._;
                                        }
                                        else {
                                            concat += gloss[j];
                                        }
                                        if (j < gloss.length - 1) {
                                            concat += ' ,! ';
                                        }
                                    }
                                    if (k < vi_data.sense.length - 1) {
                                        concat += ' ,!,! ';
                                    }
                                }
                                let text = encodeURI(concat);
                                if (concat.length <= 5000) {
                                    var url = `https://clients1.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=vi&q=` + text;
                                    await (async function google_api() {
                                        axios.get(url, { headers: bypass_headers_anonymous })
                                            .then(async (output) => {
                                            let translation;
                                            if (output.data[0]) {
                                                translation = output.data[0];
                                            }
                                            else {
                                                translation = output.data.sentences.map(item => item.trans).join('');
                                            }
                                            let sense_arr = translation.split(/\s?,!,!\s?/g);
                                            for (let s = 0; s < sense_arr.length; s++) {
                                                let gloss_arr = sense_arr[s].split(/\s?,!\s?/g);
                                                for (let j = 0; j < gloss_arr.length; j++) {
                                                    if (vi_data.sense[s].gloss[j]._) {
                                                        vi_data.sense[s].gloss[j]._ = gloss_arr[j];
                                                    }
                                                    else {
                                                        vi_data.sense[s].gloss[j] = gloss_arr[j];
                                                    }
                                                }
                                            }
                                            await update_queue('add', en_data[i].id);
                                            res.send({
                                                en_data: en_data[i],
                                                vi_data: vi_data
                                            });
                                        })
                                            .catch(e => {
                                            console.log(e);
                                            console.log('ERROR HAPPENED');
                                            google_api();
                                        });
                                    })();
                                }
                                else {
                                    await update_queue('add', en_data[i].id);
                                    res.send({
                                        en_data: en_data[i],
                                        vi_data: vi_data
                                    });
                                    console.log('length > 5000 sent');
                                }
                            }
                            else {
                                await update_queue('add', en_data[i].id);
                                res.send({
                                    en_data: en_data[i],
                                    vi_data: vi_data
                                });
                                console.log('not null sent');
                            }
                        });
                        break;
                    }
                    else {
                        c++;
                    }
                }
                if (c == 10) {
                    res.status(500).send({ message: 'onEdit queueing error' });
                }
            }
            else {
                res.send({ congrat: 'Done! 💃💃' });
            }
        });
    });

});