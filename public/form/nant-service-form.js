(function(params) {

    var data = params.data;

    var nantServerCombo = Cla.ui.ciCombo({
        name: 'nantServer',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.nantServer || '',
        allowBlank: false,
        with_vars: 1
    });

    var userTextField = Cla.ui.textField({
        name: 'user',
        fieldLabel: _('User'),
        value: data.user || '',
        allowBlank: true
    });

    var commandComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Command'),
        data: [
            ['build',_('Build project')],
            ['clean',_('Clean project')],
            ['-projecthelp',_('Project help')],
            ['-find',_('Search parent directories for build file')],
            ['custom',_('Custom command')]
        ],
        value: data.command || 'build',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var customParams = Cla.ui.arrayGrid({
            fieldLabel: _('Custom commands or arguments'),
            name: 'custom',
            value: data.custom,
            description: _('Custom commands or arguments'),
            default_value: '.'
    });

    var pathText = Cla.ui.textField({
            name: 'path',
            fieldLabel: _('Project Path'),
            value: data.path || '',
            allowBlank: false
        });


    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: data.rcError,
        errorTabsValue: data
    })

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            nantServerCombo,
            userTextField,
            pathText,
            commandComboBox,
            customParams,
            errorBox
        ]
    });

    return panel;
})
