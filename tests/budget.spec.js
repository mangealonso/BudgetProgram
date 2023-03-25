const { test, expect } = require('@playwright/test');


test('add one income item and compare title', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');


    //Find and fill content
    await page.locator('#incomeTitle').fill('Rent');
    await page.locator('#incomeCategory').selectOption('Pay');
    await page.locator('#incomeAmount').fill("100");
    await page.locator('#incomeDate').fill('2023-12-10');

    //Click the Save income-button
    await page.getByRole('button', { name: /Save income/i }).click();

    //Show item containing 'Rent'
    let IncomeText = await page.getByRole('listitem').filter({ hasText: 'Rent' });
    await expect(IncomeText).toContainText('Rent');

});

test('add one income item and compare date', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');


    //Find and fill content
    await page.locator('#incomeTitle').fill('Rent');
    await page.locator('#incomeCategory').selectOption('Pay');
    await page.locator('#incomeAmount').fill("100");
    await page.locator('#incomeDate').fill('2023-12-10');

    //Click the Save income-button
    await page.getByRole('button', { name: /Save income/i }).click();

    //Show item containing 'Rent'
    let IncomeText = await page.getByRole('listitem').filter({ hasText: '2023-12-10' });
    await expect(IncomeText).toContainText('2023-12-10');

});

test('load data remove data', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');

    //Click the Load data
    await page.getByRole('button', { name: /Load data/i }).click();

    //Expect all Expenses from json has been loaded
    let LoadedExpensesDataCount = await page.locator('#allExpensesPostsDiv li').count();
    await expect(LoadedExpensesDataCount).toEqual(25);

    //Delete all expenses
    await page.getByRole('button', { name: /Delete all expenses posts/i }).click();

    //Expect all Expenses has been removed
    let ExpensesRemoved = await page.locator('#expenseSection li').count();
    await expect(ExpensesRemoved).toEqual(0);
});


test('check balance updates', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');

    //Find and fill content in Income
    await page.locator('#incomeTitle').fill('Present');
    await page.locator('#incomeCategory').selectOption('Gift');
    await page.locator('#incomeAmount').fill("1000");
    await page.locator('#incomeDate').fill('2023-01-22');

    //Click the Save income-button
    await page.getByRole('button', { name: /Save income/i }).click();

    //Find and fill content in Expense
    await page.locator('#expenseTitle').fill('Shirt');
    await page.locator('#expenseCategory').selectOption('Clothes');
    await page.locator('#expenseAmount').fill("200");
    await page.locator('#expenseDate').fill('2023-02-01');

    //Click the Save expense-button
    await page.getByRole('button', { name: /Save expense/i }).click();

    //Expect total income, expenses and balance to be correct
    let totalIncome = await page.locator('#totalIncomeAmount')
    let totalIncomeText = await totalIncome.textContent();
    await expect(totalIncomeText).toEqual("1000");

    let totalExpenses = await page.locator('#totalExpensesAmount')
    let totalExpensesText = await totalExpenses.textContent();
    await expect(totalExpensesText).toEqual("200");


    let totalBalance = await page.locator('#totalBalance')
    let totalBalanceText = await totalBalance.textContent();
    await expect(totalBalanceText).toEqual("800");

    //Delete the expense-post
    let expenseClassCheckbox = await page.locator('.expenseCheckbox').check();
    let deleteExpense = await page.locator('#deleteThisExpense').click();
  
    //Expext Balance to be updated
    let totalBalance2 = await page.locator('#totalBalance')
    let totalBalanceText2 = await totalBalance2.textContent();
    await expect(totalBalanceText2).toEqual("1000");

});

test('load data and assert income for january is correct', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');

    //Click the Load data
    await page.getByRole('button', { name: /Load data/i }).click();

    //Select 2023 in the dropdown
    await page.selectOption('#yearAndMonth select', { label: '2023' });

    //Locate jan and check balance
    let jan = await page.locator('#yearAndMonth li').filter({ hasText: 'January:' })
    let janContent = await jan.textContent();

    await expect(janContent).toEqual("January:Income: 25650, Expenses: 18450, Balance: 7200");

});

test('year automatically added and removed in dropdown', async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/');

    //Find Dropdown and assert the count is 1
    let dropDownCount = await page.locator('#yearAndMonth select option').count();
    await expect(dropDownCount).toEqual(1);

    //Click the Load data
    await page.getByRole('button', { name: /Load data/i }).click();

    //Assert Dropdown count is now 3
    dropDownCount = await page.locator('#yearAndMonth select option').count();
    await expect(dropDownCount).toEqual(3);

     //Find, fill and save content in Income
     await page.locator('#incomeTitle').fill('Present from Mom');
     await page.locator('#incomeCategory').selectOption('Gift');
     await page.locator('#incomeAmount').fill("500");
     await page.locator('#incomeDate').fill('2021-01-22');
     await page.getByRole('button', { name: /Save income/i }).click();

     //Assert Dropdown count is 4
     dropDownCount = await page.locator('#yearAndMonth select option').count();
     await expect(dropDownCount).toEqual(4);

     //Remove the only post that includes 2021
     let thisItem = await page.locator('li label:has-text(" Present From Mom, Gift, 500, 2021-01-22") input[type="checkbox"]').click();
     await page.locator('li:has-text(" Present From Mom, Gift, 500, 2021-01-22") button').click();

          //Assert Dropdown count is 3 again
          dropDownCount = await page.locator('#yearAndMonth select option').count();
          await expect(dropDownCount).toEqual(3);
});


