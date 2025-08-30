---
layout: default
title: "Useful macOS programs"
---

# Some useful programs on macOS

I'm not particularly a fan of Apple or macOS (nor any other brand for that
matter), but I've been using their hardware and software on and off for some
time. As a user, my impression is that macOS is getting worse with every new
release (a pity, because Apple’s hardware is quite reliable these days). That
said, macOS still includes some useful tools that you might not be aware of.

## Utilities

### Check network connection
You can quickly measure network performance with:

```
networkQuality
```

After a short while, it will display upload speed, download speed,
responsiveness, and latency.

### Prevent sleep

To stop your system from sleeping, use:

```
caffeinate -disu
```

This will prevent:

- The display from sleeping
- The system from idle sleeping
- The system from sleeping (only on AC power)
- The current user from going inactive

See `man caffeinate` for more details.

### Window management

Window management in macOS has improved slightly in recent versions. You can
move and resize windows with keyboard shortcuts. Open **System Settings >
Keyboard > Keyboard Shortcuts**, then check the **Window** section for
configuration options. It’s not perfect, but better than nothing.

### Other handy built-ins

- `pbcopy` / `pbpaste`: copy and paste text from the clipboard in the terminal

## For programming

A common first step when setting up macOS for development is to install
Homebrew. It’s a great package manager, but you don’t need it just to get
started, macOS already provides quite a bit out of the box.

To install the Command Line Tools for Xcode (without the full Xcode IDE):

```
xcode-select --install
```

This downloads compilers (`clang`, `swift`), formatters (`clang-format`,
`swift-format`), debuggers (`lldb`), SDKs (like `python3` with `pip3`), and
`git`.

Even without the Command Line Tools, macOS ships with some basics like `vim`
(version 9.1), `screen` (an ancient version without true color support), and other
utilities. The drawback is that these tools are often outdated and may lack
features. But if that doesn’t bother you, they’re perfectly usable.

A version of macOS without the default "Applications" (or at least the
possibility to remove them entirely) and up to date versions of these tools it
would be so much better, but that will probably never happen.

[back](../)
