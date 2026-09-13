Effective 12 September 2026.

Greatbook is published under the name Doublespaced by Justin Delano, an individual developer.
Doublespaced is a trading name rather than an incorporated company, and it operates no servers of its own.

## The short version

Greatbook collects nothing about your students, and nothing about you unless you buy something.

In the app there is no account and no sign-up.
It runs no analytics or tracking, carries no advertising, and loads no third-party scripts.
Your gradebook is stored on your own computer.
Nothing about it reaches the developer in any form.

Buying the premium version means a shop is involved, and it learns your email address and how you paid.
That is set out under "Paying for the premium version" below.
That is the only case where information about you reaches anyone else, and what reaches them is an order, not anything about a student.

## What Greatbook stores, and where

Everything you enter, meaning your classes, students, assignments, standards, scores, grades, and comments, is stored on the device you entered it on.

Depending on the device and what you have switched on, that means the app's own storage on that device, a file in a folder you chose, dated backup files in a folder you chose, and, if you turn it on, a file in your own Google Drive.

All of those live on your hardware or in your own accounts, so they are yours.
The developer has no access to any of them and no way to obtain them.

## Google Drive backup

Google Drive backup is optional and off unless you switch it on.
It is the only feature that sends any of your work off the device.
Apart from it, the app makes only two kinds of network request: a license check and a check for a new version.

When you switch it on, you sign in through Google's own window and grant permission using the `drive.file` scope.
That scope limits the app to files it created itself, plus any file you explicitly choose with Google's file picker.
It cannot list your Drive or read your other files.

Greatbook writes your gradebook file into your Drive, directly from your device.
It does not pass through any server operated by the developer.

The app keeps a Google sign-in token on your device so that it can continue writing without asking you again.
In the browser that token lasts about an hour and is held only for as long as the tab is open; the desktop app keeps one that lets it renew without asking you each time.
Turning Drive backup off deletes the token from the device. That does not withdraw the permission at Google's end, which you can do from the link below.

Greatbook's use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

The Google data the app touches is used only to provide the backup feature you asked for.
It is not sold, not used for advertising, and not transferred to anyone except where that Policy allows it.
In practice there is nowhere for it to go: it never leaves your device for anywhere but your own Drive, and the developer has no copy of it to transfer.

You can withdraw the permission at any time, from Settings inside the app or from [your Google account](https://myaccount.google.com/permissions).

## Paying for the premium version

The premium version is sold through Polar, who are the merchant of record.
That means the sale is theirs: Polar takes the payment, handles the tax, and holds the customer records for it under their own privacy policy.

Polar receives your email address and your payment details, under [their own privacy policy](https://polar.sh/legal/privacy).
The developer never sees a card number.
In Polar's dashboard, the developer can see the order: the email address you bought with, where it was taxed, which key belongs to it, and the usual commercial details of a sale. Nothing there concerns a student.

Nothing about your students is part of that, and no gradebook data of any kind passes through the shop.

### Turning a key on, and checking it afterwards

When you first paste your key, the app tells Polar the key, your Google account's identifier, and your Google email address.
The email address is there so that the owner can find your activation in the dashboard when you write in for help; the identifier is what ties the key to your account so it stays yours.

Afterwards, the occasional check sends the key, the identifier of this activation, and your Google account identifier.
The email address is not sent again.

None of these requests carry your gradebook, your students, your scores or their grades.

Each request goes from your computer to Polar directly.

Releasing a device, with "Remove this key from this computer", sends the key and that activation and nothing else.

## Student data, and who is responsible for it

Greatbook runs locally, on a teacher's own device.
The information you enter about students never reaches the developer, so the developer is not in a position to disclose it, lose it, or be compelled to hand it over.

Responsibility for the student information you enter rests with you and your school or district, under whatever policies and laws apply to you, which in the United States generally means FERPA and any state student privacy law.
Because the information stays in your possession, the developer is never a recipient of it.
Whether any of this affects your obligations is a question for your school or district rather than one this page can answer. If you turn on Drive backup with a school Google account, that copy sits in your school's own Google Workspace, under whatever agreement your district already has with Google.

If your district requires a data processing agreement or a vendor privacy review before software may hold student information, please raise this page with them.
The short version to give them is that no student data leaves the teacher's device except, optionally, into the teacher's own Google Drive, and that the only other traffic the app makes is a license check and a version check, neither of which carries anything about a student.

The version check asks GitHub, where the app is published, whether there is a newer release. GitHub sees that request the way it sees any download, including the IP address it came from, as described in the [GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement). It carries nothing about you and nothing about your gradebook. Settings has a switch to stop the app checking at all.

Greatbook is not directed at children, and it is not intended for students to use.
It is a tool for teachers, who enter information about their students.

## This website

The pages on this site are served by GitHub Pages.
GitHub logs requests to the servers it runs, as any web host does, and that is described in the [GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement).

This site sets no cookies, runs no analytics, and embeds no third-party content.

Downloading an installer downloads a file from GitHub Releases, which GitHub logs in the same way.

## Changes to this policy

If this policy changes, the effective date at the top changes with it, and the previous versions remain readable in [the history of this page](https://github.com/doublespacedapp/website/commits/main/docs/privacy.md).

A change that would mean collecting anything about a student, or anything about you beyond an order, would be announced in the app and not only here.

## Getting in touch

Questions about this policy, and anything about a purchase or a key: [support@doublespaced.app](mailto:support@doublespaced.app).

Questions about the app itself are better on [the issue tracker](https://github.com/doublespacedapp/greatbook/issues), where other teachers can see the answer too.

Please do not include real student names or scores in an issue, since issues are public.
