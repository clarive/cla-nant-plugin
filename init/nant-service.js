var reg = require("cla/reg");

reg.register('service.nant.task', {
    name: _('NAnt task'),
    icon: '/plugin/cla-nant-plugin/icon/nant.svg',
    form: '/plugin/cla-nant-plugin/form/nant-service-form.js',
    rulebook: {
        moniker: 'nant_task',
        description: _('Executes NAnt commands'),
        required: [ 'server', 'command', 'path'],
        allow: ['server', 'command', 'path', 'custom_args', 'user', 'errorType'],
        mapper: {
            'server':'nantServer',
            'custom_args':'custom'
        },
        examples: [{
            nant_task: {
                server: 'nant_server',
                user: 'clarive_user',
                command: 'custom',
                path: "/projects/ant_project/",
                custom_args: ['-version'],
                errorType: "fail"
            }
        }]
    },
    handler: function(ctx, params) {

        var reg = require('cla/reg');
        var fs = require('cla/fs');
        var log = require('cla/log');

        var server = params.nantServer;
        var path = params.path;
        var errors = params.errors || 'fail';
        var command = params.command;
        var customParams = params.custom;
        var fullCommand = "";
        var user = config.user || "";

        if (server == "") {
            log.fatal(_("No server selected"));
        }

        function remoteCommand(params, command, server, errors) {
            var output = reg.launch('service.scripting.remote', {
                name: _('NAnt task'),
                config: {
                    errors: errors,
                    server: server,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        if (command == "custom") {
            fullCommand = "cd " + path + " && nant " + customParams.join(" ");
        } else if (command == "") {
            log.fatal(_("No option selected"));
        } else {
            fullCommand = "cd " + path + " && nant " + command + " " + customParams.join(" ");
        }

        log.info(_("Starting NAnt task"));
        var response = remoteCommand(params, fullCommand, server, errors);
        log.info(_("NAnt task finished"));
        return response.output;
    }
});