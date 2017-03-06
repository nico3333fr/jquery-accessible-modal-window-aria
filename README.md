# jQuery Simple and Accessible Modal Window

This jQuery plugin provides you a shiny and accessible modal window, using ARIA.

A presentation page and demo is here: https://a11y.nicolas-hoffmann.net/modal/ (with styles, etc.)

## How it works

Basically, it wraps all the page into a <code>div id="js-modal-page"</code>, and when you activate one modal, the scripts inserts a <code>dialog</code> element at the end of your page, adds the <code>noscroll</code> class on the <code>body</code> element (to remove scroll with CSS if needed), puts the focus into it and traps focus in the modal window. When you exit it, the focus is given back to the element that opened it.

For mouse users, they can click outside the modal window to close it. For keyboard users, you can strike Esc to close it.

If you never activate a modal window, it won’t be anywhere in the code.

## Options and attributes

Simply put class="js-modal" on a button or a link to activate the script.

- Attribute <code>data-modal-text</code>: the text of your modal window (will be put into a p tag).
- Attribute <code>data-modal-content-id</code>: the id of (hidden) content in your page that will be put into your modal window.
- Attribute <code>data-modal-title</code>: the main title of the modal window.
- Attribute <code>data-modal-close-text</code>: the text of the close button in your modal window.
- Attribute <code>data-modal-close-title</code>: the title attribute of the close button in your modal window.
- Attribute <code>data-modal-background-click="disabled"</code>: disable the possibility to click outside the modal window to close it.

Enjoy.

<img src="https://www.nicolas-hoffmann.net/bordel/chuck-norris1.jpg" alt="Chuck Norris approved this" />

P.S: this plugin is in [MIT license](https://github.com/nico3333fr/jquery-accessible-modal-window-aria/blob/master/LICENSE). It couldn't be done without the precious help of @ScreenFeedFr, @sophieschuermans, @johan_ramon, @goetsu and @romaingervois.
