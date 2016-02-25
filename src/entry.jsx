import 'style'
import React from 'react'
import ReactDom from 'reactDom'
import MineSweeper from 'MineSweeper'

let el = document.getElementById('minesweeper');

ReactDom.render(<MineSweeper difficultyLevel='beginner' />, el);