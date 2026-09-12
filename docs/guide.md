Greatbook has seven places along the top: Setup, Grades, Benchmarks, Behaviors, Contacts, Trends and Reports.
You will spend nearly all your time in Grades.

Three of those tabs are optional and are switched on per class in Setup, so a class that does not need them does not carry them.

Every tab has a question mark in its corner that explains that tab, and Settings has the whole tour if you would rather be walked through it.

## Setting up a class

Setup is where you describe a class once, and it has a panel for each part of that.

<figure class="shot">
  <img src="./shots/setup.png" alt="The Setup tab, with a rail down the left listing Class, Students, Subjects, Grading, Categories, Standards, Behaviors and Contacts, and the Class panel open beside it showing grading periods with start and end dates." width="3200" height="1800" loading="lazy">
  <figcaption>Setup, with the Class panel open.</figcaption>
</figure>

Class is the name, the grade level, and the grading periods the year is divided into.
A grading period is a stretch of dates, and they may not overlap, because a score has to belong to exactly one of them.
This is also where Benchmarks, Behaviors and Contacts are switched on or off for the class.

Students is your roster.
You can paste a whole list at once rather than typing names one at a time.

Subjects are the areas you teach, and they colour and group everything else.
Each one carries a symbol you choose.

Standards are what you are actually assessing.
Each one belongs to a subject, and has a short code and a longer description.

Categories are the kinds of work you assign, such as homework, quizzes, or projects.

Grading is where you say what each category is worth, and how the levels you record turn into a course grade.

You can change any of this later.
Nothing is fixed once the year starts.

### Bringing a class in rather than typing it

Under Setup, then Class, there are two ways to fill a class without entering it by hand.

**Google Classroom.** In Classroom, open Classwork, open any assignment, then the gear on the student work page: Download all grades as CSV.
That one file holds the whole class, and Greatbook reads your roster, your assignments and your marks out of it.

Nothing changes until you press Import.
Before that you are shown what it would do: which assignments it would add, how many marks it would fill in, which students in the file are not in your class, and which marks in the file disagree with marks you have already entered.
Where they disagree you choose once, for all of them, between keeping yours and taking the file's.
It never deletes anything, and a file imported a second time updates what is already there instead of duplicating it.

**A template.** A class saved as a template elsewhere can be opened here, and you choose which parts come with it: subjects, standards, categories, grading settings, assignments, benchmarks, behaviour names, contact methods, students.
That is how you carry a course into next year, or hand it to a colleague who teaches the same thing.
Duplicate does the same within this gradebook.

### Standards without typing them

<figure class="shot">
  <img src="./shots/standards-import.png" alt="The Import standards dialog, offering Common Core Math with 517 standards in 186 groups, Common Core English Language Arts, the Next Generation Science Standards, or a file; a subject to import into; a grade filter reading Importing grade 4; and a summary reading 59 new, 4 updated, 0 already here." width="3200" height="1800" loading="lazy">
  <figcaption>Three sets are built in, and the dialog counts what it would change before it changes it.</figcaption>
</figure>

Setup, then Standards, then Import.

Common Core Math, Common Core English Language Arts and the Next Generation Science Standards are included.
Each set covers kindergarten through grade 12, so you narrow it to the grade you teach on the way in rather than importing thirteen years of standards into one class.

If your district has its own, a CSV with columns `code, label, description, parent, grade` works, and so does a CASE package.

Like the Classroom import, it counts what it would do first, and importing the same set again updates it in place.

## Entering grades

Grades is a grid: students down the side, assignments across the top.

<figure class="shot">
  <img src="./shots/grid.png" alt="The Grades tab with fourteen assignment columns, each headed with its date, its points and its standard, scores filled in for twenty-four students, some cells marked M in red for missing and Ex for excused, a running grade per student, and a class average row." width="3200" height="1800" loading="lazy">
  <figcaption>A running grade per student down the left, and a class average along the bottom.</figcaption>
</figure>

It is built to be filled in without a mouse.
Arrow keys move between cells, typing enters a score, and Enter moves down to the next student, so a stack of papers goes in as fast as you can read them.

Single letters cover the rest.
Type `m` for missing and `x` to excuse a piece of work, `l` after a score for late, and Delete to clear a cell.
A panel under the cursor says what the cell you are on will accept, so you do not have to remember which assignment is marked out of what.

An assignment can be scored four ways: out of points, as a percent, as a level, or simply done and not done.
It can be marked as extra credit, or as not counting toward the grade at all.

Right-clicking a cell gives the same things as a menu, along with a comment on that one score, which shows as a small corner mark afterwards.

Whole ranges of scores can be copied, cut and pasted, and undo covers it in one step.

Subjects, standards, categories and dates all filter the grid.
Narrow it to one standard and you are looking at how the whole class is doing on that one thing, in the same grid, with nothing to set up.
Colour follows performance rather than decoration, so where a class is struggling is visible before you have read a single number.

There is a list layout beside the grid, for working on one assignment at a time rather than the whole class at once.

## Assignments

An assignment is described where it is created: what it is called, which category it belongs to, which standards it assesses, when it was given, and what it is marked out of.

An assignment can cover more than one standard.
That is the point of keeping standards separate from assignments: one project can tell you something about three different things, and the report card can say so.

## How a grade is worked out

