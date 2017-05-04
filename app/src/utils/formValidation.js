const MAX_NAME_LENGTH = 20
const MIN_NAME_LENGTH = 1

const MAX_MESSAGE_LENGTH = 160
const MIN_MESSAGE_LENGTH = 1

const MAX_GROUP_LENGTH = 20
const MIN_GROUP_LENGTH = 1

const MAX_CONTACT_LENGTH = 20
const MIN_CONTACT_LENGTH = 1

const MAX_RESPONSE_LENGTH = 40
const MIN_RESPONSE_LENGTH = 0

const lengthExceedsMaxTrigger = string => (string.length > MAX_NAME_LENGTH)

const triggerLengthIsTooShort = string => (string.length < MIN_NAME_LENGTH) 

const messageIsTooShort = string => (string.length < MIN_MESSAGE_LENGTH)

const messageIsTooLong = string => (string.length > MAX_MESSAGE_LENGTH)

const groupIsTooLong = string => (string.length > MAX_GROUP_LENGTH)

const groupIsTooShort = string => (string.length < MIN_GROUP_LENGTH)

const contactIsTooLong = string => (string.length > MAX_CONTACT_LENGTH)

const contactIsTooShort = string => (string.length < MIN_CONTACT_LENGTH)

const responseIsTooLong = string => (string.length > MAX_RESPONSE_LENGTH)

const responseIsTooShort = string => (string.length < MIN_RESPONSE_LENGTH)

//let overflow
//required is true, max length,a ll taht stuff
//


export { lengthExceedsMaxTrigger, triggerLengthIsTooShort, messageIsTooLong, messageIsTooShort, groupIsTooLong, groupIsTooShort,contactIsTooLong,contactIsTooShort,responseIsTooLong,responseIsTooShort }