// const { test, expect } = require('@playwright/test');


// test('add one income item and compare title', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5501/');


//     //Find and fill content
//     await page.locator('#incomeTitle').fill('Rent');
//     await page.locator('#incomeCategory').selectOption('Pay');
//     await page.locator('#incomeAmount').fill("100");
//     await page.locator('#incomeDate').fill('2023-12-10');

//     //Click the Save income-button
//     await page.getByRole('button', { name: /Save income/i }).click();

//     //Show item containing 'Rent'
//     let IncomeText = await page.getByRole('listitem').filter({ hasText: 'Rent' });
//     await expect(IncomeText).toContainText('Rent');

// });

// test('add one income item and compare date', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5501/');


//     //Find and fill content
//     await page.locator('#incomeTitle').fill('Rent');
//     await page.locator('#incomeCategory').selectOption('Pay');
//     await page.locator('#incomeAmount').fill("100");
//     await page.locator('#incomeDate').fill('2023-12-10');

//     //Click the Save income-button
//     await page.getByRole('button', { name: /Save income/i }).click();

//     //Show item containing 'Rent'
//     let IncomeText = await page.getByRole('listitem').filter({ hasText: '2023-12-10' });
//     await expect(IncomeText).toContainText('2023-12-10');

// });

// test('load data remove data', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5501/');

//     //Click the Load data
//     await page.getByRole('button', { name: /Load data/i }).click();

//     //Expect all Expenses from json has been loaded
//     let LoadedExpensesDataCount = await page.locator('#expenseSection li').count();
//     await expect(LoadedExpensesDataCount).toEqual(25);

//     //Delete all expenses
//     await page.getByRole('button', { name: /Delete all expenses posts/i }).click();

//     //Expect all Expenses has been removed
//     let ExpensesRemoved = await page.locator('#expenseSection li').count();
//     await expect(ExpensesRemoved).toEqual(0);
// });


// test('check balance updates', async ({ page }) => {
//     await page.goto('http://127.0.0.1:5501/');

//     //Find and fill content in Income
//     await page.locator('#incomeTitle').fill('Present');
//     await page.locator('#incomeCategory').selectOption('Gift');
//     await page.locator('#incomeAmount').fill("1000");
//     await page.locator('#incomeDate').fill('2023-01-22');

//     //Click the Save income-button
//     await page.getByRole('button', { name: /Save income/i }).click();

//     //Find and fill content in Expense
//     await page.locator('#expenseTitle').fill('Shirt');
//     await page.locator('#expenseCategory').selectOption('Clothes');
//     await page.locator('#expenseAmount').fill("200");
//     await page.locator('#expenseDate').fill('2023-02-01');

//     //Click the Save expense-button
//     await page.getByRole('button', { name: /Save expense/i }).click();


//     //Expect Income, expenses and balance to be correct
//     let totalIncome = await page.locator('#totalIncomeAmount')
//     let totalIncomeText = await totalIncome.textContent();
//     await expect(totalIncomeText).toEqual("1000");


//     let totalExpenses = await page.locator('#totalExpensesAmount')
//     let totalExpensesText = await totalExpenses.textContent();
//     await expect(totalExpensesText).toEqual("200");

//     // let test = await page.locator('.expenseMonth').count();

//     let totalBalance = await page.locator('#totalBalance')
//     let totalBalanceText = await totalBalance.textContent();
//     await expect(totalBalanceText).toEqual("800");


//     //Expect Income per Month to be correct

//     let incomeJanuary = await page.locator('.incomeMonth:has-text("January 2023: 1000")');
//     let incomeJanuaryContent = await incomeJanuary.textContent();
//     await expect(incomeJanuaryContent).toEqual('January 2023: 1000'); 

//     let expenseFebruary = await page.locator('.expenseMonthLabel:has-text("February 2023: 200")');
//     let expenseFebruaryContent = await expenseFebruary.textContent();
//     await expect(expenseFebruaryContent).toEqual('February 2023: 200'); 

//     //Delete the expense-post
//     let expenseClassCheckbox = await page.locator('.expenseCheckbox').check();
//     let deleteExpense = await page.locator('#deleteThisExpense').click();
//     // let thisCheckbox = await expenseClassCheckbox.locator('checkbox').check();

//     //Expext Balance to be updated
//     let totalBalance2 = await page.locator('#totalBalance')
//     let totalBalanceText2 = await totalBalance2.textContent();
//     await expect(totalBalanceText2).toEqual("1000");

//     //Expect Expenses per month to be empty
//     let getExpenseMonthCount= await page.locator('.expenseMonth').count();
//     await expect(getExpenseMonthCount).toEqual(0);
// });
