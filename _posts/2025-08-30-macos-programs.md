---
layout: default
title: "macOS programs"
---

# Some useful programs on macOS

I'm not particularly a "fan" of Apple or macOS (or any other brand for that
matter) but it just happens that I've been using their hardware and software on
and off for some time. As a user, my experience is that macOS is getting
"worse" with every new release (it's a pity because these days Apple's hardware
works really well), but it still has useful tools that you might not be aware
of.

### Utilities

To check your **network connection**, open your terminal and issue the following command:

```
networkQuality
```

After a short while, the program will display the upload speed, download speed,
responsiveness and latency.


If you want to avoid your system from sleeping, you can use:

```
caffeinate -disu
```

This will prevent:
- The display from sleeping
- The system from idle sleeping
- The system from sleeping (only works if the system is running on AC power)
- Keep the current user as active

I often see people download "Apps" from the App Store to do this, but there's
absolutely no need for that, unless you prefer using it of course.

Check `man caffeinate` for more information.

Window management has been improved slightly on macOS in latest versions,
you can use keyboard shortcuts to move and resize windows. Once again,
not the best (nor complete) solution, but it's already better than nothing.
Open System Settings > Keyboards > Keyboard Shortcuts and have a look at the
Window section for more information.

### For programming

I know that the first thing some people do when setting up macOS for
programming is to install Homebew, before installing the usual tools they need
such as: git, ripgrep, etc... I have nothing against Homebrew, I've been using
it for some time and it's always worked fine for my use case. My point is that
you don't need to install it in order to get git or other programs on macOS.

You can simply open a terminal and use the following command:

```
xcode-select --install
```

This will download and install the Command Line Tools for Xcode (without
installing the Xcode IDE itself) which are command line programs such as
compilers (clang, swift), formatters (clang-format, swift-format), debuggers
(lldb), sdks (python3 with pip3) and git.

There's also vim (version 9.1) installed on macOS in case you want to use
what's already included. There's also a version of (gnu) `screen` installed
if you want a to use terminal multiplexer, unfortunately, it's quite an old
version that doesn't support "true" colors (just like Terminal.app).

If Apple cared about it's users and released a version of macOS without the
default "Applications" (or at least let the user remove them) and up to date
versions of these tools it would be better, but that will probably never
happen.
