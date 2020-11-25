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
- Attribute <code>data-modal-close-img</code>: a path to a valid image for the close button.
- Attribute <code>data-modal-focus-id</code>: when opening a modal, provides focus to the matching <code>id</code> (see [example on “It’s free” button](https://a11y.nicolas-hoffmann.net/modal/)).
- Attribute <code>data-modal-aria-modal</code>: adds attributes <code>aria-modal="true"</code> to the code of the modal.
- Attribute <code>data-modal-remove-role-dialog</code>: removes <code>role="dialog"</code> of the code of the modal.
- Attribute <code>data-modal-use-role-alertdialog</code>: instructs the modal to use <code>role="alertdialog"</code>.
- Attribute <code>data-modal-remove-dialog-tag</code>: instructs the modal to use <code>div</code> instead of using <code>dialog</code> tag.

If you need to close it, add `class="js-modal-close"` on an element in the modal content, it will trigger a click on close button.

Enjoy.

<img src="https://www.nicolas-hoffmann.net/bordel/chuck-norris1.jpg" alt="Chuck Norris approved this" />

P.S: this plugin is in [MIT license](https://github.com/nico3333fr/jquery-accessible-modal-window-aria/blob/master/LICENSE). It couldn't be done without the precious help of @ScreenFeedFr, @sophieschuermans, @johan_ramon, @goetsu and @romaingervois.


# Vanilla JS version

Similar version as above but without any jQuery dependency.

## Differences

- page content is not wrapped but every ``body > *`` element is deactivated when dialog is open
- dialog is reused and only deactivated if closed
- ``js-modal`` elements are not automatically activated as modals (see next)
- uses ``a[href=#...]`` if available as modalContentId
- in addition to ``data-model-...`` options added programmatic option

    // inits all js-modal elements and use data-attributes as jQuery Version
    jsModal('.js-modal')

    // or add options as api fields
    jsModal({
      selector: '.api-js-modal-button',
      modalCloseText: 'CLOSE IT! API button',
      modalCloseTitle: 'CLOSE IT Title',
      modalTitle: 'Title:',
      modalContentId: 'content_id' // explicit id
    })

    // minimal setup, uses href hash of link as modalContentId
    jsModal({
      selector: '.api-js-modal-a'
    })



## Styling

Body elements gets a ``jsmodal-open`` class when dialog is opened. This way you can style dialog and content overlay to open with e.g. transitions etc.

See vanilla.html for an example.



