/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Обязательно для работы с формами
  moduleNameMapper: {
    // Если у тебя есть алиасы в путях (например, @/ts/...), укажи их тут
  },
};