<figure class="shot">
  <img src="./shots/grading.png" alt="The Grading panel, showing a choice between total points and weighted categories, what missing work counts as, a late penalty with a worked example, rounding, and editable scales for levels and for letter grades." width="3200" height="1800" loading="lazy">
  <figcaption>Grading, where the rules are yours and are shown working.</figcaption>
</figure>

Setup, then Grading.

A course grade is either total points or weighted categories, and if it is weighted you say what each category is worth and how many low scores are dropped.

Missing work either counts as a zero or does not count at all.
Late work can be docked a fixed number of points, or a percentage, or nothing; levels and done-or-not are never docked, because there is nothing sensible to take off.
Whatever you choose, a worked example underneath shows the rule applied to a real number, so you can see what you have just decided before a single grade depends on it.

Two scales are yours to edit: the levels you record against standards, and the letter grades, each with the minimum percent that earns it.

Standards mode turns the whole thing over to levels: every score becomes a level, and no percents or letter grades are shown anywhere.

## Benchmarks

Tests you give a few times a year to see where students are.

<figure class="shot">
  <img src="./shots/benchmarks.png" alt="The Benchmarks tab: a grid of students against testing sessions, each result coloured by the band it falls into." width="3200" height="1800" loading="lazy">
  <figcaption>Benchmarks, with each result coloured by the band it falls in.</figcaption>
</figure>

A benchmark is the thing you measure, such as oral reading fluency or multiplication facts in two minutes, and a session is one sitting of it.
You set the bands yourself, with a colour each, so a raw score reads as approaching or met without your having to remember the cut-offs.

Benchmark results stay out of the course grade.
They are a separate measurement, and mixing them into an average would make both harder to read.

## Behaviors

A record of what happened and when, for conferences and referrals.

<figure class="shot">
  <img src="./shots/behaviors.png" alt="The Behaviors tab: a grid of students against school days, with red marks for interfering behaviour and green for desired, and a running total for each student." width="3200" height="1800" loading="lazy">
  <figcaption>Behaviors, a grid of students against school days.</figcaption>
</figure>

Each record is a student, a day, what happened, and if you want it, what came before it and what followed.
The words for all of that are yours: Setup has a panel for naming the behaviours, the antecedents and the consequences your school actually uses.

There is a list beside the grid that shows the notes in full.

## Contacts

A record of calls and emails home, and who you still owe one.

<figure class="shot">
  <img src="./shots/contacts.png" alt="The Contacts tab: a grid of students against contact methods, with a column showing when each student was last contacted." width="3200" height="1800" loading="lazy">
  <figcaption>Contacts, with a Last column for who has not heard from you.</figcaption>
</figure>

The methods are yours to name in Setup, whether that is a phone call, an email, or a note sent home.
The Last column is the useful one in March, when the question is not who you have spoken to but who you have not.

## Trends

Trends draws what you have already entered over time.

<figure class="shot">
  <img src="./shots/trends.png" alt="The Trends tab: a line chart of one student against three standards with the class average drawn behind, and a histogram underneath showing how the class was spread across one assignment." width="3200" height="1800" loading="lazy">
  <figcaption>One student against three standards, with the class average behind.</figcaption>
</figure>

It draws from three places, and you choose which: grades, benchmarks, or behaviours.

For one student it shows whether they are climbing or sliding, standard by standard, up to four standards at once.
Tick "Compare with class average" and the class is drawn behind them.
For the class it shows the same thing as an average, so you can see whether a unit landed.

Underneath, a histogram shows how the class was spread across a single assignment, with the student you are looking at marked in it.

Every chart has a Show table button.
The numbers behind a picture should not be somewhere you have to go and find.

## Report cards

Report cards give you a page for each student, for each grading period.

<figure class="shot">
  <img src="./shots/report-card.png" alt="A report card for Avery Chen: Math at 64.8 percent, then each standard listed with its own score and level, then a benchmark result, then a box for the report card grade and a comment." width="3200" height="1800" loading="lazy">
  <figcaption>The course grade, the standards underneath it, and the grade you decide.</figcaption>
</figure>

It shows the course grade the assignments add up to, and beside it, where the student stands on each standard.
Those are different questions and the page keeps them apart on purpose: an average is not the same as knowing whether a student can do something.

Then there is the grade you decide to give, which is yours and is not calculated, and room for comments.
A comment you find yourself writing every term can be saved and used again on another card.

A report is its own thing, with its own dates, and you can have as many as you like.
What appears on the card is a setting of that report: grades, standards, categories, benchmarks, behaviours and contacts can each be included or left off.
A card that goes home to a parent and a card that goes to a meeting are not the same card.

Where a grade comes from is shown rather than asserted: the category breakdown gives each category's weight, the scores that were dropped, and the arithmetic behind the percent.

Printing is a button on the card, and what prints is laid out for paper, with ruled lines for a signature and a date.

Finalising a report card fixes what it says, so a grade you have already sent home does not quietly change when you enter a late assignment afterwards.
You can reopen one later.

## Undo

There is an undo button in the top bar, and it covers what you have done in this session.
It is there because the fastest way to enter grades is also the fastest way to enter one in the wrong row.

## Trying it first

On the first screen, choose Try a sample class.

It fills the app with invented students and invented work so that every screen has something in it, and you can look around without having typed anything real.
Nothing in it is saved, and it never becomes your gradebook.
