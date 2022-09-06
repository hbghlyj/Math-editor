The editor consists of 3 parts: MathML area, input area, a list of MathML element's description.
* MathML area, to display typesetted math formula. When a MathML element is clicked, the corresponding LaTeX source code is selected, and element's description checkbox is checked.
* input area, to edit formula with LaTeX. After typesetted math, when cursor is moved(by a mouse click or pressing arrow key), the corresponding MathML element begins to blink and the element's description checkbox is checked.
* a list of MathML element's description. When the checkbox (or its label) is clicked, the MathML element begins to blink and corresponding LaTeX source code is selected.

The input area consists of 2 textareas and 6 buttons.
* the main textarea, to edit LaTeX of the whole formula.
* the auxiliary textarea, to temporarily edit a small component of the main textarea, and then merge the change.
* the `M` button, to typeset math with MathJax. After editing LaTeX code, click `M`, if the syntax is correct, then you can see typesetted formula in the MathML area, otherwise error is shown. It does't update automatically, so you need to click `M` every time you finish editing.
* the `X` button, to cut the LaTeX code. The content of the main textarea will be in the clipboard.
* the `D` button, to clear both the MathML area and the list of MathML element description. Once the textarea is edited after typesetting, the MathML element description list will be deleted and the all the event listeners are deactivated while editing.
* the `↓` button, to write the selection of main textarea into the auxiliary textarea (if the auxiliary textarea has content, it will be overwritten).
* the `{}` button, to select the text between the (innermost) curly brackets that contains the current selection (a cursor is a selection of length 0).
* the `↑` button, to write the content of auxiliary textarea to the selection of main textarea (if the selection of the main textarea is unchanged, this operation merges the change).

# Requirements
The editor requires a browser that supports [MathML](https://developer.mozilla.org/en-US/docs/Web/MathML) and [HTMLTextAreaElement: selectionchange event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/selectionchange_event)

The following demonstrations are performed on Firefox.

# Demonstrations
1. [Click MathML element to select LaTeX code and check the MathML element description checkbox](#click-mathml-element-to-select-latex-code-and-the-element-description-checkbox)
2. [Move cursor in the LaTeX code and MathML element will blink and MathML element description checkbox changes](#move-cursor-in-latex-to-locate-mathml-element)
3. [Click MathML element description to select LaTeX code and MathML element will blink](#click-mathml-element-description-to-locate-latex-and-mathml-element)
4. [Click {} button to select the text between curly brackets and edit on the auxillary textarea and merge changes](#click--button-to-select-the-text-between-curly-brackets-and-edit-on-the-auxillary-textarea-and-merge-changes)

## Click MathML element to select LaTeX code and the element description checkbox
![output](https://user-images.githubusercontent.com/53823634/188660743-ee22c4d7-1574-4df7-acea-f449024b6c73.gif)

## Move cursor in LaTeX to locate MathML element
![output](https://user-images.githubusercontent.com/53823634/188665296-97816c66-957b-47bc-829d-151e85660f03.gif)

## Click MathML element description to locate LaTeX and MathML element
![output](https://user-images.githubusercontent.com/53823634/188640749-a6ce9b93-18d9-49fb-b9e9-87e6a64de19f.gif)

## Click {} button to select the text between curly brackets and edit on the auxillary textarea and merge changes
![output](https://user-images.githubusercontent.com/53823634/188675990-48b3cbcc-f212-49e1-8ebf-e4a2feec0650.gif)

# About project
I don't know how to compile Typescript, so I end up with reading [the MathJax source](https://github.com/mathjax/MathJax-src) and finding the corresponding Javascript, and modifying each function which handles different macros.

The work is mainly to add `sourcePos`(the end position of an element in LaTeX code) and `stringlength`(the length of an element in LaTeX code) attributes to MathJax inner mml node and push those into an array(the global variable `array`), then `textarea.js` attaches `click` events to MathML elements and checkboxes and `inputchange` event to textarea(the `focus` event is to cover the edge case that the textarea isn't in focus when the last cursor position is clicked, the `inputchange` event doesn't fire). I don't add `sourcePos` attribute to `<mrow>` elements, so they don't get into the array.

The locating of nodes works for common macros. Currently, for user-defined macro (e.g. `\def`,`\let`,`\newcommand`) and `\stackrel` (e.g. `\stackrel{\rm heat}{\longrightarrow}`) and math inside `\text` (e.g.`\text {answer is $x$}`) and text inside math (e.g. `\mathrm{\ d}`), the locating is wrong, but doesn't affect locating of other nodes. For fractions generated by `\frac` such as `\frac{a}{b}`, the `<mfrac>` will be in the array (so you can click the fraction line to locate LaTeX), but fractions generated by `\over` such as `{a\over b}`, the `<mfrac>` won't be in the array, because I don't find a way to locate the open and close positions.

The project started on Aug 31. The project is carried out by one person, who is frustrated by mismatched brackets when editing LaTeX, and experienced inefficiency of having to read the whole formula only to modify a small part of it. I posted those modifications of MathJax (hopefully I didn't miss anything) on [Math Entertainment forum](http://kuing.infinityfreeapp.com/forum.php?mod=viewthread&tid=9466#pid47806)
