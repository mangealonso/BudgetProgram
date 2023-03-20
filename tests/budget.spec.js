const { test, expect } = require('@playwright/test');


test('add one income item and compare title', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');


    //Find and fill content
    await page.locator('#incomeText').fill('Rent');
    await page.locator('#incomeCategory').selectOption('Pay');
    await page.locator('#incomeAmount').fill("100");
    await page.locator('#incomeDate').fill('2023-12-10');

    //Click the Save income-button
    await page.getByRole('button', {name: /Save income/i}).click();

    //Show item containing 'Rent'
    let IncomeText = await page.getByRole('listitem').filter({hasText:'Rent'});
    await expect(IncomeText).toContainText('Rent');

});

test('add one income item and compare date', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');


    //Find and fill content
    await page.locator('#incomeText').fill('Rent');
    await page.locator('#incomeCategory').selectOption('Pay');
    await page.locator('#incomeAmount').fill("100");
    await page.locator('#incomeDate').fill('2023-12-10');

    //Click the Save income-button
    await page.getByRole('button', {name: /Save income/i}).click();

    //Show item containing 'Rent'
    let IncomeText = await page.getByRole('listitem').filter({hasText:'2023-12-10'});
    await expect(IncomeText).toContainText('2023-12-10');

});

test('load data', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');

    //Click the Load data
    await page.getByRole('button', {name: /Load data/i}).click();

    //Show 
    let allExpensesData = await page.locator('#expenseSection li').count();
    await expect(allExpensesData).toEqual(25);

});



// test('add one todo item and show it on the page', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5500/');

//     // Adding a todo item
//     await page.locator('#new_todo').fill('Buy milk');

//     // Submitting the todo item by pressing Enter
//     await page.keyboard.press('Enter');

//     // Showing the text label of the list item that has been created
//     let toDoText = await page.locator('label').textContent();
//     await expect(toDoText).toEqual('Buy milk');
// });

// test('add one todo item and show items left', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5500/');

//     // Adding and submitting the todo item
//     await page.locator('#new_todo').fill('Buy milk');
//     await page.keyboard.press('Enter');

//     // Showing that there is one todo item
//     let toDoTotalText = await page.locator('#toDoTotal').textContent();
//     await expect(toDoTotalText).toEqual('1 item left');

//     // Clicking the checkbox
//     await page.locator('#taskList li input[type=checkbox]').click();
//     //await checkbox.click();

//     // Showing that there are no todo items
//     let toDoTotalText2 = await page.locator('#toDoTotal').textContent();
//     await expect(toDoTotalText2).toEqual('0 items left');
// });

// test('add three todo items and show items left', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5500/');

//     // Adding and submitting the first todo item
//     await page.locator('#new_todo').fill('Buy milk');
//     await page.keyboard.press('Enter');

//     // Adding and submitting the second todo item
//     await page.locator('#new_todo').fill('Make dinner');
//     await page.keyboard.press('Enter');

//     // Adding and submitting the third todo item
//     await page.locator('#new_todo').fill('Take a walk');
//     await page.keyboard.press('Enter');

//     // Clicking the checkbox for one of the todo items
//     let listItem = page.getByRole('listitem').filter({hasText:'Buy milk'}); 
//     await listItem.getByRole('checkbox').click();

//     // Showing that there are two todo items left
//     let toDoTotalText = await page.locator('#toDoTotal').textContent();
//     await expect(toDoTotalText).toEqual('2 items left');
// });