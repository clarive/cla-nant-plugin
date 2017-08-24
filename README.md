
# NAnt plugin

The NAnt plugin will allow you to launch NAnt commands for your .NET projects from a Clarive instance.

## What is NAnt

NAnt is a free, open source .NET software tool for automating software build processes. It is similar to Apache Ant, but
targeted at the .NET environment as opposed to the Java environment.

## Requirements

NAnt must be installed in order for the plugin to work properly.

## Installation

To install the plugin, place the `cla-nant-plugin` folder inside the `CLARIVE_BASE/plugins` directory in a Clarive
instance.

## How to Use

Once the plugin is correctly installed and the Clarive instance is restarted, you will have a new palette service called
'NAnt task'.

### NAnt Task Service

This palette service will allow you to choose the option that you wish to perform with NAnt. The various settings from
the palette service are:

- **Server** - Server where you wish to execute the code. 
- **Project path** - Directory for project build file.
- **Command** - This contains a series of commands that may be launched with the service, as well as allowing you to
  write a custom one.
- **Custom command or arguments** - Here you can write arguments for the selected command or write the commands you wish
  to perform.
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


Configuration example:

    Server: NAnt-Server
    Path: /home/nant_project/
    Command: Custom
    Custom command or arguments: clean build run
    Errors: fail

The service will return the console output for the command.

## Variables:

In order to use combo or texfield options from some services, you will need to use variables created in the Variable
Resource from Clarive, which will save repeating the configuration steps.

There are different Variable types (value, CI, textarea, array etc.), all of which are available in the Variable
Resource. The CI type is useful for the CI combos, as you will not be able to manually enter them into the combo,
whereas you will be able to do so for texfields.

The CI variable should be created with the following settings:

- **Type -** CI. 
- **CI Role -** Select the Role of the CI class you have in the combo. 
- **CI CLASS -** Select the specific CI Class it will use, usually the same class as the combo where you would like it
  to appear.
