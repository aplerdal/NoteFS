var dirs = [];
if (localStorage.getItem("dirs") != null) dirs = localStorage.getItem("dirs");
var path = "/";
var term = $('#terminal').terminal(function(command){
        var cmd = $.terminal.parse_command(command);
        if (cmd.name === 'cd') {
            this.echo(cmd.args[0]);
            term.set_prompt(cmd.args[0]);
        }
    }, {
        greetings: 'Note File System 1.0',
        height: 600,
});

function addFolder(array, name){
    array.push({"name":name, "subfolders":[], "content":[]});
}
function addContent(array, content){
    array.push(content);
}