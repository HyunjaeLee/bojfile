// ==UserScript==
// @name         bojfile
// @namespace    https://github.com/HyunjaeLee
// @version      0.1
// @description  BOJ file upload
// @author       Hyunjae Lee
// @match        https://www.acmicpc.net/submit/*
// @icon         https://www.google.com/s2/favicons?domain=acmicpc.net
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    const form = document.getElementById('submit_form');
    const submit = form.submit;
    const code = document.querySelector('#submit_form > div:nth-child(5)');
    const input = document.createElement('input');
    const src = document.getElementById('source');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'text/plain');
    form.insertBefore(input, code);

    let text = '';

    input.addEventListener('change', () => {
        form.submit = submit;
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            text = reader.result;
        });
        reader.readAsText(input.files[0]);
    });

    window.addEventListener('load', () => {
        form.addEventListener('submit', () => {
            src.value = text;
        });
    });
})();
