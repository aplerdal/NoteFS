const term = new Terminal();
term.open(document.getElementById('terminal'));
let dirs = {"r":{"testc":"content here!","testf":{}}};
let currentDirectory = "/r/";
let promptLength = 6;
let inputLine = '';
let cursorPosition = 0;
term.write('Welcome to the Xterm.js Echo Command Demo!\r\nType anything and press Enter:\r\n');
term.prompt = () => {
	term.write("\x1b[38;5;26m┌────(\x1b[38;5;75muser@org\x1b[38;5;26m)-[\x1b[38;5;75m/path/right/now]\n\r\x1b[38;5;26m└─ \x1b[38;5;75m$\x1b[0m ");
}
term.prompt();
term.onKey(e => {
    const ev = e.domEvent;
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
    if (ev.key === 'Backspace') {
        if (cursorPosition > 0) {
            inputLine = inputLine.slice(0, cursorPosition - 1) + inputLine.slice(cursorPosition);
            term.write('\x1b[1D'); // Move cursor left
            term.write(' '); // Write a space to remove the last character
            term.write('\x1b[1D'); // Move cursor left again
            cursorPosition--;
        }
        return;
    }
    if (ev.key === 'ArrowLeft') {
        if (cursorPosition > 0) {
            term.write('\x1b[1D'); // Move cursor left
            cursorPosition--;
        }
        return;
    }
    if (ev.key === 'ArrowRight') {
        if (cursorPosition < inputLine.length) {
            term.write('\x1b[1C'); // Move cursor right
            cursorPosition++;
        }
        return;
    }
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
        // Handle arrow up/down navigation (e.g., command history)
        // ...
        return;
    }
    if (printable) {
        inputLine = inputLine.slice(0, cursorPosition) + e.key + inputLine.slice(cursorPosition);
        term.write(e.key);
        cursorPosition++;
    }
    if (ev.key === 'Enter' || ev.key === 'Return') {
        handleCommand(inputLine);
        inputLine = '';
        cursorPosition = 0;
		term.prompt();
    }
});
function handleCommand(input){
    switch (input.trim()){
        case "ls":
            {
                term.write("\r\n");
                for (const key of Object.keys(dirs.r)){
                    let format = (typeof(dirs.r[key])==="object")?"\x1b[38;5;69m\x1b[1m":"\x1b[38;5;251m"
                    term.writeln(format+key+"\x1b[0m");
                }
            }
            break;
        default:
        case "help":
            term.write(`\r\n\x1b[1;3;31mCommands:\r\nhelp\r\nls\r\nmkdir\x1b[0m\r\n`);
    }
    return;
}
function openDir(pathtext){
    let patharray = pathtext.split("/")
    if (patharray[0] == ''){patharray = patharray.slice(1)}
    if (patharray[patharray.length-1] == ''){patharray = patharray.slice(0,patharray.length-1)} 
}