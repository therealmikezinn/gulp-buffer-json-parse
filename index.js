const through2 = require('through2');

const PluginError = require('plugin-error');

module.exports = function(){
    return through2.obj(function (file, enc, cb) {
        const self = this;

        if (!file.isBuffer()) {
            const errObject = new PluginError(`Error Parsing JSON`);
            self.emit('error', errObject);
            return cb(errObject);
        }

        const { contents } = file;

        try {
            self.push(JSON.parse(contents.toString(enc)));
            return cb();
        } catch(err) {
            const errObject = new PluginError(`Error Parsing JSON: ${err}`);
            self.emit('error', errObject);
            return cb(errObject);
        }
    });
};
