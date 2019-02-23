var mongoose = require('mongoose');
var SurveyQuestion = mongoose.model('SurveyQuestion');

function populateInfo() {
    var start = new SurveyQuestion({
        question: "Hi there! What resources are you interested in today?",
        option: '',
    });
    start.save(function(err, obj) {
        if (err) throw err;
        var health = new SurveyQuestion({
            question: "Got it - you're looking for health-related information. Which of the following health services are you interested in right now?",
            option: 'Health',
            parent: obj._id,
        });
        health.save(function(err, obj) {
            if (err) throw err;
            var medical = new SurveyQuestion({
                question: "Medi-Cal is California's Medicaid program serving low-income individuals, including families, seniors, persons with disabilities, children in foster care, pregnant women, and childless adults with incomes below 138% of federal poverty level.\n\nYou can apply online on http://www.coveredca.com/apply/.\n\nYou can also apply in person at your local human services agency: Santa Clara County Assistance Application Center - 1867 Senter Road San Jose, CA 95112. You can reach them by phone at (408) 758-3800.",
                option: 'Medi-Cal',
                apply: true,
                parent: obj._id,
            });
            medical.save(function(err, obj) {
                if (err) throw err;
            })
            var medicare = new SurveyQuestion({
                question: "Medicare is the US national healthcare program that provides health insurance for Americans aged 65 and older. To enroll in Medicare, you can call 1-800-772-1213 from 7AM to 7PM, Monday through Friday. You can also apply online at https://www.ssa.gov/benefits/medicare/.\n\nIf you want in-person help, please visit your local Social Security Office: 701 N. Shoreline Blvd. 1st Floor, Mountain View, CA 94043. They can be reached at 1-800-772-1213 and are open 9AM-4PM on Monday-Friday except Wednesday. Their Wednesday hours are 9AM-12PM.",
                option: 'Medicare',
                apply: true,
                parent: obj._id,
            });
            medicare.save(function(err, obj) {
                if (err) throw err;
            })
            var ihs = new SurveyQuestion({
                question: "The Indian Health Service is the government healthcare program for members of federally-recognized Native American Tribes and Alaska Native people.\n\nThe Indian Health Center of Santa Clara Valley is located at 1333 Meridian Ave, San Jose, CA 95125, and is open from 8AM-5PM on Monday through Friday and from 8AM-11AM on Saturday.\nYou can reach the Indian Health Center via phone at (408)-445-3400.",
                option: 'Indian Health Services',
                apply: true,
                parent: obj._id,
            });
            ihs.save(function(err, obj) {
                if (err) throw err;
            })
            var va = new SurveyQuestion({
                question: "You may be able to get VA health care benefits if you served in the active military, naval, or air service and didn’t receive a dishonorable discharge. You can apply online at https://www.va.gov/health-care/apply/application/introduction.\n\nIf you'd like to apply in person, you'll need to fill out a VA Form 10-10EZ and bring it to a VA medical center. The Palo Alto VA Medical Center is located at 3801 Miranda Avenue, Palo Alto, CA 94304-1207. You can call them at 650-493-5000. \n\n You should hear back from the VA about your application in less than a week. Feel free to call the national hotline at 1-877-222-VETS, Monday through Friday, 11AM to 11PM.",
                option: 'VA Health Benefits',
                apply: true,
                parent: obj._id,
            });
            va.save(function(err, obj) {
                if (err) throw err;
            })
        });
        var housing = new SurveyQuestion({
            question: "Got it - you're looking for housing-related information. Which of the following housing services are you interested in right now?",
            option: 'Housing',
            parent: obj._id,
        });
        housing.save(function(err, obj) {
            if (err) throw err;
        });
        var food = new SurveyQuestion({
            question: "Got it - you're looking for food-related information. Which of the following food services are you interested in right now?",
            option: 'Food',
            parent: obj._id,
        });
        food.save(function(err, obj) {
            if (err) throw err;
        });
        var parole = new SurveyQuestion({
            question: "Got it - you're looking for parole-related information. Which of the following parole services are you interested in right now?",
            option: 'Parole',
            parent: obj._id,
        });
        parole.save(function(err, obj) {
            if (err) throw err;
        });
    });
}

module.exports = populateInfo;