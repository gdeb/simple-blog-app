
import rimraf from 'rimraf';
import mkdir from 'mkdirp';
import fs from 'fs';
import {execFileSync, spawn} from 'child_process';

function remove_folder (path, logger) {
    if (logger) {
        logger('removing', path);
    }
    rimraf.sync(path);
}

function make_folder (path, logger) {
    if (logger) {
        logger('adding', path);
    }
    mkdir.sync(path);
}

function exec_cmd(cmd_line, logger) {
    const [cmd, args] = split_command(cmd_line);
    try {
        const result = execFileSync(cmd, args).toString();
        if (result === "") {
            return;
        }
        if (logger) {
            for (let line of result.split('\n')) {
                logger(line);
            }
        }
    } catch (e) {
        logger('ERROR');
    }
}

function split_command (cmd) {
    const [command, ...args] = cmd.split(" ");
    return [command, args];
}

function spawn_child_process(cmd_line, logger) {
    const [cmd, args] = split_command(cmd_line);

    const cp = spawn(cmd, args);
    function child_logger (data) {
        logger(data.slice(0, data.length - 1).toString());
    }
    cp.stdout.on('data', child_logger);
    cp.stderr.on('data', child_logger);
    return cp;
}

export default {
    remove_folder,
    make_folder,
    exec_cmd,
    spawn: spawn_child_process,
};
