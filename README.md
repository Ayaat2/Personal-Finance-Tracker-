# 💰 Personal Finance Tracker

A modern and interactive **Personal Finance Tracker** built with **Vanilla JavaScript** to help users manage their monthly income and expenses in one place.

The application allows users to add, edit, delete, and reorder expenses while tracking their remaining budget in real time through an interactive pie chart.

---

# 🚀 Overview

This project was created to practice and improve core JavaScript concepts such as:

* DOM Manipulation
* Event Handling
* Dynamic Rendering
* Local Storage
* Drag & Drop API
* Array Methods
* Real-time UI Updates

The app updates the budget summary instantly whenever the user changes the income or expense values.

---

# 🛠️ Tech Stack

* **HTML5** → Page structure
* **CSS3**

  * Flexbox
  * CSS Grid
  * Responsive Design
  * Animations
  * CSS Variables
* **Vanilla JavaScript**

  * DOM Manipulation
  * Event Listeners
  * Dynamic Elements
  * Local Storage
  * Drag & Drop
* **Highcharts** → Interactive Pie Chart

---

# ✨ Features

* ✅ Add new expenses dynamically
* ✅ Delete expenses
* ✅ Edit expense names directly using `contenteditable`
* ✅ Real-time budget calculations
* ✅ Interactive pie chart visualization
* ✅ Drag & Drop expense reordering
* ✅ Data persistence using Local Storage
* ✅ Responsive design for mobile and desktop
* ✅ Smooth animations and transitions

---

# 📊 Budget Summary Logic

The application automatically calculates:

* Total Expenses
* Remaining Budget

Using real-time updates whenever:

* Income changes
* Expense values change
* Expenses are added or deleted

---

# 💾 Local Storage

The app saves:

* Monthly income
* Expense list
* Expense values

This allows the data to remain available even after refreshing or reopening the browser.

---

# 🖼️ Project Preview

## 📸 Screenshot

Add your screenshot here:

![Project Screenshot](./image/Screenshot%202026-05-11%20125126.png)

---

# 🌐 Live Demo

```md
https://your-project.vercel.app
```

---

# 📚 JavaScript Concepts Practiced

* DOM Selection
* createElement()
* appendChild()
* Event Delegation
* querySelector()
* Template Literals
* Array Methods (`forEach`, `map`)
* Local Storage
* JSON Methods
* Drag & Drop API
* Dynamic Rendering

---

# ⚠️ Problems I Faced & Solutions

## 1. Budget Summary Not Updating

### Problem

The budget summary only updated when clicking the "Add New Expense" button.

### Solution

I solved it by adding `input` event listeners to both the income input and dynamically created expense inputs so the summary updates automatically whenever the user types.

---

## 2. Input Overflowing Outside the Container

### Problem

The input field was extending outside the container on smaller screens.

### Solution

I fixed it by setting in Media Queries:

```css
.expense_list input[type="number"] {
    width: 70%;
    max-width: 100%;
}
```
---

## 3. Drag & Drop for Dynamic Elements

### Problem

The drag-and-drop functionality did not work correctly for newly created expense items.

### Solution

I added drag event listeners (`dragstart`, `dragover`, `drop`) inside the function responsible for dynamically creating expense elements.

---

# 👩‍💻 Author

Created with [Ayaat Atyaa](https://www.linkedin.com/in/ayaat-atyaa-9697b6230/) while practicing modern JavaScript and frontend development.
