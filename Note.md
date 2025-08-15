## JS Process Step-by-Step (Call App)

1. **Element Selection**
   - `add-note` button, `formContainer`, `closeForm`, `stack`, `upBtn`, `downBtn`, aur form ke sare input elements ko select kiya jata hai.

2. **Add Note Button Functionality**
   - Jab `add-note` button pe click hota hai, form container display ho jata hai (`display: initial`).

3. **Close Form Functionality**
   - Jab `closeForm` button pe click hota hai, form container hide ho jata hai (`display: none`).

4. **Form Submission & Validation**
   - Form submit hone par default behaviour prevent kiya jata hai (`evt.preventDefault()`).
   - Sare input values ko trim karke validate kiya jata hai:
     - Agar koi field empty hai ya category select nahi hai, to alert show hota hai aur process ruk jata hai.
   - Agar sab kuch sahi hai, to input values ek object me store kiye jaate hain.

5. **Save to LocalStorage**
   - `saveToLocalStorage()` function se data localStorage me save hota hai.
   - Pehle check hota hai ki `tasks` naam ka item localStorage me hai ya nahi.
   - Agar nahi hai to naya array bana ke data push karte hain, warna purane array me naya data push karte hain.

6. **Form Reset & Hide**
   - Form submit hone ke baad form reset hota hai aur form container hide ho jata hai.

7. **Show Cards Function**
   - `showCards()` function localStorage se sare tasks read karta hai.
   - Har task ke liye ek card create hota hai jisme image, name, home town, purpose, aur buttons (Call, Message) hote hain.
   - Sare cards `.stack` container me append hote hain.

8. **Initial Card Rendering**
   - Page load hote hi `showCards()` call hota hai, taki pehle se saved cards dikh sakein.

9. **Up & Down Button Functionality**
   - `upBtn` pe click karne par last card ko stack ke top pe le aate hain.
   - `downBtn` pe click karne par first card ko stack ke end me bhej dete hain.
   - Har baar updateStack() call hota hai, jo top 3 cards ki z-index, transform, aur opacity set karta hai (visual stack effect ke liye).

---

**Summary:**  
Yeh pura process ensure karta hai ki user form se data add kar sake, data localStorage me save ho, cards dynamically show ho, aur stack ke cards ko up/down move kiya ja sake.