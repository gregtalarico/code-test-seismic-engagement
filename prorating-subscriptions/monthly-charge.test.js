const monthlyCharge = require('./monthly-charge');

const userNeverDeactivated1 = {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2019-01-01'),
    deactivatedOn: null,
    customerId: 1,
};
const userNeverDeactivated2 = {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2019-01-01'),
    deactivatedOn: null,
    customerId: 1,
};

const userActivatedAfterMonthStarted = {
    id: 3,
    name: 'Employee #3',
    activatedOn: new Date('2019-01-02'),
    deactivatedOn: null,
    customerId: 1,
};

const userDeactivatedBeforeMonthEnd = {
    id: 4,
    name: 'Employee #4',
    activatedOn: new Date('2018-01-02'),
    deactivatedOn: new Date('2019-01-14'),
    customerId: 1,
};

const userActivatedAndDeactivatedWithinAMonth = {
    id: 5,
    name: 'Employee #5',
    activatedOn: new Date('2019-01-02'),
    deactivatedOn: new Date('2019-01-14'),
    customerId: 1,
};

const userDeactivatedOnTheFirstDayOfAMonth = {
    id: 6,
    name: 'Employee #6',
    activatedOn: new Date('2019-01-02'),
    deactivatedOn: new Date('2019-02-01'),
    customerId: 1,
};

const userInactive = {
    id: 7,
    name: 'Employee #7',
    activatedOn: null,
    deactivatedOn: null,
    customerId: 1
}

const userDeactivatedOnLeapDay = {
    id: 8,
    name: 'Employee #8',
    activatedOn: new Date('2019-01-02'),
    deactivatedOn: new Date('2020-02-29'),
    customerId: 1
}

const users = [userNeverDeactivated1, userNeverDeactivated2];

const users2 = [userActivatedAfterMonthStarted];

const users3 = [userDeactivatedBeforeMonthEnd];

const users4 = [userActivatedAndDeactivatedWithinAMonth];

const users5 = [userDeactivatedOnTheFirstDayOfAMonth];



const plan = {
    id: 1,
    customerId: 1,
    monthlyPriceInCents: 5000,
};

const easyMathForMonthsWith31DaysPlan = {
    id: 1,
    customerId: 1,
    monthlyPriceInCents: 31,
};

const wrongCompanyPlan = {
    id: 1,
    customerId: 100,
    monthlyPriceInCents: 31,
};

const easyMathForFebruaryPlan = {
    id: 1,
    customerId: 1,
    monthlyPriceInCents: 28,
};




describe('monthlyCharge', function () {
    it('works when no users are active', function () {
        expect(monthlyCharge('2018-10', plan, users)).toBe(0);
    });

    it('works when the active users are active the entire month', function () {
        const expectedUserCount = 2;
        expect(monthlyCharge('2020-12', plan, users)).toBe(expectedUserCount * 5000);
    });

    it('works when users are not active to start the month', () => {
        expect(monthlyCharge('2019-01', easyMathForMonthsWith31DaysPlan, users2)).toBe(30);
    });
    
    it('works when users are not active to end the month', () => {
        expect(monthlyCharge('2019-01', easyMathForMonthsWith31DaysPlan, users3)).toBe(14);
    });
    
    it('works when users are not active to start or end the month', () => {
        expect(monthlyCharge('2019-01', easyMathForMonthsWith31DaysPlan, [...users2, ...users3])).toBe(44);
    });
    
    it('works when users are not active to start and end the month', () => {
        expect(monthlyCharge('2019-01', easyMathForMonthsWith31DaysPlan, users4)).toBe(13);
    });

    it('works when users are from another company', () => {
        expect(monthlyCharge('2020-12', wrongCompanyPlan, users)).toBe(0);
    });

    it('works far in the future for never deactivated users', () => {
        expect(monthlyCharge('2045-04', plan, users2)).toBe(5000);
    });

    it('works when a user is deactivated on the first day of the month', () => {
        expect(monthlyCharge('2019-02', easyMathForFebruaryPlan, users5)).toBe(1);
    });

    it('works with no users', function() {
        expect(monthlyCharge('2019-01', plan, [])).toBe(0);
    });

    it('works with free subscription', function() {
        expect(monthlyCharge('2019-01', { monthlyPriceInCents: 0 }, users)).toBe(0);
    });

    it('works on a leap month', function() {
        expect(monthlyCharge('2020-02', plan, users)).toBe(10000);
    });

    it('works when deactivated on leap day', function() {
        expect(monthlyCharge('2020-02', plan, [userDeactivatedOnLeapDay])).toBe(5000);
    });

    it('it works with active and inactive users', function() {
        const expectedUserCount = 3;
        expect(monthlyCharge('2020-12', plan, [...users, userInactive])).toBe((expectedUserCount - 1) * plan.monthlyPriceInCents);
    });

    it('works when 0 users have ever been active', function() {
        expect(monthlyCharge('2019-01', plan, [userInactive])).toBe(0);
    });
});
