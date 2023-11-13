# PackageManager
Execute Flogram commands directly from your terminal.

##Installation
1. Clone this repository: ``git clone git@github.com:Flogram/PackageManager.git``
2. Navigate to the repository: ``cd PackageManager``
3. Install the package globally with ``npm install -g .`` to enable command access across your entire system.

## Commands
1. ``flo init`` - Initializes a Flogram Project. Sets up your folder and integrates version control.
2. ``flo run <filepath> <procedure> --args`` - Executes a Flogram function from a specified module path, with optional arguments.
3. ``flo signup`` Registers a Flogram account on our online hub, offering streamlined project version control tailored for Flogram projects.
4. ``flo login`` - Logs into your existing account for access to libraries and a simplified process for tracking and making changes.
5. ``flo logout`` - Logs out of your Flogram account.
6. ``flo install`` - Installs all necessary library packages.
7. ``flo install <package>``  - Installs a specific ``<package>`` in your library.
8. ``flo push`` - Uploads changes made to a library for collaborative development and access by other developers.
