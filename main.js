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

            selectedIncomeMonth: "Choose month",
            selectedExpensesMonth: "Choose month",

            testSelectedYear: 'Year',
            testYears: [],
            testSelectedMonth: 'Month',

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
        const incomeIDFromLocalStorage = JSON.parse(localStorage.getItem('incomeID'));
        const expenseIDFromLocalStorage = JSON.parse(localStorage.getItem('expenseID'));
        const dataloadedFromLocalStorage = JSON.parse(localStorage.getItem('dataLoaded'));

        if (incomePostsFromLocalStorage) {
            this.incomePosts = incomePostsFromLocalStorage;
        }

        if (expensesPostsFromLocalStorage) {
            this.expensesPosts = expensesPostsFromLocalStorage;
        }

        if (incomeIDFromLocalStorage) {
            this.incomeID = incomeIDFromLocalStorage;
        }

        if (expenseIDFromLocalStorage) {
            this.expenseID = expenseIDFromLocalStorage;
        }

        if (dataloadedFromLocalStorage) {
            this.dataLoaded = dataloadedFromLocalStorage;
        }

        this.calculateIncome(this.incomePosts);
        this.calculateExpenses(this.expensesPosts);
    },
    watch: {
        sortedMonthlyIncome: function () {
            this.selectedIncomeMonth = "Choose month";
            this.selectedExpensesMonth = "Choose month";
            this.testSelectedYear = "Year";
            this.testSelectedMonth = "Month";
        },
        sortedMonthlyExpenses: function () {
            this.selectedIncomeMonth = "Choose month";
            this.selectedExpensesMonth = "Choose month";
            this.testSelectedYear = "Year";
            this.testSelectedMonth = "Month";
        },
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

        sortedMonthlyIncome() {
            const months = Object.keys(this.monthlyIncome);
            return months.sort((a, b) => new Date(b) - new Date(a));
        },
        sortedMonthlyExpenses() {
            const months = Object.keys(this.monthlyExpenses);
            return months.sort((a, b) => new Date(b) - new Date(a));
        },

        //     incomeCategoryPay() {
        //         return this.incomePosts.filter(incomePosts => incomePosts.incomeCategory === 'Pay')
        //     }

        selectedMonthExpenses() {
            const selectedMonth = this.testMonths.find(
                month => month.label === this.testSelectedMonth
            );
            return selectedMonth ? selectedMonth.testMExpense : '';
        }

    },

    methods: {
        /* toggleExpenses() {

            this.expensesHidden = !this.expensesHidden;
        }, */
        saveToLocalStorage() {
            localStorage.setItem('incomePosts', JSON.stringify(this.incomePosts));
            localStorage.setItem('expensesPosts', JSON.stringify(this.expensesPosts));
            localStorage.setItem('incomeID', JSON.stringify(this.incomeID));
            localStorage.setItem('expenseID', JSON.stringify(this.expenseID));
            localStorage.setItem('dataLoaded', JSON.stringify(this.dataLoaded));
        },
        checkForFutureDate(date) {
            const today = new Date().toLocaleDateString();
            const inputDate = new Date(date).toLocaleDateString();

            return inputDate > today;
        },

        addIncomePost() {
            if (this.incomeText.trim() === '' || this.incomeAmount === ''
                || this.incomeCategory === '' || this.incomeDate === '') {
                return;
            }

            if (this.checkForFutureDate(this.incomeDate)) {
                alert("Please enter a date that is not in the future.");
                return;
            }

            let incomeObject = {
                incomeText: this.incomeText,
                incomeCategory: this.incomeCategory,
                incomeAmount: this.incomeAmount,
                incomeDate: this.incomeDate,
                isChecked: false,
                incomeID: this.incomeID
            };
            this.incomePosts.push(incomeObject);

            this.sortIncomePosts();

            this.incomeID++;

            this.incomeText = '',
                this.incomeCategory = '',
                this.incomeAmount = '',
                this.incomeDate = ''

            this.calculateIncome(this.incomePosts);

            this.saveToLocalStorage();
        },
        sortIncomePosts() {
            this.incomePosts.sort((a, b) => new Date(b.incomeDate) - new Date(a.incomeDate));
        },
        addExpensePost() {
            if (this.expenseText.trim() === '' || this.expenseAmount === ''
                || this.expenseCategory === '' || this.expenseDate === '') {
                return;
            }

            if (this.checkForFutureDate(this.expenseDate)) {
                alert("Please enter a date that is not in the future.");
                return;
            }

            let expenseObject = {
                expenseText: this.expenseText,
                expenseCategory: this.expenseCategory,
                expenseAmount: this.expenseAmount,
                expenseDate: this.expenseDate,
                isChecked: false,
                expenseID: this.expenseID
            };
            this.expensesPosts.push(expenseObject);

            this.sortExpensesPosts();

            this.expenseID++;

            this.expenseText = '',
                this.expenseCategory = '',
                this.expenseAmount = '',
                this.expenseDate = ''

            this.calculateExpenses(this.expensesPosts);

            this.saveToLocalStorage();

            //Testar en metod här - Jag borde inte behöva skicka in this.-variablerna väl?
            this.testUpdateYearAndMonth(expenseObject, this.testMonths, this.testYears);
        },

        sortExpensesPosts() {
            this.expensesPosts.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));
        },

        //I så fall borde this-variablerna inte behövas här nedan heller (se ovan).

        //Lägg till årtal i option-listan (dropdown för år)
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

        //metod som hittar månadens id baserat på toLocaleString (som ibland blir på svenska och ibland i engelska)
        //metoden anropas i metoden som följer på denna 
        testfindMonthIdFromMonthString(MonthString) {

            let monthId = '';

            if (MonthString === "January" || MonthString === "januari") {
                monthId = 0;
            }

            else if (MonthString === "February" || MonthString === "februari") {
                monthId = 1;
            }

            else if (MonthString === "March" || MonthString === "mars") {
                monthId = 2;

            }
            else if (MonthString === "April" || MonthString === "april") {
                monthId = 3;

            }
            else if (MonthString === "May" || MonthString === "maj") {
                monthId = 4;

            }
            else if (MonthString === "June" || MonthString === "juni") {
                monthId = 5;

            }
            else if (MonthString === "July" || MonthString === "juli") {
                monthId = 6;

            }
            else if (MonthString === "August" || MonthString === "augusti") {
                monthId = 7;

            }
            else if (MonthString === "September" || MonthString === "september") {
                monthId = 8;

            }
            else if (MonthString === "October" || MonthString === "oktober") {
                monthId = 9;

            }
            else if (MonthString === "November" || MonthString === "november") {
                monthId = 10;

            }
            else if (MonthString === "December" || MonthString === "december") {
                monthId = 11;

            }

            return monthId;
        },


        testComputeMonthlyExpenses() {

            //sätt månadens utgifter till noll varje gång metoden anropas (för att den ska nollas när du byter år t.ex.)
            this.testMonths.forEach(month => {
                month.testMExpense = 0;
            })

            let testCurrentYear = this.testSelectedYear;
            let testYear = '';
            let testExpensesMonthId = '';
            //här hämtar vi ut årtal och månad från varje expense
            this.expensesPosts.forEach(post => {
                testYear = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });

                if (testYear === testCurrentYear) {
                const testExpensesMonthString = new Date(post.expenseDate).toLocaleString('default', { month: 'long' });

                //få ut månadsid från varje expense
                testExpensesMonthId = this.testfindMonthIdFromMonthString(testExpensesMonthString);
            
                this.testMonths[testExpensesMonthId].testMExpense += post.expenseAmount;
                }
            })

            // //för att den inte ska köras när man enbart hunnit välja år i dropdown - före man hinner välja månad
            // if (!this.testSelectedYear == '') {

            //     this.testMonths.forEach(post => {

            //         let testCurrentMonthId = post.id;

            //         //om årtal och månad från expensen stämmer överense med de valda i dropdowns
            //         if (testYear === testCurrentYear && testExpensesMonthId === testCurrentMonthId) {
            //             // id och index är samma så därför funkar det att nu lägg till summan i månadens testMexpense (konstigt variabelnamn)
            //             this.testMonths[testCurrentMonthId].testMExpense += post.expenseAmount;
            //         }


            //     })

            // }
        },

        //
        // testComputeMonthlyExpenses() {

        //     //sätt månadens utgifter till noll varje gång metoden anropas (för att den ska nollas när du byter år t.ex.)
        //     this.testMonths.forEach(month => {
        //         month.testMExpense = 0;
        //     })


        //     //för att den inte ska köras när man enbart hunnit välja år i dropdown - före man hinner välja månad
        //     if (!this.testSelectedYear == '' && !this.testSelectedMonth == '') {

        //         let testCurrentYear = this.testSelectedYear; //hämta valt år från dropdown, kanske ej behövs. borde kunna skicka in this.SelectedYear direkt
        //         let testCurrentMonthString = this.testSelectedMonth; //hämta valt år från dropdown, se ovan

        //         // här får vi ut månadens id för den månad som är vald i optionlista
        //         let testCurrentMonthId = this.testfindMonthIdFromMonthString(testCurrentMonthString);

        //         //här hämtar vi ut årtal och månad från varje expense
        //         this.expensesPosts.forEach(post => {
        //             const testYear = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });
        //             const testExpensesMonthString = new Date(post.expenseDate).toLocaleString('default', { month: 'long' });

        //             //få ut månadsid från varje expense (så att vi sen kan jämföra den med den månaden som är vald)
        //             let testExpensesMonthId = this.testfindMonthIdFromMonthString(testExpensesMonthString);

        //             //om årtal och månad från expensen stämmer överense med de valda i dropdowns
        //             if (testYear === testCurrentYear && testExpensesMonthId === testCurrentMonthId) {

        //                 // id och index är samma så därför funkar det att nu lägg till summan i månadens testMexpense (konstigt variabelnamn)
        //                 this.testMonths[testCurrentMonthId].testMExpense += post.expenseAmount;
        //             }

        //         })

        //     }
        // },

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

            //Added this row - LINDA
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

            let thisPost = this.expensesPosts[indexToDelete];
            const expenseTestYear = new Date(thisPost.expenseDate).toLocaleString('default', { year: 'numeric' });

            this.expensesPosts.splice(indexToDelete, 1)

            this.calculateExpenses(this.expensesPosts)

            //HÄR är ett förslag som jag började skriva på sent inatt men jag har inte testat det. Du får gärna göra det om du vill.
            // const expenseTestSomething = new Date(this.expensesPosts[indexToDelete].toLocaleString('default', { month: 'long' }))
            // const expenseTestMonthId = this.testfindMonthIdFromMonthString(expenseTestSomething)
            // this.testMonths[expenseTestMonthId].testMExpense -= this.expensesPosts[indexToDelete].expenseAmount;

            // const expenseTestYear= new Date(this.expensesPosts[indexToDelete]).toLocaleString('default', { year: 'numeric' });

            let counter = 0
            this.expensesPosts.forEach(post => {
                const year = new Date(post.expenseDate).toLocaleString('default', { year: 'numeric' });

                if (year === expenseTestYear) {

                    counter++;
                }

            })


            if (counter === 0) {

                this.testYears = this.testYears.filter(obj => obj.label !== expenseTestYear);
            }

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
                    data.incomePosts.forEach(post => {
                        post.isChecked = false;
                        post.incomeID = this.incomeID++;
                        this.incomePosts.push(post);
                    });

                    data.expensesPosts.forEach(post => {
                        post.isChecked = false;
                        post.expenseID = this.expenseID++;
                        this.expensesPosts.push(post);
                    });

                    this.sortIncomePosts();
                    this.sortExpensesPosts();

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