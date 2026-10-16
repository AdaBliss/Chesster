const { moderateMessage } = require('../services/chatService');

describe('chat moderation', () => {
  it('masks complete profane words before persistence or broadcast', () => {
    expect(moderateMessage('What the fuck is this?').message).toBe('What the **** is this?');
  });

  it('does not mask benign words containing blocked substrings', () => {
    expect(moderateMessage('classic pass button document').message).toBe('classic pass button document');
  });

  it('strips markup, control characters and enforces the length limit', () => {
    const result = moderateMessage('<b>Hello</b>\u0000 world');
    expect(result.message).toBe('Hello world');
    expect(moderateMessage('x'.repeat(501)).message).toHaveLength(500);
  });
});
