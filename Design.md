# KarghaKendra: Handloom & Heritage Design System

This document outlines the core design principles, typography, color palettes, and interactive concepts for the **Kargha** web application. The design aesthetic is rooted in traditional Indian handloom, artisan craftsmanship, and textile heritage.

---

## 🖋 Typography

To create a warm, approachable, yet deeply traditional feel, we use a two-font system pairing a relaxed English font with a beautifully curved Devanagari script.

### 1. Primary English Font: **Quicksand** (or **Nunito**)
* **Vibe:** Normal, not-too-formal, friendly, and soft.
* **Why it works:** `Quicksand` features rounded terminals that softly mimic the look of spun yarn. It breaks away from the stiff formality of traditional serifs while remaining highly readable on digital screens.
* **CSS Import:** `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');`

### 2. Devanagari Accent Font: **Amita**
* **Vibe:** Curvy, cursive, traditional, and artistic.
* **Why it works:** `Amita` is a Latin and Devanagari typeface that has a beautifully flowing, almost handwritten quality. It brings a sense of authentic Indian heritage and fluid motion, perfect for the "Kargha" branding or traditional quotes.
* **CSS Import:** `@import url('https://fonts.googleapis.com/css2?family=Amita:wght@400;700&display=swap');`

---

## 🎨 Color Palettes

The application features a seamless toggle between two distinct themes, both heavily inspired by natural artisan materials.

### 🌿 Light Theme (Beige)
**Overall feel:** Cotton paper • Handmade • Heritage • Warm sunlight

| Purpose | Hex Code | Visual Reference |
| :--- | :--- | :--- |
| **Background** | `#F5EFE3` | Unbleached cotton / Linen |
| **Secondary Background** | `#ECE1CF` | Old parchment paper |
| **Card / Surface** | `#FFF8EE` | Warm sunlight |
| **Border / Stitching** | `#D6C3A5` | Natural jute thread |
| **Primary Text** | `#3B2418` | Deep mahogany wood |
| **Secondary Text** | `#6B5846` | Dried clay / Mud |
| **Primary Button** | `#8A4B2A` | Terracotta / Brick |
| **Button Hover** | `#6E381F` | Dark roasted earth |
| **Accent** | `#B8612C` | Saffron / Marigold |
| **Highlight** | `#C99A52` | Woven gold thread (Zari) |
| **Error / Alert** | `#B22222` | Traditional Madder Red |

### 🌙 Dark Theme (Brown)
**Overall feel:** Burnt wood • Handloom • Traditional workshop • Antique furniture

| Purpose | Hex Code | Visual Reference |
| :--- | :--- | :--- |
| **Background** | `#1F1712` | Dark espresso / Charred wood |
| **Secondary Background** | `#2B2019` | Aged walnut furniture |
| **Card / Surface** | `#36261D` | Polished rosewood |
| **Border / Stitching** | `#5A4334` | Heavy leather |
| **Primary Text** | `#F3E7D3` | Ivory / Light cotton |
| **Secondary Text** | `#D5C2AA` | Faded parchment |
| **Primary Button** | `#A76436` | Polished copper |
| **Button Hover** | `#C27B47` | Bright clay |
| **Accent** | `#D38A45` | Warm amber / Turmeric |
| **Highlight** | `#C8A45C` | Antique gold |
| **Error / Alert** | `#C43A3A` | Deep Kumkum Red |

---

## 🧵 UI & Textural Elements

To bring the handloom aesthetic to life, the UI relies on structural CSS rather than heavy images:

* **The Canvas (Fabric Background):** The background utilizes a CSS-generated repeating linear gradient to simulate the "warp and weft" (threads crossing over each other) of a textile weave. An overlay of a very subtle SVG noise texture can be added to give it the tactile, raw feel of Khadi or jute.
* **The Stitching:** Form cards feature subtle `dashed` borders on the inner left and right edges, mimicking authentic fabric stitching. 
* **Layered Patches:** Instead of standard drop-shadows, containers can use rougher, offset borders to look like fabric patches sewn onto the main canvas.

---

## ✨ Interactive & Thematic Ideas

To elevate the user experience and fully embrace the Kargha identity, consider implementing these thematic elements:

### 1. The Charkha Loader
* **Concept:** Instead of a generic spinner, use an animated Charkha wheel for loading states (API calls, form submissions).
* **Execution:** As the Charkha spins, a literal "thread" (SVG line) can stretch outwards, acting as a progress bar. Once the loading is complete, the thread snaps or weaves into a checkmark icon.

### 2. Block-Print Buttons
* **Concept:** Make primary buttons feel like traditional wooden printing blocks used in Indian textiles.
* **Execution:** Give the buttons a slight 3D inset shadow on click (`box-shadow: inset 0 3px 5px rgba(0,0,0,0.3)`). The hover state could briefly reveal a subtle motif (like a paisley or lotus watermark) inside the button background.

### 3. The Loom Shuttle Toggle
* **Concept:** Replace standard UI toggle switches (like the Light/Dark mode switch) with a wooden loom shuttle.
* **Execution:** The track of the toggle looks like stretched threads, and the thumb is shaped like a pointed wooden shuttle that "glides" from left to right when clicked.

### 4. Unfolding Fabric Transitions
* **Concept:** Page transitions that move away from standard fades.
* **Execution:** Use a CSS transform with `transform-origin: top` and a slight rotation/perspective effect so that navigating to a new page feels like a fresh bolt of fabric rolling down from the top of the screen.

### 5. Thread Spool Scrollbars
* **Concept:** Customizing the browser scrollbar to match the theme.
* **Execution:** The scrollbar thumb can be styled to look like a small wooden bobbin wrapped in thread (using the accent color), sliding down a vertical track (the loom).
