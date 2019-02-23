module.exports = {
    start: {
        question: "Hi there! What resources are you interested in today?",
        options: ["Health", "Housing", "Food", "Treatment", "Parole"]
    }
    ,
    health: {
        question: "Got it - you're looking for health-related information. Which of the following health services are you interested in right now?",
        options: ["Medi-Cal", "Medicare", "Indian Health Services"],
        parent: "start"
    },
}