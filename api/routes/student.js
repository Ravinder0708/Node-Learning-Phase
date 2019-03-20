module.exports = function (app, db) {
    var ObjectID = require('mongodb').ObjectID;

    app.post('/post-bookData', function (req, res) {
        console.log('Insert a new book detail using UI');
        const noteToInsert = req.body;
        db.collection('books').insertOne(noteToInsert, function (error, response) {
            if (error) {
                console.log("Error: " + error.message);
                res.send({ 'Error': "Error while inserting data in DB." });
            }
            else {
                console.log(req.body);
                console.log('inserted record', response.ops[0]);
                res.send('Data received:\n' + JSON.stringify(req.body));
            }
        })
    });

    app.get('/view-bookData', function (req, res) {
        db.collection('books').find({}).toArray((err, items) => {
            if (err) {
                console.log("Error: " + err.message);
                res.send({ "error": "Error while getting all data from DB." });
            }
            else {
                res.status(200).json(items);
            }
        })
    });

    //Get all data
    app.get('/student', (req, res) => {
        console.log('Get All books data');
        //get list of students
        db.collection('books').find({}).toArray((err, items) => {
            if (err) {
                console.log("Error: " + err.message);
                res.send({ "error": "Error while getting all data from DB." });
            }
            else {
                res.send(items);
            }
        })
    });

    //Get Data with particular id
    app.get('/student/:id', (req, res) => {
        console.log('Get book with particular ID');
        const idToFetch = req.params.id;
        db.collection('books').findOne({ '_id': new ObjectID(idToFetch) }, (err, item) => {
            if (err) {
                console.log("Error: " + err.message);
                res.send({ "error": "Error while get particular data with id from DB." });
            }
            else {
                res.send(item);
            }
        })
    });

    //Create/Insert Data
    app.post('/student', (req, res) => {
        console.log('Insert a new book detail');
        const noteToInsert = { name: req.body.name,edition: req.body.edition,year: req.body.year };
        db.collection('books').insertOne(noteToInsert, function (error, response) {
            //assert.equal(null, err);
            if (error) {
                console.log("Error: " + error.message);
                res.send({ 'Error': "Error while inserting data in DB." });
            }
            else {
                console.log(req.body);
                console.log('inserted record', response.ops[0]);
                //res.send(response);
                //res.json(response);
                res.send({ 'Success': "Item added successfully!!" });
            }
        })
    });

    //Delete Data with particular id
    app.delete('/student/:id', (req, res) => {
        console.log('Delete book detail with particular ID');
        const idToRemove = req.params.id;
        //get list of students
        db.collection('books').remove({ '_id': new ObjectID(idToRemove) }, (err, result) => {
            if (err) {
                console.log("Error: " + err.message);
                res.send({ 'Error': "Error while deleting data from DB." });
            }
            else {
                res.send({ 'Success': "Item removed successfully!!" });
            }
        })
    });

    //Update Data with particular id
    app.put('/student/:id', (req, res) => {
        console.log('Update book detail with particular ID');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { name: req.body.name,edition: req.body.edition,year: req.body.year };
        db.collection('books').update(details, note, (err, result) => {
            console.log(req.body);
            if (err) {
                console.log("Error: " + err.message);
                res.send({ 'Error': "Error while updating data." });
            }
            else {
                //console.log('Updated record', result);
                //res.send(result);
                res.send({ 'Success': "Item updated successfully!!" });
            }
        })
    });
};
