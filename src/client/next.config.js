module.exports = {
  distDir: '../../.next',
  source: './',
  headers: [
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
  ],
};
