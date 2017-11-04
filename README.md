# NAnt plugin

<img src="https://cdn.rawgit.com/clarive/cla-nant-plugin/master/public/icon/nant.svg?sanitize=true" alt="NAnt Plugin" title="NAnt Plugin" width="120" height="120">

The NAnt plugin will allow you to launch NAnt commands for your .NET projects from a Clarive instance.

## What is NAnt

NAnt is a free, open source .NET software tool for automating software build processes. It is similar to Apache Ant, but
targeted at the .NET environment as opposed to the Java environment.

## Requirements

NAnt must be installed in order for the plugin to work properly.

## Installation

To install the plugin, place the `cla-nant-plugin` folder inside the `$CLARIVE_BASE/plugins` directory in a Clarive
instance.

### NAnt Task Service

This palette service will allow you to choose the option that you wish to perform with NAnt. The various settings from
the palette service are:

- **Server (variable name: server)** - Server where you wish to execute the code. 
- **User (user)** - User which will be used to connect to the server.
- **Project path (path)** - Directory for project build file.
- **Command (command)** - This contains a series of commands that may be launched with the service, as well as allowing you to
  write a custom one.
- **Custom command or arguments (custom_args)** - Here you can write arguments for the selected command or write the commands you wish
  to perform.

**Only Clarive EE**

- **Errors and output** - These two fields concern management of control errors. They contain the following options:
   - **Fail and output error** - Search for a configured error pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Warn and output warn** - Search for a configured warning pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Custom** - Where combo box errors is set to custom, a new form is displayed to define behavior using the
     following fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **NAnt task**

Example:

```yaml
    Server: NAnt-Server
    Path: /home/nant_project/
    Command: Custom
    Custom command or arguments: clean build run
    Errors: fail
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: NAnt demo
do:
   - nant_task:
       server: nant_server   # Required. Use the mid set to the resource you created
       user: ${username}
       command: "custom"    # Required
       path: "/projects/ant_project/"   # Required
       custom_args: ['clean', 'build', 'run']
```

##### Outputs

###### Success

The service will return the console output for the command.

```yaml
do:
    - nant_task:
       server: nant_server   # use the mid set to the resource you created
       user: "clarive_user"
       command: "custom"
       path: "/projects/nant_project/"
       custom_args: ['-help']
```

For this command the output will be the help for NAnt.

###### Possible configuration failures

**Build failed**

```yaml
Buildfile: example.build does not exist!
Build failed
```

Make sure that the option is available for NAnt, and also that you set the correct project path and the .build file exist.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "nant_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "nant_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.