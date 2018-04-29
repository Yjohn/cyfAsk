/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

"use strict";
const Alexa = require("alexa-sdk");
const AWS = require("aws-sdk"); // this is defined to enable a DynamoDB connection from local testing
const AWSregion = "eu-west-1"; // eu-west-1
var persistenceEnabled;
AWS.config.update({
  region: AWSregion
});
const Speechlet = require("alexa-speechlet");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.b9ae3d24-875c-4441-80a1-9b07e798d8c1";
const APP_INFO =
  "Welcome to the code your future skill! You can use this skill to interact with code your future. Try asking us about our class's in the uk, like what code your future is, how you can Volunter or take a part of the organization";
const COMP_INFO = "You can aware more about code your future";
const HELP_MESSAGE =
  "This skill can be used to interact with code your future facts, or, you can say exit... What can I help you with? Try asking about us?";
const HELP_REPROMPT =
  "What can I help you with? maybe you would like to hear about the code your future facts";
const STOP_MESSAGE = "Goodbye from code your future!";

// text for card
const WELCOME =
  "Welcome to the code your future skill for alexa! Try asking us about our activities!";
const CYFINFO = "Code Your Future ";
const TITLE = "Code Your Future";
const welcomeCardImg = {
  smallImageUrl:
    "http://www.integrationawards.uk/wp-content/uploads/2017/10/logo-CYF-large.png",
  largeImageUrl:
    "https://i1.wp.com/www.refugeevoicesscotland.com/wp-content/uploads/2018/02/IMG_20180111_201802-01.jpg"
};

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const COMP_DATA = [
  "We are a non-profit organisation supporting refugees with the dream of becoming developers.",
  "In their journey of interrupted lives, unfinished studies and integration challenges, many asylum seekers and refugees yearn to update their tech skills, but lack learning opportunities. We want to change this.",
  "Last year we launched the first cohort of our 6-month web development programme, coached by a group of professional developers.",
  "Today we are running new classes in London, Glasgow and Manchester. This is just the beginning. With your help we will be expanding to other regions and cities."
];
const FACTS = [
  "Welcome to our community. Here, you will learn all the technical skills needed to become a professional developer.",
  "During the course you will learn the whole web development stack, including HTML/CSS, JavaScript and backend technologies.",
  "We’ll complement the training with workshops on modern software methodologies and job interview practices.",
  "Our 6-month web development programme has proven a success, where 75% of our graduates eligible to work have found permanent employment in the industry.",
  "Welcome to a community where your knowledge and experience will help to transform the lives of refugees in the UK.",
  "We are looking for experienced web developers (HTML/CSS, JavaScript, Node, Angular, React, Database) to participate in our classes.",
  "We are also looking for technology managers and entrepreneurs to give workshops on modern software practices and methodologies.",
  "Last year a small group of professional developers got together with a group of asylum seekers and refugees to start the first class of CodeYourFuture.",
  "Today we are small community creating an environment that is open, playful and tolerant, ensuring a lasting learning experience that influences the lives of our students.",
  "we work on a hundred percent donation model. That means that all support from individuals will go entirely to support our students. This will help cover for childcare, transportation, laptops and internet for our students most in need."
];

const FACT_PROMT = [
  "Would you like another fact?",
  "Would you like to hear more interesting things about code your future?",
  "can I tell you something else about the code your future?",
  "Can I tell you more about code your future?",
  "Should I give you more details about the organization?",
  "Would you like to hear more?",
  "Should I keep going?",
  "Should I go on?"
];
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
  let alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('welcome');
  },

  'Welcome': function() {
    var speechOutput = APP_INFO;
    this.response.speak(speechOutput);
    this.response.cardRenderer(TITLE, WELCOME, welcomeCardImg);
    //this.emit(':tell', ssml);
    this.emit(":responseReady");
  },

  'CyfInfoIntent': function() {
    var speechOutput = APP_INFO;
    this.response.speak(speechOutput);
    this.response.cardRenderer(TITLE, CYFINFO, welcomeCardImg);
    this.emit(":responseReady");
  },

  'Factintent': function() {
    var i = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[i];

    var j = Math.floor(Math.random() * FACT_PROMT.length);
    var randomFactRepromt = FACT_PROMT[j];

    this.attributes.lastIntent = "factIntent"; //adding the last fact to the session attributes, so we can use it to repeat it if requested by the user.
    this.response.speak(randomFact + ". " + randomFactRepromt).listen("Say yes if you would like another fact?");
    this.emit(":responseReady");
  },

  "AMAZON.HelpIntent": function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(":responseReady");
  },
  "AMAZON.CancelIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  },
  "AMAZON.StopIntent": function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(":responseReady");
  }
};


