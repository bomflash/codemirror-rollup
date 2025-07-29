import { EditorState, StateField } from "@codemirror/state";
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula"; // Changed from oneDark to dracula
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches, openSearchPanel } from "@codemirror/search";
import { bracketMatching, indentOnInput, syntaxHighlighting, defaultHighlightStyle, foldGutter, foldKeymap } from "@codemirror/language"; 
import { lintKeymap, linter, lintGutter, setDiagnostics } from "@codemirror/lint"; 

import { languages } from "@codemirror/language-data";
import { Table } from "@lezer/markdown"; 
import richMarkdoc from "../rich-markdoc/dist/index.js";
import markConfig from "../rich-markdoc/dist/markConfig.js";

// Basic setup extensions
const basicSetup = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  lintGutter(), // Added lintGutter to the basic setup
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
    indentWithTab, // Use Tab for indentation
  ])
];  

//export properties for public use
window.StateField = StateField;
window.EditorView = EditorView;
window.EditorState = EditorState;
window.autocompletion = autocompletion;
window.basicSetup = basicSetup;
window.cpp = cpp;
window.dracula = dracula; // Changed from oneDark to dracula
window.lintGutter = lintGutter;
window.setDiagnostics = setDiagnostics;
window.linter = linter;
window.openSearchPanel = openSearchPanel;
window.languages = languages;
window.Table = Table; // Added for potential use in the editor
window.richMarkdoc = richMarkdoc; // Added for potential use in the editor
window.markConfig = markConfig; // Export the markConfig for use in the editor

// Add commands and view components to window
window.keymap = keymap;
window.drawSelection = drawSelection;
window.rectangularSelection = rectangularSelection;
window.highlightActiveLine = highlightActiveLine;
window.defaultKeymap = defaultKeymap;
window.cmHistory = history; // Renamed from "history" to "cmHistory" to avoid conflict with window.history
window.historyKeymap = historyKeymap;
window.indentWithTab = indentWithTab;

// Create a preconfigured rich-markdoc instance with the markConfig
window.richMarkdocWithConfig = () => richMarkdoc({
  lezer: {},
  markdoc: markConfig
});

window.syntaxHighlighting = syntaxHighlighting;
window.defaultHighlightStyle = defaultHighlightStyle;

//export { setupCodeMirror }; // Also export for potential module usage
