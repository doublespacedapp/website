One application, built three ways.
Windows and macOS get an installer you double-click.
A Chromebook cannot run a program like that at all, so there Greatbook installs from the web instead, and ends up with its own icon and its own window just the same.

## Windows and macOS

<!--downloads-->

### The warning you will see the first time

Neither installer is signed yet, so both systems will stop you once.
Signing means paying a certificate authority every year for permission to be recognised, and that is not in place yet.
The apps are not different from any other; the computer simply has no way to know who made them.

On Windows, SmartScreen says "Windows protected your PC".
Choose More info, then Run anyway.

On macOS the first launch is blocked because the developer cannot be verified.
Open System Settings, then Privacy and Security, scroll down to the message about Greatbook, and choose Open Anyway.
Then launch it again.
The old trick of right-clicking and choosing Open no longer works on recent versions of macOS.

## Chromebook, in Chrome or Edge

Open [the web app](./app/).
Chrome shows an install button in the address bar, and the app's own top bar has one too.
Choose it and Greatbook gets an icon in your launcher and opens in its own window, with no tabs and no address bar.

Once it is installed it works with no internet connection.
The first visit needs a connection; after that it does not.

This is the same application as the installers, not a cut-down version of it.
The only real difference is where your gradebook file can live, which [the next page](./data.html) explains.

Chrome and Edge are what the web app needs, and it will tell you so rather than let you start in a browser it cannot keep a file in.
Firefox and Safari cannot hand a web app a file to write to at all, which for a gradebook is the whole job.
If one of those is your browser, take the desktop installer instead.

## Which one should I use

If you are on a school Windows laptop or a Mac, take the installer.
It can write your gradebook straight into your Documents folder without asking you anything.

If you are on a Chromebook, install it from the web; there is no other option, and it is a good one.

If you use Firefox or Safari, take the installer.
The web app needs Chrome or Edge to keep your gradebook in a file.

If you are on someone else's computer, or you just want a look, open the web app and choose Try a sample class on the first screen.
Nothing is saved anywhere you would have to clean up afterwards.

## Updating

The web app updates itself the next time you open it with a connection.
There is nothing to do.

The Windows and macOS apps check for new versions and offer them to you.
Nothing installs on its own: you are told there is a newer version and you press the button, which means an update cannot arrive in the middle of a marking session.
Settings, then About, has the version you are on, a button to check now, and a switch to stop checking altogether.

Your gradebook is a separate file and is not touched by an update.
