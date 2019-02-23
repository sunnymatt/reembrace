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
            var vash = new SurveyQuestion({
                question: "The HUD-VASH program provides assistance to homeless veterans by combining rental assistance with case management and clinical services. The HUD-VASH program is a partnership between the Veterans Affairs Palo Alto Health Care System (VA Palo Alto) and SCCHA.\n\n To apply, you need a referral from VA Palo Alto. You can schedule an appointment online at https://www.myhealth.va.gov/mhv-portal-web/web/myhealthevet/keeping-up-with-all-your-va-appointments. You can also call them at 800-455-0057 or (650) 493-5000.",
                option: 'VASH',
                apply: true,
                parent: obj._id,
            });
            vash.save(function(err, obj) {
                if (err) throw err;
            })
            var eden = new SurveyQuestion({
                question: "The mission of Eden Housing is to build and maintain high quality, well-managed, service-enhanced affordable housing communities that meet the diverse needs of lower income families, seniors, and persons with disabilities.\n\nYou can view a property locator online at https://www.edenhousing.org/interactive-map?field_county__value=11&field_field_address_locality=34. You may also call Eden Housing at (510) 582-1460.",
                option: 'Eden Housing',
                parent: obj._id,
            });
            eden.save(function(err, obj) {
                if (err) throw err;
            })
            var mercy = new SurveyQuestion({
                question: "Mercy Housing provides a wide range of affordable, low-income apartment rental opportunities across the United States. Our housing services are available for families, seniors and people with special needs, including those with developmental disabilities, HIV/AIDS, formerly homeless individuals and Veterans.\n\nYou can view property listings for the San Francisco Bay Area at https://www.mercyhousing.org/california-properties#San%20Fran%20Properties.\n\nIf you have general questions about low-income assistance or anything else, please contact the corporate office at 866-338-0557.",
                option: 'Eden Housing',
                parent: obj._id,
            });
            mercy.save(function(err, obj) {
                if (err) throw err;
            })
            var mercy = new SurveyQuestion({
                question: "First Community Housing is an affordable housing developer. To find housing now, you can visit https://www.firstcommunityhousing.org/findhousing. For a listing of all affordable housing available in Santa Clara County, go to http://www.scchousingsearch.org. You can also call toll-free at 1-877-428-8844 Monday-Friday from 12pm-11pm.",
                option: 'First Community Housing',
                parent: obj._id,
            });
            mercy.save(function(err, obj) {
                if (err) throw err;
            })

            var homefirst = new SurveyQuestion({
                question: "HomeFirst is a leading provider of services, shelter, and housing opportunities to the homeless and those at risk of homelessness in Santa Clara County. HomeFirst's Boccardo Reception Center is the largest homeless service center in Santa Clara County. It operates year-round, 24 hours a day, providing shelter and transitional housing as well as a wide array of critical services. The BRC is located at 2011 Little Orchard St, San Jose, CA 95125.\n\nHomeFirst also has a Cold Weather Shelter Program. HomeFirst’s CWSP provides emergency shelter, showers, meals, medical services, and a safe environment for homeless individuals in North and South County.\n\nTo reserve a space in South County Gilroy Shelter, contact Kenneth Rideout: 408-489-8781, KRideout@homefirstscc.org.\n\nTo reserve a space in North County Mountain View Shelter, contact Jodi Harmon: 408-590-8196, JHarmon@homefirstscc.org.",
                option: 'HomeFirst',
                parent: obj._id,
            });
            homefirst.save(function(err, obj) {
                if (err) throw err;
            })
        });
        var employment = new SurveyQuestion({
            question: "Got it - you're looking for employment-related information. Which of the following employment services are you interested in right now?",
            option: 'Employment',
            parent: obj._id,
        });
        employment.save(function(err, obj) {
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