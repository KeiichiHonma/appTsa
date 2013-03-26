var dbc = {};
var db_setting = {
    "table_save":'save',

    };
(function() {
    dbc.getSaveProperty = function() {
        //db:sqlite
        var db = Ti.Database.open(db_setting.table_save);
        db.execute('create table if not exists ' + db_setting.table_save + ' (tid integer)');
        var rows = db.execute('select rowid,* from ' + db_setting.table_save);
        rows.close();
        db.close();
        return rows;
    };

    dbc.getSaveTidProperty = function(tid) {
        //db:sqlite
        var db = Ti.Database.open('save');
        db.execute('create table if not exists save (tid integer)');
        var rows = db.execute('select rowid,* from save where tid = ' + tid);
        rows.close();
        db.close();
        return rows;
    };
})();