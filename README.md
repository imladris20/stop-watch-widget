# Stop-Watch-Widget

## Final Website

### https://polienstopwatch.web.app

## Introduction

This project requires you to develop a stopwatch app. It should allow users to time themselves and record lap times.

## Requirements

Users should be able to click buttons to start timing, reset the stopwatch, and record lap times.

UI Rules:

- Upon initial display, the timer is set to zero, and there are two buttons: **Start** and **Lap**. The Lap button is initially disabled.
- Pressing the Start button initiates the timing. Time less than an hour should be displayed as _mm:ss_ (eg: 16:28.25), while time exceeding an hour should be displayed as _hh:mm:ss_ (eg: 03:03:01.66). Seconds should be precise to the **second decimal place**.
- After starting the timer, the two buttons change to **Lap** and **Stop**. When the Lap button is pressed, a new lap timer starts from 0, independent of the main stopwatch time. Both the main stopwatch and the new lap timer continue running uninterrupted. The time record of the previous lap is then pushed into the list for display.
- Clicking the Stop button pauses the timer. The Stop button reverts to Start, and if clicked, the stopwatch continues. In the stopped state, the Lap button becomes a **Reset button**. Clicking it resets the stopwatch and the lap record list.
- The lap list is ordered from **newest to oldest (top to bottom)**.

## Reference

Reference Image:

<img src="public/stop-watch-ui.jpeg" alt="stop-watch-example" width="200"/>

Reference Video:

[stop-watch-video](https://github.com/Glossika-PL/stop-watch-widget/assets/109053974/40f170e4-9b2c-49ad-8596-b3040d3e05b0)
