const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('Generating Message', () => {
    it('should generate a new message', () => {
        var from = 'shivam';
        var text = 'Testing text';

        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('Generating Location Message', () => {
    it('should generate a new location messaeg', () => {
        var from = 'shivam';
        var lat = 1;
        var long = 1;

        var message = generateLocationMessage(from, lat, long);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url: `https://www.google.com/maps?q=${lat},${long}`
        });
    });
});