# Test Plan for LoginPage POM (loginPOM.js)

## Overview
This test plan covers the `LoginPage` class, which is a Page Object Model implementation for testing the login functionality at `https://the-internet.herokuapp.com/login`.

---

## Test Scope

### In Scope
- LoginPage class initialization
- Page navigation to login URL
- Username field interaction
- Password field interaction
- Login button interaction
- Complete login workflow

### Out of Scope
- Backend authentication logic
- Server response validation (handled separately)
- Network timeout edge cases beyond the specified 50-second timeout

---

## Test Cases

### 1. LoginPage Class Initialization
**Test ID:** TC_LP_001  
**Description:** Verify that LoginPage class properly initializes all locators  
**Steps:**
1. Create a new LoginPage instance with a valid Playwright page object
2. Verify that all locators are created (username, password, loginBtn)
3. Verify that the page object is stored correctly

**Expected Result:** All locators are initialized without errors

**Test Data:** Valid Playwright page object

---

### 2. Navigate to Login Page - Success Path
**Test ID:** TC_LP_002  
**Description:** Verify successful navigation to the login page URL  
**Steps:**
1. Call `navigateToLoginPage()` method
2. Verify page URL matches `https://the-internet.herokuapp.com/login`
3. Verify page loads completely (networkidle)

**Expected Result:** 
- Page navigates successfully to the login URL
- Network becomes idle within the 50-second timeout
- Page content is rendered

---

### 3. Navigate to Login Page - Timeout Scenario
**Test ID:** TC_LP_003  
**Description:** Verify timeout handling when page takes longer than 50 seconds  
**Steps:**
1. Mock a slow server response or network delay
2. Call `navigateToLoginPage()` method
3. Wait for timeout to occur

**Expected Result:** Timeout error is thrown after 50 seconds

---

### 4. Username Field - Fill Valid Input
**Test ID:** TC_LP_004  
**Description:** Verify username field accepts valid input  
**Steps:**
1. Navigate to login page
2. Call `loginToApplication('testuser@example.com', '')`
3. Verify username field value equals the entered text

**Expected Result:** Username field contains the entered value

**Test Data:** `'testuser@example.com'` or similar valid username

---

### 5. Username Field - Fill with Special Characters
**Test ID:** TC_LP_005  
**Description:** Verify username field handles special characters  
**Steps:**
1. Navigate to login page
2. Call `loginToApplication('test!@#$%', '')`
3. Verify field value is as entered

**Expected Result:** Special characters are entered correctly

**Test Data:** `'test!@#$%'`, `'user+test@domain.com'`

---

### 6. Username Field - Empty Input
**Test ID:** TC_LP_006  
**Description:** Verify username field accepts empty input  
**Steps:**
1. Navigate to login page
2. Call `loginToApplication('', 'password')`
3. Verify field is empty

**Expected Result:** Username field remains empty

---

### 7. Password Field - Fill Valid Input
**Test ID:** TC_LP_007  
**Description:** Verify password field accepts valid input  
**Steps:**
1. Navigate to login page
2. Call `loginToApplication('', 'testpassword123')`
3. Verify password field value equals the entered text

**Expected Result:** Password field contains the entered value (as dots/asterisks)

**Test Data:** `'testpassword123'`

---

### 8. Password Field - Fill with Special Characters
**Test ID:** TC_LP_008  
**Description:** Verify password field handles special characters  
**Steps:**
1. Navigate to login page
2. Call `loginToApplication('', 'P@ssw0rd!#$')`
3. Verify field value is as entered

**Expected Result:** Special characters are entered correctly in password field

**Test Data:** `'P@ssw0rd!#$'`, `'p!@#$%^&*()'`

---

### 9. Login Button - Click Detection
**Test ID:** TC_LP_009  
**Description:** Verify login button can be clicked  
**Steps:**
1. Navigate to login page
2. Enter valid credentials
3. Call `loginToApplication('validuser', 'validpass')`
4. Verify click event is triggered

**Expected Result:** Login button is clickable and click event is triggered

---

