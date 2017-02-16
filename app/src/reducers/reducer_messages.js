export default function() {
	return [{
		trigger: 'Running Late',
		text: 'there was a meteor on the 405, imma be 10 mins late',
		group: {
			name: 'hrla12',
			medium: 'Slack'
			}
		}, {
		trigger: 'order food',
		text: 'I\'ll be home in 10 mins, please order me some pizza',
		group: {
			name:'wife',
			medium: 'text'
			}
		}, {
		trigger: 'play with me',
		text: 'play chess in 15 mins?',
		group: {
			name:'ricky',
			medium: 'email'
			}
		}]
}