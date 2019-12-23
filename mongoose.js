let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let Schema = mongoose.Schema;
let Tasks = new Schema({
    project: String,
    description: String
});

let Task = mongoose.model('Task', Tasks);
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bike shed red.';
task.save(function (err) {
    if (err) throw err;
    console.log(('Task saved'));
});

Task.find({'project': 'Bikeshed'}, function(err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

Task.update(
    {_id: '5e009347aa90f23674e5dbab'},
    {description: 'bla bla bla'},
    {multi: false},
    function (err) {
        if (err) throw err;
        console.log(('Updated'));
    }
);

Task.findById('5e009347aa90f23674e5dbab', function (err, task) {
    if (err) throw err;
    if(!task) {
        console.log(('No such record'));

        return;
    }
    task.remove();
});