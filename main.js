Vue.createApp({
    data() {
        return {

            filteredPosts: [],

            incomePosts: [],
            incomeID: 0,
            incomeText: '',
            incomeCategory: '',
            incomeAmount: '',
            incomeDate: '',

            totalIncome: 0,
            monthlyIncome: {},
            monthlyExpenses: {},

            expensesPosts: [],
            expenseID: 0,
            expenseText: '',
            expenseCategory: '',
            expenseDate: '',
            expenseAmount: '',
            totalExpenses: 0,

            testSelectedYear: '',
            testYears: [],
            testSelectedMonth: '',

            //Class or not? 
            testMonths: [
                { id: 0, label: "January", testMExpense: 0 },
                { id: 1, label: "February", testMExpense: 0 },
                { id: 2, label: "March", testMExpense: 0 },
                { id: 3, label: "April", testMExpense: 0 },
                { id: 4, label: "May", testMExpense: 0 },
                { id: 5, label: "June", testMExpense: 0 },
                { id: 6, label: "July", testMExpense: 0 },
                { id: 7, label: "August", testMExpense: 0 },
                { id: 8, label: "September", testMExpense: 0 },
                { id: 9, label: "October", testMExpense: 0 },
                { id: 10, label: "November", testMExpense: 0 },
                { id: 11, label: "December", testMExpense: 0 }
            ],


            /*
                        dropDownOptions: [],
                        filteredByMonth: [],
                        filterMonthlyExpenses: [],
                        monthsWithExpenses: [],
                        newFilter: [],
            
                        yearAndMonth: '',*/

            totalBalance: 0,

            /*perMonth: '', */

            //monthlyExpenses: 0,
            //someStuffExpenses: 0,

            dataLoaded: false,

            /* picked: 'Year',
            expensesHidden: true */
        }
    },

    mounted() {
        const incomePostsFromLocalStorage = JSON.parse(localStorage.getItem('incomePosts'));
        const expensesPostsFromLocalStorage = JSON.parse(localStorage.getItem('expensesPosts'));
        const dataloadedFromLocalStorage = localStorage.getItem('dataLoaded');

        if (incomePostsFromLocalStorage) {
            this.incomePosts = incomePostsFromLocalStorage;
        }

        if (expensesPostsFromLocalStorage) {
            this.expensesPosts = expensesPostsFromLocalStorage;
        }

        if (dataloadedFromLocalStorage) {
            this.dataLoaded = JSON.parse(dataloadedFromLocalStorage);
        }

        this.calculateIncome(this.incomePosts);
        this.calculateExpenses(this.expensesPosts);

    },

    computed: {

        // hiddenPerMonth() {
        //   return this.perMonth ? '' : 'hidden';
        // },

        hasIncomePosts() {
            return this.incomePosts.length > 0;
        },

        hasExpensePosts() {
            return this.expensesPosts.length > 0;
        },

        //     incomeCategoryPay() {
        //         return this.incomePosts.filter(incomePosts => incomePosts.incomeCategory === 'Pay')
        //     }

        selectedMonthExpenses() {
            const selectedMonth = this.testMonths.find(
                month => month.label === this.testSelectedMonth
            );
            return selectedMonth ? selectedMonth.testMExpense : '';
        },


        testComputeMonthlyExpenses() {

            if (!this.testSelectedYear == '' && !this.testSelectedMonth == '') {
                let testCurrentYear = this.testSelectedYear;
                let testCurrentMonthString = this.testSelectedMonth;
                let testCurrentMonthId = ''

                if (testCurrentMonthString === "January") {
                    testCurrentMonthId = 0;

                }
                else if (testCurrentMonthString === "February") {
                    testCurrentMonthId = 1;

                }
                else if (testCurrentMonthString === "March") {
                    testCurrentMonthId = 2;

                }
                else if (testCurrentMonthString === "April") {
                    testCurrentMonthId = 3;

                }
                else if (testCurrentMonthString === "May") {
                    testCurrentMonthId = 4;

                }
                else if (testCurrentMonthString === "June") {
                    testCurrentMonthId = 5;

                }
                else if (testCurrentMonthString === "July") {
                    testCurrentMonthId = 6;

                }
                else if (testCurrentMonthString === "August") {
                    testCurrentMonthId = 7;

                }
                else if (testCurrentMonthString === "September") {
                    testCurrentMonthId = 8;

                }
                else if (testCurrentMonthString === "October") {
                    testCurrentMonthId = 9;

                }
                else if (testCurrentMonthString === "November") {
                    testCurrentMonthId = 10;

                }
                else if (testCurrentMonthString === "December") {
                    testCurrentMonthId = 11;

                }

                this.expensesPosts.forEach(post => {
                    const testYear = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });
                    const testExpensesMonthString = new Date(post.expenseDate).toLocaleString('default', { month: 'long' });
                    let testExpensesMonthId = '';

                    if (testExpensesMonthString === "januari") {
                        testExpensesMonthId = 0;

                    }
                    else if (testExpensesMonthString === "februari") {
                        testExpensesMonthId = 1;

                    }
                    else if (testExpensesMonthString === "mars") {
                        testExpensesMonthId = 2;

                    }
                    else if (testExpensesMonthString === "april") {
                        testExpensesMonthId = 3;

                    }
                    else if (testExpensesMonthString === "maj") {
                        testExpensesMonthId = 4;

                    }
                    else if (testExpensesMonthString === "juni") {
                        testExpensesMonthId = 5;

                    }
                    else if (testExpensesMonthString === "juli") {
                        testExpensesMonthId = 6;

                    }
                    else if (testExpensesMonthString === "augusti") {
                        testExpensesMonthId = 7;

                    }
                    else if (testExpensesMonthString === "september") {
                        testExpensesMonthId = 8;

                    }
                    else if (testExpensesMonthString === "oktober") {
                        testExpensesMonthId = 9;

                    }
                    else if (testExpensesMonthString === "november") {
                        testExpensesMonthId = 10;

                    }
                    else if (testExpensesMonthString === "december") {
                        testExpensesMonthId = 11;

                    }


                    if (testYear === testCurrentYear && testExpensesMonthId === testCurrentMonthId) {

                        // const testDesiredObject = 
                        // this.testMonths.filter(obj => obj.id === testCurrentMonthId)[0].testMExpense += post.expenseAmount;

                        this.testMonths[testCurrentMonthId].testMExpense += post.expenseAmount;

                        // testDesiredObject.testMExpense += post.expenseAmount;

                    }

                })

            }
        }

    },

    methods: {
        /* toggleExpenses() {

            this.expensesHidden = !this.expensesHidden;
        }, */
        saveToLocalStorage() {
            localStorage.setItem('incomePosts', JSON.stringify(this.incomePosts));
            localStorage.setItem('expensesPosts', JSON.stringify(this.expensesPosts));
            localStorage.setItem('dataLoaded', JSON.stringify(this.dataLoaded));
        },

        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            let incomeObject = {
                isChecked: false,
                incomeID: this.incomePosts.length + 1,
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate,
            };
            this.incomePosts.push(incomeObject);

            this.incomeID++;

            this.incomeText = '',
                this.incomeCategory = '',
                this.incomeAmount = '',
                this.incomeDate = ''

            this.calculateIncome(this.incomePosts);

            this.saveToLocalStorage();
        },
        addExpensePost() {
            if (this.expenseText.trim() === '' || this.expenseAmount === ''
                || this.expenseCategory === '' || this.expenseDate === '') {
                return;
            }

            let expenseObject = {
                isChecked: false,
                expenseID: this.expensesPosts.length + 1,
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
            };
            this.expensesPosts.push(expenseObject);

            this.expenseID++;

            this.expenseText = '',
                this.expenseCategory = '',
                this.expenseAmount = '',
                this.expenseDate = ''

            this.calculateExpenses(this.expensesPosts);

            this.saveToLocalStorage();

            //Testar en metod här
            this.testUpdateYearAndMonth(expenseObject, this.testMonths, this.testYears);  

        },

        testUpdateYearAndMonth(expenseObject, testMonths, testYears) {

            const testTemporaryMonth = new Date(expenseObject.expenseDate).toLocaleString('default', { month: 'long' });
            const testTemporaryYear = new Date(expenseObject.expenseDate).toLocaleString('default', { year: 'numeric' });

            let yearObject = {
                label: testTemporaryYear
            };

            const yearExists = this.testYears.some((year) => year.label === testTemporaryYear);
            if (!yearExists) {
                this.testYears.push(yearObject)
            }


        },

        calculateIncome(incomePosts) {
            const monthlyIncome = {};

            incomePosts.forEach(post => {
                const month = new Date(post.incomeDate).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!monthlyIncome[month]) {
                    monthlyIncome[month] = 0;
                }
                monthlyIncome[month] += parseFloat(post.incomeAmount);
            });

            this.totalIncome = Object.values(monthlyIncome).reduce((acc, income) => acc + income, 0);

            //this.totalIncome = incomePosts.reduce((accumulator, incomePosts) => accumulator + incomePosts.incomeAmount, 0);

            this.monthlyIncome = monthlyIncome;

            this.saveToLocalStorage();

            this.calculateBalance();

            return monthlyIncome;
        },
        calculateExpenses(expensesPosts) {
            const monthlyExpenses = {};

            expensesPosts.forEach(post => {
                const month = new Date(post.expenseDate).toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!monthlyExpenses[month]) {
                    monthlyExpenses[month] = 0;
                }
                monthlyExpenses[month] += parseFloat(post.expenseAmount);
            })

            this.totalExpenses = Object.values(monthlyExpenses).reduce((acc, expense) => acc + expense, 0);

            this.monthlyExpenses = monthlyExpenses;

            //this.totalExpenses = expensesPosts.reduce((accumulator, expense) => accumulator + expense.expenseAmount, 0);

            this.saveToLocalStorage();

            this.calculateBalance();

            return monthlyExpenses;
        },
        calculateBalance() {
            this.totalBalance = this.totalIncome - this.totalExpenses;

            this.saveToLocalStorage();
        },
        clearIncomePosts() {
            this.incomePosts = [];
            this.monthlyIncome = {};
            this.incomeID = 0;
            this.totalIncome = 0;

            this.saveToLocalStorage();

            this.clearBalance();
        },
        clearExpensesPosts() {
            this.expensesPosts = [];
            this.monthlyExpenses = {};
            this.expenseID = 0;
            this.totalExpenses = 0;

            //Added
            this.testYears = [];

            this.saveToLocalStorage();

            this.clearBalance();
        },
        clearBalance() {
            if (this.incomePosts.length === 0) {
                this.totalBalance = - this.totalExpenses;
            }
            else if (this.expensesPosts.length === 0) {
                this.totalBalance = this.totalIncome;
            }
            else {
                this.totalBalance = 0;
            }

            this.saveToLocalStorage();

            this.checkDataLoaded();
        },
        checkDataLoaded() {
            if (this.incomePosts.length === 0 && this.expensesPosts.length === 0 && this.dataLoaded === true) {
                this.clearDataLoaded();
            }
            else {
                return
            }
        },
        clearDataLoaded() {
            this.dataLoaded = false;

            this.saveToLocalStorage();
        },
        deleteExpensePost(indexToDelete) {
            this.expensesPosts.splice(indexToDelete, 1)

            this.calculateExpenses(this.expensesPosts)
        },
        deleteIncomePost(indexToDelete) {
            this.incomePosts.splice(indexToDelete, 1)

            this.calculateIncome(this.incomePosts)
        },
        showIncomeDeleteButton(index) {
            return this.incomePosts[index].isChecked;
        },
        showExpenseDeleteButton(index) {
            return this.expensesPosts[index].isChecked;
        },
        loadFetchData() {
            if (!this.dataLoaded) {
                this.fetchData();
            }
        },
        fetchData() {
            fetch('start-data.json')
                .then(response => response.json())
                .then(data => {
                    this.incomePosts = [...this.incomePosts, ...data.incomePosts];
                    this.expensesPosts = [...this.expensesPosts, ...data.expensesPosts];
                    this.incomeID = this.incomePosts.length;
                    this.expenseID = this.expensesPosts.length;
                    this.calculateIncome(this.incomePosts);
                    this.calculateExpenses(this.expensesPosts);

                    this.expensesPosts.forEach(expensesPost => {
                        this.testUpdateYearAndMonth(expensesPost)
                    });

                    /* this.expensesPosts.forEach(expensesPost => {
                        this.checkDropDownObject(expensesPost);
                        this.checkMonthsWithExpenses(expensesPost);
                    }); */

                    this.dataLoaded = true;

                    this.saveToLocalStorage();
                })
        }
    }
}).mount('#app')