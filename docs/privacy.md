Effective 12 September 2026.

Greatbook is published under the name Doublespaced by Justin Delano, an individual developer.
Doublespaced is a trading name rather than a company: there is no incorporated entity behind it, and it is not a school or a district. It operates no servers.

This policy is short because there is very little to describe.

## The short version

Greatbook collects nothing about your students, and nothing about you unless you buy something.

There is no account, no sign-up, no analytics, no advertising, no tracking, and no third-party scripts on the pages of this app.
Your gradebook is stored on your own computer.
Nothing about it reaches the developer, at any point, in any form.

Buying the premium version means a shop is involved, and it learns your email address and how you paid.
That is set out under "Paying for the premium version" below.
It is the one place where anything about you reaches anyone, and even there it is an order, never anything about a student.

## What Greatbook stores, and where

Everything you enter, meaning your classes, students, assignments, standards, scores, grades, and comments, is stored on the device you entered it on.

Depending on the device and what you have switched on, that means the app's own storage on that device, a file in a folder you chose, dated backup files in a folder you chose, and, if you turn it on, a file in your own Google Drive.

All of those belong to you.
They are on your hardware or in your own accounts.
The developer has no access to any of them and no way to obtain them.

## Google Drive backup

Google Drive backup is optional and off unless you switch it on.
It is the only feature that sends any of your work anywhere, and the only network the app uses besides checking a key and looking for a new version.

When you switch it on, you sign in through Google's own window and grant permission using the `drive.file` scope.
That scope limits the app to files it created itself, plus any file you explicitly choose with Google's file picker.
It cannot list your Drive or read your other files.

What is stored in your Drive is your gradebook file.
It goes from your device to your Google Drive directly.
It does not pass through any server operated by the developer, because none exists.

The app keeps a Google access token on your device so that it can continue writing without asking you again.
That token stays on the device and is discarded when you turn Drive backup off.

Greatbook's use of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.

In plain terms: the Google data the app touches is used only to provide the backup feature you asked for.
It is never transferred to anyone, never used for advertising, never sold, and never read by a human.

You can withdraw the permission at any time, from Settings inside the app or from [your Google account](https://myaccount.google.com/permissions).

## Paying for the premium version

The premium version is sold through Polar, who are the merchant of record.
That means the sale is theirs: they take the payment, they handle the tax, and they hold whatever a shop has to hold about a customer.

Polar receives your email address and your payment details, under [their own privacy policy](https://polar.sh/legal/privacy).
The developer never sees a card number.
What the developer can see, in Polar's dashboard, is an order: an email address, the country it was taxed in, and which key belongs to it.

Nothing about your students is part of that, and no gradebook data of any kind passes through the shop.

### Turning a key on, and checking it afterwards

When you first paste your key, the app tells Polar the key, your Google account's identifier, and your Google email address.
The email address is there so that the owner can find your activation in the dashboard when you write in for help; the identifier is what ties the key to your account so it stays yours.

Afterwards, the occasional check sends the key, the identifier of this activation, and your Google account identifier.
The email address is not sent again.

None of these requests carry your gradebook, your students, your scores or their grades.
There is nothing about a student anywhere in the licence machinery.

Each request goes from your computer straight to Polar, because there is still no server of ours in the middle.

Releasing a device, with "Remove this key from this computer", sends the key and that activation and nothing else.

## Student data, and who is responsible for it

Greatbook is a tool a teacher runs on their own device, in the way a spreadsheet is.
The information you enter about students never reaches the developer, so the developer is not in a position to disclose it, lose it, or be compelled to hand it over.

Responsibility for the student information you enter rests with you and your school or district, under whatever policies and laws apply to you, which in the United States generally means FERPA and any state student privacy law.
Because the data stays in your possession, using Greatbook does not create a disclosure of student records to a third party.

If your district requires a data processing agreement or a vendor privacy review before software may hold student information, please raise this page with them.
The honest summary to give them is that no student data leaves the teacher's device except, optionally, into the teacher's own Google Drive, and that the only other traffic the app makes is a licence check and a version check, neither of which carries anything about a student.

Greatbook is not directed at children and children do not use it.
It is used by teachers, about students.

## This website

The pages on this site are served by GitHub Pages.
GitHub logs requests to the servers it runs, as any web host does, and that is described in the [GitHub Privacy Statement](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement).

This site sets no cookies, includes no analytics, and embeds nothing from anyone else.

Downloading an installer downloads a file from GitHub Releases, which GitHub logs in the same way.

## Changes to this policy

If this policy changes, the effective date at the top changes with it, and the previous versions remain readable in [the history of this page](https://github.com/doublespacedapp/website/commits/main/docs/privacy.md).

A change that would mean collecting anything about a student, or anything about you beyond an order, would be announced in the app and not only here.

## Getting in touch

Questions about this policy, and anything about a purchase or a key: [support@doublespaced.app](mailto:support@doublespaced.app).

Questions about the app itself are better on [the issue tracker](https://github.com/doublespacedapp/greatbook/issues), where other teachers can see the answer too.

Please do not include real student names or scores in an issue, since issues are public.
