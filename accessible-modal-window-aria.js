/*
 * Vanilla JS simple and accessible modal window, using ARIA
 * based on http://a11y.nicolas-hoffmann.net/modal/
 *
 * Author: https://github.com/cthedot/
 */

; (function (global) {
  "use strict";

  var idCount = 0
  var modalOptions = {}
  var $opener

  var $body
  var $overlay
  var $dialog
  var $document
  var $title
  var $close
  var $content

  function _initDialog() {
    // set up elements
    $body = document.querySelector('body')
    $overlay = document.createElement('div')
    $dialog = document.createElement('dialog')
    $close = document.createElement('button')
    $document = document.createElement('div')
    $title = document.createElement('h1')
    $content = document.createElement('div')

    $overlay.setAttribute('aria-hidden', true)
    $overlay.setAttribute('role', 'dialog')
    $overlay.setAttribute('class', 'jsmodal-overlay')
    $overlay.addEventListener('click', _closeModalHandler, false)

    $dialog.setAttribute('aria-hidden', true)
    $dialog.setAttribute('role', 'dialog')
    $dialog.setAttribute('class', 'jsmodal-dialog')
    $dialog.setAttribute('aria-labelledby', 'jsmodal-title')

    $document.setAttribute('role', 'document')

    $title.setAttribute('id', 'jsmodal-title')

    $close.setAttribute('class', 'jsmodal-close')
    $close.addEventListener('click', _closeModalHandler, false)

    // build DOM
    $document.appendChild($close)
    $document.appendChild($title)
    $document.appendChild($content)

    $dialog.appendChild($document)

    $body.appendChild($overlay)
    $body.appendChild($dialog)
  }


  var focusableElementsSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], '[tabindex]:not([tabindex=\"-1\"])'";

  function _bodyKeyDownHandler(e) {

    if (e.keyCode == 27) { // ESC
      // close
      e.preventDefault();
      _closeModalHandler(e)
    }
    else if (e.keyCode == 9) { // tab or shift+tab
      // keep tab in dialog only
      var $focusedItem = document.activeElement;
      var $focusableItems = [];

      [].forEach.call(
        $dialog.querySelectorAll(focusableElementsSelector),
        function ($element, i) {
          if ($element.offsetParent !== null) { // visible then
            $focusableItems.push($element)
          }
        })

      var index = $focusableItems.indexOf($focusedItem)
      var focusIndex = -1

      if (index == -1) { // still outside if e.g. long click on modal link!
        focusIndex = 0
      }
      else if (!e.shiftKey && index == $focusableItems.length - 1) {
        focusIndex = 0
      }
      else if (e.shiftKey && index == 0) {
        focusIndex = $focusableItems.length - 1
      }

      if (focusIndex > -1) {
        $focusableItems[focusIndex].focus()
        e.preventDefault()
      }
    }
  }


  function _toggle(dialogOpen) {
    var $elements = document.querySelectorAll('body > *');

    [].forEach.call($elements, function ($element, i) {
      $element.setAttribute('aria-hidden', dialogOpen)
    })
    $overlay.setAttribute('aria-hidden', !dialogOpen)
    $dialog.setAttribute('aria-hidden', !dialogOpen)
    $body.classList[dialogOpen ? 'add' : 'remove']('jsmodal-open')

    if (dialogOpen) {
      $body.addEventListener('keydown', _bodyKeyDownHandler, false)
      $close.focus()
    }
    else {
      $body.removeEventListener('keydown', _bodyKeyDownHandler, false)
      $opener.focus()
    }
  }

  function _closeModalHandler(e) {
    _toggle(false)
  }

  function _openModalHandler(e) {
    $opener = e.target

    // get options from data or API
    var modalId = $opener.getAttribute('data-modal-id')
    var options = modalOptions[modalId] || $opener.dataset

    // update modal
    $close.setAttribute('title', options.modalCloseTitle || options.modalCloseText)
    $close.textContent = options.modalCloseText || 'Close'

    $title.textContent = options.modalTitle || ''
    $title[!options.modalTitle ? 'setAttribute' : 'removeAttribute']('hidden', true)

    if (options.modalContentId) {
      var $modalContent = document.getElementById(options.modalContentId)

      $content.innerHTML = $modalContent ? $modalContent.innerHTML : 'NOT FOUND?'
    }
    else if (options.modalText) {
      $content.innerHTML = '<p>' + options.modalText + '</p>'
    }

    _toggle(true)
    e.stopPropagation()
  }

  function jsModal(options) {
    var selector
    var modalId // save programmatic options here

    if (typeof options === 'string') {
      selector = options
      options = false
    }
    else {
      idCount += 1
      modalId = 'modalId_' + idCount
      selector = options.selector
      delete options.selector
    }

    var $modals = document.querySelectorAll(selector);

    [].forEach.call($modals, function ($modal, i) {
      if (options) {
        if (!options.modalContentId && $modal.hash) {
          // use link target if possible
          options.modalContentId = $modal.hash.substring(1)
        }
        modalOptions[modalId] = options
        $modal.setAttribute('data-modal-id', modalId)
      }
      $modal.addEventListener('click', _openModalHandler, false)
    })

    if (!$dialog) {
      // init but hide
      _initDialog()
    }
  }

  // may be added to other globals?
  global.jsModal = jsModal

})(window);
