/**
 * Participant model events
 */

'use strict';

import {EventEmitter} from 'events';
var ParticipantEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ParticipantEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Participant) {
  for(var e in events) {
    let event = events[e];
    Participant.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ParticipantEvents.emit(event + ':' + doc._id, doc);
    ParticipantEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ParticipantEvents;