### 10. Complete Login Workflow - Valid Credentials
**Test ID:** TC_LP_010  
**Description:** Verify complete login flow with valid credentials  
**Steps:**
1. Call `navigateToLoginPage()`
2. Call `loginToApplication('tomsmith', 'SuperSecretPassword!')`
3. Verify page navigation occurs (check for success page)

**Expected Result:** User is logged in successfully and redirected

**Test Data:** 
- Username: `'tomsmith'`
- Password: `'SuperSecretPassword!'`

---

### 11. Complete Login Workflow - Invalid Credentials
**Test ID:** TC_LP_011  
**Description:** Verify login behavior with invalid credentials  
**Steps:**
1. Call `navigateToLoginPage()`
2. Call `loginToApplication('invaliduser', 'wrongpass')`
3. Verify error message appears

**Expected Result:** Login fails and error message is displayed

**Test Data:**
- Username: `'invaliduser'`
- Password: `'wrongpass'`

---

### 12. Locator Accuracy - Username Field
**Test ID:** TC_LP_012  
**Description:** Verify username locator correctly identifies the field  
**Steps:**
1. Navigate to login page
2. Verify the '#username' selector returns the correct element
3. Verify element is visible and enabled

**Expected Result:** Correct username input field is located

---

### 13. Locator Accuracy - Password Field
**Test ID:** TC_LP_013  
**Description:** Verify password locator correctly identifies the field  
**Steps:**
1. Navigate to login page
2. Verify the '#password' selector returns the correct element
3. Verify element is visible and enabled

**Expected Result:** Correct password input field is located

---

### 14. Locator Accuracy - Login Button
**Test ID:** TC_LP_014  
**Description:** Verify login button locator is accurate  
**Steps:**
1. Navigate to login page
2. Verify the 'i' element filter with hasText: 'Login' returns correct button
3. Verify `.last()` returns the intended login button (not other elements)

**Expected Result:** Login button is correctly identified

---

### 15. Page Navigation - Network Idle Wait
**Test ID:** TC_LP_015  
**Description:** Verify networkidle wait condition works correctly  
**Steps:**
1. Call `navigateToLoginPage()`
2. Monitor network requests until completion
3. Verify no pending requests remain

**Expected Result:** Navigation waits until all network requests complete (networkidle)

---

## Test Execution Strategy

### Unit Tests
- Test locator initialization (TC_LP_001)
- Test individual field interactions (TC_LP_004 to TC_LP_008)

### Integration Tests
- Test navigation functionality (TC_LP_002, TC_LP_003)
- Test complete login workflows (TC_LP_010, TC_LP_011)
- Test locator accuracy (TC_LP_012 to TC_LP_015)

### E2E Tests
- Test against actual application (https://the-internet.herokuapp.com/login)
- Verify complete user journey

---

## Test Data

| Test Case | Username | Password | Expected Result |
|-----------|----------|----------|-----------------|
| TC_LP_004 | testuser@example.com | (empty) | Field filled |
| TC_LP_007 | (empty) | testpassword123 | Field filled |
| TC_LP_010 | tomsmith | SuperSecretPassword! | Login success |
| TC_LP_011 | invaliduser | wrongpass | Login failed |

---

## Risk Assessment

### High Risk Areas
1. **Login Button Locator:** Uses complex filter chain with `hasText` and `.last()` - prone to breaking if UI changes
2. **Navigation Timeout:** 50-second timeout might be insufficient for slow networks

### Medium Risk Areas
1. **Network Idle Condition:** May cause flakiness on unreliable networks
2. **Special Character Handling:** Ensure proper encoding in input fields

---

## Exit Criteria

- All 15 test cases pass successfully
- No critical defects remain
- Locators are stable and accurate
- Navigation completes within timeout
- Login functionality works with valid and invalid credentials

---

## Notes
- Tests should be executed against the actual Heroku application URL
- Consider adding visual regression testing for UI consistency
- Monitor timeout values based on actual network conditions
- Consider refactoring login button locator to use a more stable selector (e.g., id or data-testid)
